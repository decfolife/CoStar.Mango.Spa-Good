import { Injectable } from '@angular/core';
import { EndpointService } from '@mango/core-shared/lib-core-shared';
import { environment } from '@mangoSpa/src/environments/environment.local';

@Injectable({
  providedIn: 'root'
})
export class BaseService extends EndpointService {
  
  public userRights = 0; // 0 No Rights, 1 View Rights, 2 Add Rights
  
  getUserRights() {
      const url = `${environment.appUrls.accounting}/Base/GetUserRights`;
      return this.callHttpGet(url, 'getUserRights')
  }
}
