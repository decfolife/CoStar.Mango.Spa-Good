import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable()
export class SharedService extends EndpointService {
  objectActionsUrl: string = UtilitiesService.getBaseApiUrl(Api.objectActions);
  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getUserPreferences(): Observable<any> {
    const url = `${this.objectActionsUrl}ObjectActions/GetUserPreferences`;
    return this.callHttpGet(url, 'getUserPreferences');
  }
}
