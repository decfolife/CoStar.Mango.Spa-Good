import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../mango/src/environments/environment.local';
import { EndpointService } from '@mango/core-shared';
import { HttpClient } from '@angular/common/http';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Injectable()
export class EmulateUserService extends EndpointService {
    constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
        super(http, facade);
      }

    public getEmulateUserList(): Observable<any> {
      const url = `${environment.appUrls.userMaintenance}UserMaintenance/GetEmulatedUserList`;
      return this.callHttpGet(url, 'GetEmulatedUserList')
    }   
}
