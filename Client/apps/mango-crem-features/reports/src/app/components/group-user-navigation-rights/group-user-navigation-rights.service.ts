import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { ApiResponse } from '@mango/data-models/lib-data-models';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { NavigationRightDataRequest } from './group-user-navigation-rights.model';

@Injectable()
export class GroupUserNavigationRightsService extends EndpointService {
    constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
        super(http, facade);
    }

    getNavigationRightModuleList(): Observable<any> {
        const url = `${environment.appUrls.reports}Reports/GetNavigationRightModuleList`;
        return this.callHttpGet(url, 'getModuleList')
    }

    getNavigationRightData(selectedUsers: number[], selectedGroups: number[], selectedModules: number[]): Observable<ApiResponse> {
        const request: NavigationRightDataRequest = { userIds: selectedUsers.toString(), groupIds: selectedGroups.toString(), moduleIds: selectedModules.toString() }
        const url = `${environment.appUrls.reports}Reports/GetNavigationRightData`;
        return this.callHttpPost(url, 'getNavigationRightData', request);
    }
}

