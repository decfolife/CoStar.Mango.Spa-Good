import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Observable, of } from 'rxjs';
import { Api } from '@mango/data-models/lib-data-models';
import { SharedLeftNavLink } from 'libs/data-models/lib-data-models/src/lib/models/link';

@Injectable()
export class ProjectsDashboardLeftNavService extends EndpointService {
  dashboards: string = UtilitiesService.getBaseApiUrl(Api.dashboards)
  leftNav: string = UtilitiesService.getBaseApiUrl(Api.leftNav)

  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  DoesUserHaveDocumentStoreViewRights(): Observable<any> {
    const url = `${this.dashboards}Dashboards/DoesUserHaveDocumentStoreViewRights`;
    return this.callHttpGet(url, 'DoesUserHaveDocumentStoreViewRights');
  }

  DoesUserHaveManageTeamListsRights(): Observable<any> {
    const url = `${this.dashboards}Dashboards/DoesUserHaveManageTeamListsRights`;
    return this.callHttpGet(url, 'DoesUserHaveManageTeamListsRights');
  }

  getModuleNavigationLinks(moduleID: number): Observable<SharedLeftNavLink[]> {
    const url = `${this.leftNav}LeftNav/GetModulesNavigationLinks/${moduleID}`;
    return this.callHttpGet(url, 'GetModulesNavigationLinks')
  }

  getModuleNavigationLinksClient(moduleID: number): Observable<any> {
    const url = `${this.leftNav}LeftNav/GetModulesNavigationLinksClient/${moduleID}`;
    return this.callHttpGet(url, 'GetModulesNavigationLinks')
  }

  getModuleNavigationLinksForRenderForm(routeUrl: string): Observable<any> {
    const queryParams = (routeUrl.split('?') || ['', ''])[1]
    let encodedUrl = encodeURIComponent(`?${queryParams}`)
    const url = `${this.leftNav}LeftNav/GetRenderFormsNavigationLinks/${encodedUrl}`;
    return this.callHttpGet(url, 'GetModuleNavigationLinksForRenderForm')
  }

  getToolbarModuleLinks(): Observable<any> {
    const url = `${this.leftNav}Navigation/GetSpaNavigationLinks`;
    return this.callHttpGet(url, 'GetToolbarModuleLinks')
  }

  getAdminModulesNavigationLinks(moduleID: number): Observable<any> {
    const url = `${this.leftNav}LeftNav/GetAdminModulesNavigationLinks/${moduleID}`;
    return this.callHttpGet(url, 'GetAdminModulesNavigationLinks')
  }
}
