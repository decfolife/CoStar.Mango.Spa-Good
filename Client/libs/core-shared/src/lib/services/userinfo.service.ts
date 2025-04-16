import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '@mango/data-models/lib-data-models';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { environment } from '../../../../../apps/mango/src/environments/environment.local';
import { EndpointService } from './endpoint.service';
import { UtilitiesService } from '@mango/core-shared';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService extends EndpointService {
  userServiceUrl: string = UtilitiesService.getBaseApiUrl(Api.user);

  constructor(protected http: HttpClient, protected facade: MangoAppFacade) {
    super(http, facade);
  }

  getUserLoginInfo(): Observable<any> {
    let url: string = `${this.userServiceUrl}UserService/GetUserLoginInformation`;
    return this.callHttpGet(url, 'getUserLoginInfo');
  }

  // getGlobalSession(): Observable<any> {
  //     return this.callHttpGet(`${this.userServiceUrl}/session`, 'getGlobalSession');
  // }

  // updateGlobalSession(session: V06GlobalSession): Observable<any> {
  //     return this.facade.globalSession$.pipe(
  //         filter(globalSession => !!globalSession),
  //         switchMap(globalSession => this.callHttpPost(`${this.userServiceUrl}session`, 'updateGlobalSession', session || globalSession))
  //     )
  // }
}
