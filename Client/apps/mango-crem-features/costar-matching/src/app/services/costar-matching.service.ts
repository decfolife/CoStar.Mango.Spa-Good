import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EndpointService } from '../../../../../../libs/core-shared/src';
import { UtilitiesService } from '@mango/core-shared';
import { HttpClient } from '@angular/common/http';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import {
  Api,
  SecurityType,
  BuildingInfo,
  CoStarProperty,
} from '@mango/data-models/lib-data-models';

@Injectable({
  providedIn: 'root',
})
export class CostarMatchingService extends EndpointService {
  public isLoading = false;
  public isErrored = false;
  public requestHasBeenSent = false;
  costarMatchingUrl: string = UtilitiesService.getBaseApiUrl(Api.coStarMatch);

  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getMatchedCostarProperty(request: any): Observable<CoStarProperty[]> {
    const url = `${this.costarMatchingUrl}properties/matched`;
    return this.callHttpPost(url, 'properties-matched', request).pipe(
      map((x) => x.data)
    );
  }

  getBuildingInfo(buildingID: number): Observable<BuildingInfo> {
    const url = `${this.costarMatchingUrl}buildings/${buildingID}`;
    return this.callHttpGet(url, 'buildings', buildingID).pipe(
      map((x) => x.data)
    );
  }

  getUserCoStarMatchingModuleRight(
    moduleRights: any
  ): Observable<SecurityType> {
    const url = `${this.costarMatchingUrl}pagesecurity/getmodulerights`;
    return this.callHttpPost(
      url,
      'pagesecurity-getmodulerights',
      moduleRights
    ).pipe(map((x) => x.data[0].maxSecurityTypeId as SecurityType));
  }

  getUserCoStarMatchingPageRight(navPageRights: any): Observable<boolean> {
    const url = `${this.costarMatchingUrl}pagesecurity/getNavPageRights`;
    return this.callHttpPost(
      url,
      'pagesecurity-getNavpagerights',
      navPageRights
    ).pipe(map((x) => x.data as boolean));
  }

  updateBuildingRecord(request: any): Observable<any> {
    const url = `${this.costarMatchingUrl}buildings/updatebuilding`;
    return this.callHttpPut(url, 'buildings-updatebuilding', request);
  }

  verifyAddress(request: any): Observable<any> {
    const url = `${this.costarMatchingUrl}addresses/cleanse`;
    return this.callHttpPost(url, 'addresses-cleanse', request);
  }
}
