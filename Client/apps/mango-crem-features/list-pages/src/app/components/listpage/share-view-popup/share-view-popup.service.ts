import { Injectable } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from 'apps/mango/src/environments/environment.local';

import { catchError, map } from 'rxjs/operators';

import { EndpointService } from '../core/services/endpoint.service';

export interface SharedUserViewRight {
  sharedWithEntityId: number;
  sharedWithEntityType: number;
  sharedWithName: string;
  userListViewId: number;
  securityType: number;
}

@Injectable()
export class ShareViewPopupService extends EndpointService {

  getSharedUserViewRights(listViewId: number) {
    if (environment.isRestful) {
      const url = `${environment.appUrls.listpages}SharedUserViewRights/${listViewId}`;

      return this.http.get(url, this.httpOptions)
        .pipe(
          map(x => this.toObject(x)),
          catchError(this.handleError('getSharedUserViewRights'))
        );
    }

    const url = `${environment.appUrls.listpages}GetSharedUserViewRights`;

    return this.http.post(
      url, `{ "request": { "userListViewId": ${listViewId} } }`, this.httpOptions
    ).pipe(
      map(x => this.toObject(x)),
      catchError(this.handleError('getSharedUserViewRights'))
    );
  }

  getSharedUserViews(listViewId: number) {
    if (environment.isRestful) {
      const url = `${environment.appUrls.listpages}SharedUserViews/${listViewId}`;

      return this.http.get(url, this.httpOptions)
        .pipe(
          map(x => this.toObject(x)),
          catchError(this.handleError('getSharedUserViews'))
        );
    }

    const url = `${environment.appUrls.listpages}GetSharedUserViews`;

    return this.http.post(
      url, `{ "request": { "userListViewId": ${listViewId} } }`, this.httpOptions
    ).pipe(
      map(x => this.toObject(x)),
      catchError(this.handleError('getSharedUserViews'))
    );
  }

  createSharedUserViewRights(newRight: SharedUserViewRight) {
    if (environment.isRestful) {
      const url = `${environment.appUrls.listpages}SharedUserViewRights`;

      return this.http.post(url, newRight, this.httpOptions)
        .pipe(
          catchError(this.handleError('createSharedUserViewRight'))
        );
    }

    const url = `${environment.appUrls.listpages}CreateSharedUserViewRight`

    return this.http.post(url, JSON.stringify({ request: newRight }), this.httpOptions)
      .pipe(
        catchError(this.handleError('createSharedUserViewRight'))
      );
  }

  deleteSharedUserViewRights(right: SharedUserViewRight) {
    const url = `${environment.appUrls.listpages}DeleteSharedUserViewRight`

    if (environment.isRestful) {
      return this.http.post(url, right, this.httpOptions)
        .pipe(
          catchError(this.handleError('deleteSharedUserViewRight'))
        );
    }

    return this.http.post(url, JSON.stringify({ request: right }), this.httpOptions)
      .pipe(
        catchError(this.handleError('deleteSharedUserViewRight'))
      );
  }

}
