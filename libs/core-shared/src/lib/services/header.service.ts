import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactRecord, UserAuth } from '@mango/data-models/lib-data-models';
import { EndpointService } from './endpoint.service';
import { environment } from '../../../../../apps/mango/src/environments/environment.local';
import { BehaviorSubject, Observable } from 'rxjs';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Injectable({
  providedIn: 'root'
})
export class HeaderService extends EndpointService {

  logout$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  loggedInUser$: BehaviorSubject<UserAuth> = new BehaviorSubject<UserAuth>(null)
  contactRecord$: BehaviorSubject<ContactRecord> = new BehaviorSubject<ContactRecord>(null)
  
  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
}

  getUserModules(): Observable<any> {
      //This will only be called for mango spa and not for crem
      if (environment.isRestful) {
        const url = `${environment.appUrls.header}Header/GetUserModules`;
        return this.callHttpGet(url, 'GetUserModules');
      }
  }

}
