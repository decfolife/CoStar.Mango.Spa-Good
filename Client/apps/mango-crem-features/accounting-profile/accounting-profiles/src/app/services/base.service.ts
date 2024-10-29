import { Injectable } from '@angular/core';
import {
  EndpointService,
  UtilitiesService,
} from '@mango/core-shared/lib-core-shared';
import {
  Api,
  UserModuleRight,
  ObjectType,
} from '@mango/data-models/lib-data-models';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BaseService extends EndpointService {
  discountRateProfilesUrl: string = UtilitiesService.getBaseApiUrl(
    Api.discountRateProfiles
  );

  getUserRights() {
    const url = `${this.discountRateProfilesUrl}/Base/GetUserRights`;

    return this.callHttpGet(url, 'getUserRights');
  }

  getPortfolioSettings(masterGroupID: number) {
    const url = `${this.discountRateProfilesUrl}/Base/GetPortfolioSettings/${masterGroupID}`;

    return this.callHttpGet(url, 'getPortfolioSettings');
  }

  HasUserModuleRight(): Observable<boolean> {
    const url = `${this.discountRateProfilesUrl}/base/GetUserModuleRights`;
    return this.callHttpGet(url, 'getUserModuleRights').pipe(
      map((result) =>
        result.data.find(
          (x) => x.moduleId === ObjectType.MANAGE_ACCOUNTING_SETTINGS
        )
      ),
      map(
        (moduleRight) =>
          moduleRight !== null &&
          (moduleRight as UserModuleRight).maxSecurityTypeId > 0
      ),
      catchError((error) => {
        const message = `ModuleRight Retrieval error: ${error}`;
        console.error(message);
        return of(false);
      })
    );
  }
}
