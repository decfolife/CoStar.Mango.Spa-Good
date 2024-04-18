import { Injectable } from "@angular/core";
import { Api, FieldHistoryDataSource } from "@mango/data-models/lib-data-models";
import { Observable } from "rxjs";
import { EndpointService } from "./endpoint.service";
import { UtilitiesService } from "./utilities.service";

@Injectable()
export class FieldHistoryService extends EndpointService {
  fieldHistoryServiceUrl: string = UtilitiesService.getBaseApiUrl(Api.objectActions);

  getFieldHistory(portfolioId: string, helpTextName: string, fieldHistoryName: string, objectTypeId: string, objectId: string): Observable<FieldHistoryDataSource[]> {
    const url = `${this.fieldHistoryServiceUrl}HelpText/GetHelpTextAndHistory`;
    const request = {
      portfolioId, 
      helpTextName, 
      fieldHistoryName, 
      objectTypeId, 
      objectId
    }
    return this.callHttpGet(url, 'GetHelpTextAndHistory', request)
  }
}