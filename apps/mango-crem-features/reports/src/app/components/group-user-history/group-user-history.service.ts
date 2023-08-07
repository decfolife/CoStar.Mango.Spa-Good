import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '@mango/data-models/lib-data-models';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService } from '../../shared/services/endpoint.service';
import { RightHistoryDataRequest } from './group-user-history.model';

@Injectable()
export class GroupUserHistoryService extends EndpointService {
    constructor(protected http: HttpClient) {
        super(http);
    }

    getRightHistoryData(userIds: number[], groupIds: number[], fromDate: Date, toDate: Date): Observable<ApiResponse> {
        const request: RightHistoryDataRequest = { fromDate: fromDate, toDate: toDate, userIds: userIds.toString(), groupIds: groupIds.toString() }
        if (environment.isRestful) {
            const url = `${environment.appUrls.reports}Reports/GetRightHistoryData`;
            return this.getHttpPostApiResponse(url, 'getRightHistoryData', request);
        }
        const url = `${environment.appUrls.reports}GetRightHistoryData`;
        return this.getHttpPostApiResponse(url, 'getRightHistoryData', { request });
    }
}

