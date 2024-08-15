import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilitiesService } from '@mango/core-shared';
import { Api } from '@mango/data-models/lib-data-models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuickApprovalService {
  quickApprovalSaveClick$ = new BehaviorSubject(false);

  projects: string = UtilitiesService.getBaseApiUrl(Api.projects)

  baseProjectsUrl = `${this.projects}projects/quickapprovals/`;
  baseTasksUrl = `${this.projects}tasks/approverejecttasks`

  constructor(private http: HttpClient) {}

  getQuickApprovals(projectId): Observable<any> {
    return this.http.get(`${this.baseProjectsUrl}${projectId}`)
  }

  saveQuickApprovals(data: any): Observable<any> {
    return this.http.post(this.baseTasksUrl, data)
  }
}
