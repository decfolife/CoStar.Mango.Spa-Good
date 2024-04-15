import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable()
export class ProjectGanttChartService extends EndpointService {
    reportsUrl: string = UtilitiesService.getBaseApiUrl(Api.reports)
    
    constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
        super(http, facade);
    }

    getProject(projectId: number): Observable<any> {
        const url = `${this.reportsUrl}Reports/GetProject/${projectId}`;
        return this.callHttpGet(url, 'getProject')
    }

    getGanttChartData(projectId: number): Observable<any> {
        const url = `${this.reportsUrl}Reports/GetProjectGanttChartData/${projectId}`;
        return this.callHttpGet(url, 'getGanttChartData')
    }

    getObjectNameAndType(objectId: number, objectTypeId: number): Observable<any> {
        const url = `${this.reportsUrl}Reports/GetObjectNameAndType/${objectId}/${objectTypeId}`;
        return this.callHttpGet(url, 'getObjectNameAndType')
    }
}

