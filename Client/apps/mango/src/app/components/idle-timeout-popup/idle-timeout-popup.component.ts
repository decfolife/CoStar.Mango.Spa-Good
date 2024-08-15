/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { UserIdleService } from 'libs/core-shared/src/lib/services';
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
    private idleService: UserIdleService,
    ) { }

  ngOnInit(): void {
    this.subs.push(
      this.idleService.onTimeoutWarning().subscribe((timer) => {
        if (timer) {
          this.message = `Your session will expire in ${timer} seconds.`
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe)
  }

  continueWorking() {
    this.idleService.resetTimer();
    this.close.emit('close');
  }

  logout() {
    this.close.emit('close');
    this.facade.logout(true)
  }
}
