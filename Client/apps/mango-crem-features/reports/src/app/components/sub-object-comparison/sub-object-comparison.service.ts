import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService } from '../../shared/services/endpoint.service';
import { SubObjectComparisonDataRequest } from './sub-object-comparison.model';

@Injectable()
export class SubObjectComparisonService extends EndpointService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  getSubObjectsComparisonData(FormId, ChildObjectTypeId, WidgetId, ObjectIds = "NaN"): Observable<any> {
    // FormId = 221;
    // ObjectTypeId = 45;
    // FormSectionGRoupID = null;
    // ReturnFormat = 2;
    // ObjectIds = "3819,3856,3868";
    const request: SubObjectComparisonDataRequest = { formId: FormId, objectTypeId: ChildObjectTypeId, formSectionGRoupID: null, returnFormat: 4, objectIds: ObjectIds, widgetId: WidgetId}
    if (environment.isRestful) {
        const url = `${environment.appUrls.reports}SubObjects/GetSubObjectsComparisonData`;
        return this.getHttpPostApiResponse(url, 'getSubObjectsComparisonData', request);
    }
    const url = `${environment.appUrls.reports}GetSubObjectsComparisonData`;
    return this.getHttpPostApiResponse(url, 'getSubObjectsComparisonData', { request });
  }
}

