import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EndpointService } from './endpoint.service';
import { environment } from '../../../../../apps/mango/src/environments/environment.local';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService extends EndpointService {

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
