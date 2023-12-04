import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Injectable()
export class ProjectGanttChartService extends EndpointService {
    constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
        super(http, facade);
    }

    getProject(projectId: number): Observable<any> {
        const url = `${environment.appUrls.reports}Reports/GetProject/${projectId}`;
        return this.callHttpGet(url, 'getProject')
    }

    getGanttChartData(projectId: number): Observable<any> {
        const url = `${environment.appUrls.reports}Reports/GetProjectGanttChartData/${projectId}`;
        return this.callHttpGet(url, 'getGanttChartData')
    }

    getObjectNameAndType(objectId: number, objectTypeId: number): Observable<any> {
        const url = `${environment.appUrls.reports}Reports/GetObjectNameAndType/${objectId}/${objectTypeId}`;
        return this.callHttpGet(url, 'getObjectNameAndType')
    }
}

