import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Injectable()
export class SharedService extends EndpointService {
  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

//   getUserPreferences(): Observable<any> {
//     if (environment.isRestful) {
//       const url = `${environment.appUrls.reports}Reports/GetUserPreferences`;
//       return this.callHttpGet(url, 'getUserPreferences')
//     }
//     const url = `${environment.appUrls.reports}GetUserPreferences`;
//     return this.callHttpPost(url, 'getUserPreferences', {})
//   }

}

