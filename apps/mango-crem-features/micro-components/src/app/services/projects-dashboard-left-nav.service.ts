import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../../mango/src/environments/environment.local';
import { EndpointService } from '@mango/core-shared';
import { HttpClient } from '@angular/common/http';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Injectable()
export class ProjectsDashboardLeftNavService extends EndpointService {
    constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
        super(http, facade);
      }

    DoesUserHaveDocumentStoreViewRights(): Observable<any> {
    if (environment.isRestful) {
        const url = `${environment.appUrls.dashboards}Dashboards/DoesUserHaveDocumentStoreViewRights`;
        return this.callHttpGet(url, 'DoesUserHaveDocumentStoreViewRights');
    }

    const url = `${environment.appUrls.dashboards}DoesUserHaveDocumentStoreViewRights`;
    return this.callHttpPost(url, 'DoesUserHaveDocumentStoreViewRights', null);
    }

    DoesUserHaveManageTeamListsRights(): Observable<any> {
        if (environment.isRestful) {
            const url = `${environment.appUrls.dashboards}Dashboards/DoesUserHaveManageTeamListsRights`;
            return this.callHttpGet(url, 'DoesUserHaveManageTeamListsRights');
        }

        const url = `${environment.appUrls.dashboards}DoesUserHaveManageTeamListsRights`;
        return this.callHttpPost(url, 'DoesUserHaveManageTeamListsRights', null);
    }

    getModuleNavigationLinks(moduleID: number): Observable<any> {
			if (environment.isRestful) {
				const url = `${environment.appUrls.leftNav}LeftNav/GetModulesNavigationLinks/${moduleID}`;
				return this.callHttpGet(url, 'GetModulesNavigationLinks')
			}
			const url = `${environment.appUrls.leftNav}GetModulesNavigationLinks`;
			return this.callHttpPost(url, 'GetModulesNavigationLinks', { moduleID })
		}
    
    getModuleNavigationLinksClient(moduleID: number): Observable<any> {
        if (environment.isRestful) {
            const url = `${environment.appUrls.leftNav}LeftNav/GetModulesNavigationLinksClient/${moduleID}`;
            return this.callHttpGet(url, 'GetModulesNavigationLinks')
        }
        const url = `${environment.appUrls.leftNav}GetModulesNavigationLinksClient`;
        return this.callHttpPost(url, 'GetModulesNavigationLinks', { moduleID })
    }

    getModuleNavigationLinksForRenderForm(routeUrl: string): Observable<any> {
        //This will only be called for mango spa and not for crem
        if (environment.isRestful) {
            //replace regex not working so use the while loop to replace all occurences of the forward slash
            // while (routeUrl.indexOf('/') >= 0){
            //     routeUrl = routeUrl.replace('/', '%2F');
            // }
            let encodedUrl = encodeURIComponent(routeUrl)
            const url = `${environment.appUrls.leftNav}LeftNav/GetRenderFormsNavigationLinks/${encodedUrl}`;
            return this.callHttpGet(url, 'GetModuleNavigationLinksForRenderForm')
        }
    }

    getToolbarModuleLinks(): Observable<any> {
        //This will only be called for mango spa and not for crem
        if (environment.isRestful) {
            const url = `${environment.appUrls.leftNav}Navigation/GetSpaNavigationLinks`;
            return this.callHttpGet(url, 'GetToolbarModuleLinks')
        }
    }
}
