import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { SubObjectComparisonDataRequest } from './sub-object-comparison.model';

@Injectable()
export class SubObjectComparisonService extends EndpointService {
  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }
  
  getSubObjectsComparisonData(FormId, ChildObjectTypeId, WidgetId, ObjectIds = "NaN"): Observable<any> {
    // FormId = 221;
    // ObjectTypeId = 45;
    // FormSectionGRoupID = null;
    // ReturnFormat = 2;
    // ObjectIds = "3819,3856,3868";
    const request: SubObjectComparisonDataRequest = { formId: FormId, objectTypeId: ChildObjectTypeId, formSectionGRoupID: null, returnFormat: 4, objectIds: ObjectIds, widgetId: WidgetId}
      const url = `${environment.appUrls.reports}SubObjects/GetSubObjectsComparisonData`;
      return this.callHttpPost(url, 'getSubObjectsComparisonData', request);
  }
}

