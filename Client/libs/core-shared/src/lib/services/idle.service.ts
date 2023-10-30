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
}

export function provideUserIdleConfig(config: UserIdleConfig): EnvironmentProviders {
  return makeEnvironmentProviders([
    { provide: UserIdleConfig, useValue: config },
  ])
}

@Injectable({
  providedIn: 'root',
})
export class UserIdleService {
  ping$!: Observable<any>;

  protected activityEvents$!: Observable<any>;

  protected timerStart$ = new Subject<boolean>();
  protected idleDetected$ = new Subject<boolean>();
  protected timeout$ = new Subject<boolean>();
  protected idle$!: Observable<any>;
  protected timer$!: Observable<any>;
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
                      this.isInactivityTimer = true;
                      this.timerStart$.next(true);
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
  }

  onTimerStart(): Observable<number> {
    return this.timerStart$.pipe(
      distinctUntilChanged(),
      switchMap((start) => (start ? this.timer$ : of(null))),
    );
  }

  onIdleStatusChanged(): Observable<boolean> {
    return this.idleDetected$.asObservable();
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
      this.timer$ = of(() => new Date()).pipe(
        map((fn) => fn()),
        switchMap((startDate) =>
          interval(1000).pipe(
            map(() =>
              Math.round((new Date().valueOf() - startDate.valueOf()) / 1000)
            ),
            tap((elapsed) => {
              if (elapsed >= timeout) {
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