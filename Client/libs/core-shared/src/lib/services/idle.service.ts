import { Injectable, NgZone, Optional } from '@angular/core';
import {
  from,
  fromEvent,
  interval,
  merge,
  Observable,
  of,
  Subject,
  Subscription,
  timer,
} from 'rxjs';
import {
  bufferTime,
  distinctUntilChanged,
  filter,
  finalize,
  map,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { StorageService } from './storage.service';
import { IDLE_TIMOUT_DELAY_SECONDS } from '@mango/data-models/lib-data-models';
import { DBkeys } from '../utilities/db-keys';
import { CookieService } from '@mango/core-shared';

export class UserIdleConfig {
  /**
   * Idle value in seconds.
   */
  idle?: number;
  /**
   * Timeout value in seconds.
   */
  timeout?: number;
  /**
   * Ping value in seconds.
   */
  ping?: number;
  /**
   * IdleSensitivity time that activity must remain below the idle detection threshold before
   * idle buffer timer count user's activity actions, in seconds.
   */
  idleSensitivity?: number;
  /**
   * Is it Mango SPA using this service
   */
  isMangoSpa?: boolean;
}

export function provideUserIdleConfig(config: UserIdleConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: UserIdleConfig, useValue: config },
  ])
}

/**
 * This service works but does not handle the scenario where you have multiple tabs within the same browser
 * Most modern browsers throttle or pause JavaScript execution in background tabs to conserve system resources. This throttling affects timers and RxJS observables,
 * 
 * To get around this, we can introduce web workers here OR just use the popular ng-idle lib.
 */
@Injectable({
  providedIn: 'root',
})
export class UserIdleService {
  ping$!: Observable<any>;

  protected isMangoSpa: boolean = false
  protected activityEvents$!: Observable<any>;
  protected timerStart$ = new Subject<boolean>();
  protected idleDetected$ = new Subject<boolean>();
  protected timeout$ = new Subject<boolean>();
  protected idle$!: Observable<any>;
  protected timer$!: Observable<any>;
  protected countDownTimer$ = new Subject<number>();
  protected idleMillisec = 600 * 1000;
  protected idleSensitivityMillisec = 1000;
  protected timeout = 300;
  protected pingMillisec = 120 * 1000;
  isTimeout = false;

  protected isInactivityTimer = false;
  protected isIdleDetected = false;
  protected idleSubscription!: Subscription;

  constructor(@Optional() config: UserIdleConfig, private _ngZone: NgZone, private storageService: StorageService) {
    if (config) {
      this.setConfig(config);
    }
  }

  startWatching() {
    if (!this.activityEvents$) {
      this.activityEvents$ = merge(
        fromEvent(window, 'mousemove'),
        fromEvent(window, 'resize'),
        fromEvent(document, 'keydown')
      );
    }

    this.idle$ = from(this.activityEvents$);

    if (this.idleSubscription) {
      this.idleSubscription.unsubscribe();
    }

    this.idleSubscription = this.idle$
      .pipe(
        bufferTime(this.idleSensitivityMillisec),
        filter(
          (arr) =>
            !arr.length && !this.isIdleDetected && !this.isInactivityTimer
        ),
        tap(() => {
          const idleTimeoutDate = new Date()
          idleTimeoutDate.setSeconds(idleTimeoutDate.getSeconds() + IDLE_TIMOUT_DELAY_SECONDS)
          this.storageService.savePermanentData(idleTimeoutDate, DBkeys.IDLE_TIMEOUT)
          this.isIdleDetected = true;
          this.idleDetected$.next(true);
        }),
        switchMap(() =>
          this._ngZone.runOutsideAngular(() =>
            interval(1000).pipe(
              takeUntil(
                merge(
                  this.activityEvents$,
                  timer(this.idleMillisec).pipe(
                    tap(() => {
                      if (this.isMangoSpa) {
                        // Only start timer/show popup when both SPA and V06 are idle.
                        if (CookieService.isV06Idle()) {
                          this.isInactivityTimer = true;
                          this.timerStart$.next(true);
                        }

                        CookieService.setMangoIdleCookieProperty(true)
                      } else {
                        this.isInactivityTimer = true;
                        this.timerStart$.next(true);
                      }
                    })
                  )
                )
              ),
              finalize(() => {
                this.isIdleDetected = false;
                this.idleDetected$.next(false);
              })
            )
          )
        )
      )
      .subscribe();

    this.setupTimer(this.timeout);
    this.setupPing(this.pingMillisec);
  }

