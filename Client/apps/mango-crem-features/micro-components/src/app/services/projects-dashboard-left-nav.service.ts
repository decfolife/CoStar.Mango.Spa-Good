import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { EndpointService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { environment } from '../../../../../mango/src/environments/environment.local';

@Injectable()
export class ProjectsDashboardLeftNavService extends EndpointService {
  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  DoesUserHaveDocumentStoreViewRights(): Observable<any> {
    const url = `${environment.appUrls.dashboards}Dashboards/DoesUserHaveDocumentStoreViewRights`;
    return this.callHttpGet(url, 'DoesUserHaveDocumentStoreViewRights');
  }

  DoesUserHaveManageTeamListsRights(): Observable<any> {
    const url = `${environment.appUrls.dashboards}Dashboards/DoesUserHaveManageTeamListsRights`;
    return this.callHttpGet(url, 'DoesUserHaveManageTeamListsRights');
  }

  getModuleNavigationLinks(moduleID: number): Observable<any> {
    const url = `${environment.appUrls.leftNav}LeftNav/GetModulesNavigationLinks/${moduleID}`;
    return this.callHttpGet(url, 'GetModulesNavigationLinks')
  }

  getModuleNavigationLinksClient(moduleID: number): Observable<any> {
    const url = `${environment.appUrls.leftNav}LeftNav/GetModulesNavigationLinksClient/${moduleID}`;
    return this.callHttpGet(url, 'GetModulesNavigationLinks')
  }

  getModuleNavigationLinksForRenderForm(routeUrl: string): Observable<any> {
    const queryParams = (routeUrl.split('?') || ['', ''])[1]
    let encodedUrl = encodeURIComponent(`?${queryParams}`)
    const url = `${environment.appUrls.leftNav}LeftNav/GetRenderFormsNavigationLinks/${encodedUrl}`;

    // To be refactored: isCommon field should be coming from the backend, once refactored remove the whole pipe logic below
    const COMMON_LEFT_NAV_LINKS = ['common', 'reminders', 'filemanager', 'projects/contacts', 'objectrights']
    return this.callHttpGet(url, 'GetModuleNavigationLinksForRenderForm').pipe(
      filter(response => !!response && !!response.data),
      map(response => ({ ...response, data: response.data.map(leftNavItem => ({ ...leftNavItem, isCommon: COMMON_LEFT_NAV_LINKS.some(commonLink => (leftNavItem.linkUrl || '').toLowerCase().includes(commonLink))})) })),
    )
  }

  getToolbarModuleLinks(): Observable<any> {
    const url = `${environment.appUrls.leftNav}Navigation/GetSpaNavigationLinks`;
    return this.callHttpGet(url, 'GetToolbarModuleLinks')
  }
}
