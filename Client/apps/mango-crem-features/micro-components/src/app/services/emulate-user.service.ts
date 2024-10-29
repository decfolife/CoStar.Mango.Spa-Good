import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../mango/src/environments/environment.local';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { HttpClient } from '@angular/common/http';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable()
export class EmulateUserService extends EndpointService {
  userMaintenance: string = UtilitiesService.getBaseApiUrl(Api.userMaintenance);

  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  public getEmulateUserList(): Observable<any> {
    const url = `${this.userMaintenance}UserMaintenance/GetEmulatedUserList`;
    return this.callHttpGet(url, 'GetEmulatedUserList');
  }
}
