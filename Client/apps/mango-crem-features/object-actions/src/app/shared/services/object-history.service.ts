import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { Api } from '@mango/data-models/lib-data-models';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Injectable({
  providedIn: 'root',
})
export class ObjectHistoryService extends EndpointService {
  private apiUrl: string;

  constructor(protected http: HttpClient, facade: MangoAppFacade) {
    super(http, facade);
    this.apiUrl = UtilitiesService.getBaseApiUrl(Api.objectActions);
  }

  getAllObjectChangeHistoryReport(OID: number, OTID: number) {
    return this.callHttpGet(
      `${this.apiUrl}objecthistory/getallobjectchangehistoryreport?OID=${OID}&OTID=${OTID}`,
      'GetAllObjectChangeHistoryReport'
    );
  }

  getObjectName(OID: number, OTID: number) {
    return this.callHttpGet(
      `${this.apiUrl}objecthistory/getObjectName?OID=${OID}&OTID=${OTID}`,
      'GetObjectName'
    );
  }
}
