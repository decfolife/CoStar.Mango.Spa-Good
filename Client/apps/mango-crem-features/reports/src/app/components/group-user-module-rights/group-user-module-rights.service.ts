import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import {
  groupModuleRights,
  userModuleRights,
  GroupModuleRights,
  UserModuleRights,
  ModuleRightDataRequest,
} from './group-user-module-rights.model';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable()
export class GroupUserModuleRightsService extends EndpointService {
  reportsUrl: string = UtilitiesService.getBaseApiUrl(Api.reports);

  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getModuleList(): Observable<any> {
    const url = `${this.reportsUrl}Reports/GetModuleRightModuleList`;
    return this.callHttpGet(url, 'getModuleList');
  }

  getGroupModuleRights(): GroupModuleRights[] {
    return groupModuleRights;
  }

  getUserModuleRights(): UserModuleRights[] {
    return userModuleRights;
  }

  getModuleRightData(
    userIds: number[],
    groupIds: number[],
    selectedModules: number[]
  ): Observable<any> {
    const request: ModuleRightDataRequest = {
      userIds: userIds.toString(),
      groupIds: groupIds.toString(),
      moduleIds: selectedModules.toString(),
    };
    const url = `${this.reportsUrl}Reports/GetModuleRightData`;
    return this.callHttpPost(url, 'getModuleRightData', request);
  }

  getModuleDescriptionData(
    userIds: number[],
    groupIds: number[],
    selectedModules: number[]
  ): Observable<any> {
    const request: ModuleRightDataRequest = {
      userIds: userIds.toString(),
      groupIds: groupIds.toString(),
      moduleIds: selectedModules.toString(),
    };
    const url = `${this.reportsUrl}Reports/GetModuleRightDescriptionData`;
    return this.callHttpPost(url, 'getModuleDescriptionData', request);
  }
}
