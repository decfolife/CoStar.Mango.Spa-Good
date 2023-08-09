import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService } from './endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService extends EndpointService {
  
  public userRights = 0; // 0 No Rights, 1 View Rights, 2 Add Rights
  
  private getBaseUrl(): string {
    if (environment.isRestful) {
      return environment.appUrls.accounting + 'Base' ;
    }
    return `${this.rootUrl}`;
  }

  getUserRights() {
    if (environment.isRestful) {
      const url = `${this.getBaseUrl()}/GetUserRights`;
      return this.http.get(url, this.httpOptions)
        .pipe(
          map(this.responseToObject),
          catchError(this.handleError('getUserRights')),
        );
    }

    const url = `${this.getBaseUrl()}/GetUserRights`;
    return this.http.post(url, {})
      .pipe(
        map(this.responseToObject),
        catchError(this.handleError('getUserRights')),
      );
  }
  
}