  stopWatching() {
    this.stopTimer();
    if (this.idleSubscription) {
      this.idleSubscription.unsubscribe();
    }
  }

  stopTimer() {
    this.isInactivityTimer = false;
    this.timerStart$.next(false);
  }

  resetTimer() {
    this.stopTimer();
    this.isTimeout = false;
    
    if (this.isMangoSpa) {
      CookieService.setMangoIdleCookieProperty(false)
    }
  }

  onTimerStart(): Observable<number> {
    return this.timerStart$.pipe(
      distinctUntilChanged(),
      switchMap((start) => (start ? this.timer$ : of(null))),
    );
  }

  onIdleStart(): Observable<boolean> {
    return this.timerStart$.pipe(
      distinctUntilChanged(),
      filter(start => start === true),
      map(() => true)
    );
  }

  onIdleEnd(): Observable<boolean> {
    return this.timerStart$.pipe(
      distinctUntilChanged(),
      filter(start => start === false),
      map(() => true)
    );
  }

  onIdleStatusChanged(): Observable<boolean> {
    return this.idleDetected$.asObservable();
  }

  onTimeoutWarning(): Observable<number> {
    return this.countDownTimer$;
  }

  onTimeout(): Observable<boolean> {
    return this.timeout$.pipe(
      filter((timeout) => !!timeout),
      tap(() => (this.isTimeout = true)),
      map(() => true)
    );
  }

  getConfigValue(): UserIdleConfig {
    return {
      idle: this.idleMillisec / 1000,
      idleSensitivity: this.idleSensitivityMillisec / 1000,
      timeout: this.timeout,
      ping: this.pingMillisec / 1000,
    };
  }

  setConfigValues(config: UserIdleConfig) {
    if (this.idleSubscription && !this.idleSubscription.closed) {
      console.error('Call stopWatching() before set config values');
      return;
    }

    this.setConfig(config);
  }

  private setConfig(config: UserIdleConfig) {
    if (config.idle) {
      this.idleMillisec = config.idle * 1000;
    }
    if (config.ping) {
      this.pingMillisec = config.ping * 1000;
    }
    if (config.idleSensitivity) {
      this.idleSensitivityMillisec = config.idleSensitivity * 1000;
    }
    if (config.timeout) {
      this.timeout = config.timeout;
    }
    if (config.isMangoSpa) {
      this.isMangoSpa = config.isMangoSpa
    }
  }

  setCustomActivityEvents(customEvents: Observable<any>) {
    if (this.idleSubscription && !this.idleSubscription.closed) {
      console.error('Call stopWatching() before set custom activity events');
      return;
    }

    this.activityEvents$ = customEvents;
  }

  protected setupTimer(timeout: number) {
    this._ngZone.runOutsideAngular(() => {
      this.timer$ = of(() => timeout).pipe(
        map((fn) => fn()),
        switchMap((countDown) =>
          interval(1000).pipe(
            map(() =>
              countDown--
            ),
            tap((elapsed) => {
              this.countDownTimer$.next(elapsed)
              if (elapsed <= 0) {
                this.timeout$.next(true);
              }
            })
          )
        )
      );
    });
  }

  protected setupPing(pingMillisec: number) {
    this.ping$ = interval(pingMillisec).pipe(filter(() => !this.isTimeout));
  }
}