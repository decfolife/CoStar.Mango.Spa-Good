import { QuickApprovalRequest } from './../models/interfaces/quick-approval.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilitiesService } from '@mango/core-shared';
import { Api } from '@mango/data-models/lib-data-models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuickApprovalService {
  projects: string = UtilitiesService.getBaseApiUrl(Api.projects);

  baseProjectsUrl = `${this.projects}projects/quickapprovals/`;
  baseTasksUrl = `${this.projects}tasks/approverejecttasks`;

  constructor(private http: HttpClient) {}

  getQuickApprovals(projectId: string): Observable<any> {
    return this.http.get(`${this.baseProjectsUrl}${projectId}`);
  }

  saveQuickApprovals(data: QuickApprovalRequest): Observable<any> {
    return this.http.post(this.baseTasksUrl, data);
  }
}
