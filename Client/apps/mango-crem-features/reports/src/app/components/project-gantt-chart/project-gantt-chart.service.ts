import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../mango/src/environments/environment.local';
import { EndpointService } from '../../shared/services/endpoint.service';

@Injectable()
export class ProjectGanttChartService extends EndpointService {
    constructor(protected http: HttpClient) {
        super(http);
    }

    getProject(projectId: number): Observable<any> {
        if (environment.isRestful) {
            const url = `${environment.appUrls.reports}Reports/GetProject/${projectId}`;
            return this.callHttpGet(url, 'getProject')
        }
        const url = `${environment.appUrls.reports}GetProject`;
        return this.callHttpPost(url, 'getProject', { projectId })
    }

    getGanttChartData(projectId: number): Observable<any> {
        if (environment.isRestful) {
            const url = `${environment.appUrls.reports}Reports/GetProjectGanttChartData/${projectId}`;
            return this.callHttpGet(url, 'getGanttChartData')
        }
        const url = `${environment.appUrls.reports}GetProjectGanttChartData`;
        return this.callHttpPost(url, 'getGanttChartData', { projectId })
    }

    getObjectNameAndType(objectId: number, objectTypeId: number): Observable<any> {
        if (environment.isRestful) {
            const url = `${environment.appUrls.reports}Reports/GetObjectNameAndType/${objectId}/${objectTypeId}`;
            return this.callHttpGet(url, 'getObjectNameAndType')
        }
        const url = `${environment.appUrls.reports}GetObjectNameAndType`;
        return this.callHttpPost(url, 'getObjectNameAndType', { objectId, objectTypeId })
    }
}

