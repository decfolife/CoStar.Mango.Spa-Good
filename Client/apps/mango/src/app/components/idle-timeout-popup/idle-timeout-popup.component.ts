/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'idle-timeout-popup',
  templateUrl: './idle-timeout-popup.component.html',
  styleUrls: ['./idle-timeout-popup.component.scss']
})
export class IdleTimeoutPopupComponent implements OnInit {
  @Input() visible = false
  @Output() close = new EventEmitter<any>()

  public message = ""

  subs: Subscription[] = []

  constructor(
    private facade: MangoAppFacade,
    private idle: Idle
    ) { }

  ngOnInit(): void {
    this.subs.push(
      this.idle.onTimeoutWarning.subscribe((secondsLeft: number) => {
        this.message = `Your session will expire in ${secondsLeft} seconds.`
      })
    )
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe)
  }

  continueWorking() {
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    this.idle.watch()
    this.close.emit('close');
  }

  logout() {
    this.idle.stop()
    this.close.emit('close');
    this.facade.logout(true)
  }
}
