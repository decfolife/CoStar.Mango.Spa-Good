import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

import { Api } from '@mango/data-models/lib-data-models';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReactivationObjectType } from '../../../../../../libs/data-models/lib-data-models/src/lib/models/object-reactivation/reactivation-object-type';
import { ReactivationClientPreferences } from '../../../../../../libs/data-models/lib-data-models/src/lib/models/object-reactivation/reactivation-client-preferences';

@Injectable({ providedIn: 'root' })
export class ObjectReactivationService extends EndpointService {
  objectReactivationUrl: string = UtilitiesService.getBaseApiUrl(
    Api.objectActions
  );

  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  public getFilterData(): Observable<ReactivationObjectType[]> {
    const url = `${this.objectReactivationUrl}objectreactivation/filterdata`;
    return this.callHttpGet(url, 'filterdata', null).pipe(map((x) => x));
  }

  public getClientPreferences(): Observable<ReactivationClientPreferences> {
    const url = `${this.objectReactivationUrl}objectreactivation/clientpreferences`;
    return this.callHttpGet(url, 'clientpreferences').pipe(map((x) => x));
  }

  public getReactivationList(request: any): Observable<any[]> {
    const url = `${this.objectReactivationUrl}objectreactivation/reactivationlist`;
    return this.callHttpGet(url, 'objectreactivationlist', request).pipe(
      map((x) => x.data)
    );
  }

  public updateReactivationListRecords(request: any): Observable<any> {
    const url = `${this.objectReactivationUrl}objectreactivation/updatereactivationlist`;
    return this.callHttpPost(url, 'updatereactivationlist', request);
  }
}
