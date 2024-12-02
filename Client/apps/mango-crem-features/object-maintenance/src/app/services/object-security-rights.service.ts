import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { Api } from '@mango/data-models/lib-data-models';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Injectable({
  providedIn: 'root',
})
export class ObjectSecurityRightsService extends EndpointService {
  private apiUrl: string;

  constructor(protected http: HttpClient, facade: MangoAppFacade) {
    super(http, facade);
    this.apiUrl = UtilitiesService.getBaseApiUrl(Api.objectActions);
  }

  getobjectsecurityrights(objectID: number, objectTypeID: number) {
    return this.callHttpGet(
      `${this.apiUrl}objectactions/getobjectsecurityrights?ObjectID=${objectID}&ObjectTypeID=${objectTypeID}`,
      'GetobjectSecurityRights'
    );
  }
  getObjectName(objectID: number, objectTypeID: number) {
    return this.callHttpGet(
      `${this.apiUrl}objecthistory/getObjectName?OID=${objectID}&OTID=${objectTypeID}`,
      'GetObjectName'
    );
  }
}
