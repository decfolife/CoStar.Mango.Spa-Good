import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { ApiResponse } from '@mango/data-models/lib-data-models';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { RightHistoryDataRequest } from './group-user-history.model';

@Injectable()
export class GroupUserHistoryService extends EndpointService {
    constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
        super(http, facade);
    }

    getRightHistoryData(userIds: number[], groupIds: number[], fromDate: Date, toDate: Date): Observable<ApiResponse> {
        const request: RightHistoryDataRequest = { fromDate: fromDate, toDate: toDate, userIds: userIds.toString(), groupIds: groupIds.toString() }
        const url = `${environment.appUrls.reports}Reports/GetRightHistoryData`;
        return this.callHttpPost(url, 'getRightHistoryData', request);
    }
}

