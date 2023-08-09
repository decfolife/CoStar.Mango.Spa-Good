import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService } from '../../shared/services/endpoint.service';
import { groupModuleRights, userModuleRights, GroupModuleRights, UserModuleRights, ModuleRightDataRequest } from './group-user-module-rights.model';

@Injectable()
export class GroupUserModuleRightsService extends EndpointService {
    constructor(protected http: HttpClient) {
        super(http);
    }

    getModuleList(): Observable<any> {
        if (environment.isRestful) {
            const url = `${environment.appUrls.reports}Reports/GetModuleRightModuleList`;
            return this.callHttpGet(url, 'getModuleList')
        }
        const url = `${environment.appUrls.reports}GetModuleRightModuleList`;
        return this.callHttpPost(url, 'getModuleList', {})
    }

    getGroupModuleRights(): GroupModuleRights[] {
        return groupModuleRights;
    }

    getUserModuleRights(): UserModuleRights[] {
        return userModuleRights;
    }

    getModuleRightData(userIds: number[], groupIds: number[], selectedModules: number[]): Observable<any> {
        const request: ModuleRightDataRequest = { userIds: userIds.toString(), groupIds: groupIds.toString(), moduleIds: selectedModules.toString() }
        if (environment.isRestful) {
            const url = `${environment.appUrls.reports}Reports/GetModuleRightData`;
            return this.callHttpPost(url, 'getModuleRightData', request);
        }
        const url = `${environment.appUrls.reports}GetModuleRightData`;
        return this.callHttpPost(url, 'getModuleRightData', { request });
    }

    getModuleDescriptionData(userIds: number[], groupIds: number[], selectedModules: number[]): Observable<any> {
        const request: ModuleRightDataRequest = { userIds: userIds.toString(), groupIds: groupIds.toString(), moduleIds: selectedModules.toString() }
        if (environment.isRestful) {
            const url = `${environment.appUrls.reports}Reports/GetModuleRightDescriptionData`;
            return this.callHttpPost(url, 'getModuleDescriptionData', request);
        }
        const url = `${environment.appUrls.reports}GetModuleRightDescriptionData`;
        return this.callHttpPost(url, 'getModuleDescriptionData', { request });
    }
}

