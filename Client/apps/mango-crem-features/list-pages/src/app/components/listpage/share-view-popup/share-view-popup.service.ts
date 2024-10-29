import { Injectable } from '@angular/core';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { Api } from '@mango/data-models/lib-data-models';
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
  listpages: string = UtilitiesService.getBaseApiUrl(Api.listpages);

  getSharedUserViewRights(listViewId: number) {
    return this.callHttpGet(
      `${this.listpages}listpage/SharedUserViewRights/${listViewId}`,
      'getSharedUserViewRights'
    );
  }

  getSharedUserViews(listViewId: number) {
    return this.callHttpGet(
      `${this.listpages}listpage/SharedUserViews/${listViewId}`,
      'getSharedUserViews'
    );
  }

  createSharedUserViewRights(newRight: SharedUserViewRight) {
    return this.callHttpPost(
      `${this.listpages}listpage/SharedUserViewRights`,
      'createSharedUserViewRights',
      newRight
    );
  }

  deleteSharedUserViewRights(right: SharedUserViewRight) {
    return this.callHttpPost(
      `${this.listpages}listpage/DeleteSharedUserViewRight`,
      'deleteSharedUserViewRights',
      right
    );
  }
}
