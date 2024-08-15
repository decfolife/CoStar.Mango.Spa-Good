import { SaveTaskTemplatePayload } from './../models/interfaces/save-tasks-template.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilitiesService } from '@mango/core-shared';
import { Api } from '@mango/data-models/lib-data-models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SaveTasksTemplateService {
  saveTasksTemplateSaveClick$ = new BehaviorSubject(false);

  projects: string = UtilitiesService.getBaseApiUrl(Api.projects);

  baseSaveTasksTemplateUrl = `${this.projects}projects/createteamtemplate`;

  constructor(private http: HttpClient) {}

  saveTasksTemplate(data: SaveTaskTemplatePayload): Observable<any> {
    return this.http.post(this.baseSaveTasksTemplateUrl, data);
  }
}
