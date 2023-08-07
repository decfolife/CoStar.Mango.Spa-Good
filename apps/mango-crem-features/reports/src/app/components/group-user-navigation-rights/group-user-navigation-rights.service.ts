import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@mango/data-models/lib-data-models';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService } from '../../shared/services/endpoint.service';
import { NavigationRightDataRequest } from './group-user-navigation-rights.model';

@Injectable()
export class GroupUserNavigationRightsService extends EndpointService {
    constructor(protected http: HttpClient) {
        super(http);
    }

    getNavigationRightModuleList(): Observable<any> {
        if (environment.isRestful) {
            const url = `${environment.appUrls.reports}Reports/GetNavigationRightModuleList`;
            return this.callHttpGet(url, 'getModuleList')
        }
        const url = `${environment.appUrls.reports}GetNavigationRightModuleList`;
        return this.callHttpPost(url, 'getModuleList', {})
    }

    getNavigationRightData(selectedUsers: number[], selectedGroups: number[], selectedModules: number[]): Observable<ApiResponse> {
        const request: NavigationRightDataRequest = { userIds: selectedUsers.toString(), groupIds: selectedGroups.toString(), moduleIds: selectedModules.toString() }
        if (environment.isRestful) {
            const url = `${environment.appUrls.reports}Reports/GetNavigationRightData`;
            return this.getHttpPostApiResponse(url, 'getNavigationRightData', request);
        }
        const url = `${environment.appUrls.reports}GetNavigationRightData`;
        return this.getHttpPostApiResponse(url, 'getNavigationRightData', { request });
    }
}

