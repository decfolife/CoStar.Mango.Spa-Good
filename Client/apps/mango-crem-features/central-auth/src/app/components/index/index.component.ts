import { Component, EventEmitter, Inject, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@mango/core-shared';
import { IS_CA_STANDALONE_APP, UserAuth } from '@mango/data-models/lib-data-models';
import { CentralAuthFacade } from '../../+state/facades';
import { combineLatest, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'mango-central-auth',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class IndexComponent {
  @Output() loginSuccess: EventEmitter<UserAuth> = new EventEmitter<UserAuth>()

  oauthUserFullyAuthenticated$ = combineLatest([this.centralAuthFacade.isUserAuthenticated$, this.centralAuthFacade.redirectionUri$]).pipe(switchMap(([userFullyAuthenticated, redirectionUri]) => of(!!userFullyAuthenticated && !!redirectionUri)))

  constructor(private centralAuthFacade: CentralAuthFacade) { }

  userLoginSuccess(user: UserAuth): void {
    this.centralAuthFacade.setUser(user)
    this.loginSuccess.emit(user)
  }
}
