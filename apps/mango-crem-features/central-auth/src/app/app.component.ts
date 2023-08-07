import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DBkeys, StorageService, UserService } from '@mango/core-shared';
import { ContactRecord, UserAuth } from '@mango/data-models/lib-data-models';
import { CentralAuthFacade } from './+state/facades';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'mango-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'mango-central-auth';

  constructor(private storageService: StorageService, private centralAuthFacade: CentralAuthFacade) { }

  ngOnInit(): void {
    this.populateLoggedInUserData()
    this.centralAuthFacade.authorizationCode$.pipe(
      filter(authorizationCode => !!authorizationCode),
      map(_ => this.centralAuthFacade.redirectToClient())
    ).subscribe()
  }

  populateLoggedInUserData(): void {
    const user: UserAuth = this.storageService.getDataObject(DBkeys.USER_AUTH);
    const clientKey: string = this.storageService.getDataObject(DBkeys.CLIENT_KEY);
    const contactRecord: ContactRecord = this.storageService.getDataObject(DBkeys.CONTACT_RECORD);
    this.centralAuthFacade.setUser(user)
    this.centralAuthFacade.setClientKey(clientKey)
    this.centralAuthFacade.setContactId((contactRecord || {}).contactID)
  }
}
