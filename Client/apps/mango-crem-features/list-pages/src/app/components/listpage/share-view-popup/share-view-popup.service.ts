import { Injectable } from '@angular/core';
import { EndpointService } from '@mango/core-shared';
import { environment } from 'apps/mango/src/environments/environment.local';


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
    return this.callHttpGet(`${environment.appUrls.listpages}SharedUserViewRights/${listViewId}`, 'getSharedUserViewRights')
  }

  getSharedUserViews(listViewId: number) {
    return this.callHttpGet(`${environment.appUrls.listpages}SharedUserViews/${listViewId}`, 'getSharedUserViews')
  }

  createSharedUserViewRights(newRight: SharedUserViewRight) {
    return this.callHttpPost(`${environment.appUrls.listpages}SharedUserViewRights`, 'createSharedUserViewRights', newRight)
  }

  deleteSharedUserViewRights(right: SharedUserViewRight) {
    return this.callHttpPost(`${environment.appUrls.listpages}DeleteSharedUserViewRight`, 'deleteSharedUserViewRights', right)
  }
}
