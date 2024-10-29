import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UtilitiesService } from '@mango/core-shared';
import { Api } from '@mango/data-models/lib-data-models';
import { combineLatest, Observable } from 'rxjs';
import {
  PROJECT_REQUIRE_TASK_NOTES,
  CLIENT_REQUIRE_NOTES,
  PROJECT_NOTES_OVERRIDE,
} from '@project-dashboard/models/constants/project-tasks-constants';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RequiredNotesFlagService {
  projects: string = UtilitiesService.getBaseApiUrl(Api.projects);
  projectTaskNotesRequired: boolean = true;

  constructor(private http: HttpClient) {}

  getClientPreference(clientPreferenceSetting): Observable<any> {
    return this.http.get(
      `${this.projects}projects/GetClientPreference/${clientPreferenceSetting}`
    );
  }

  getProjectTaskSettings(projectId): Observable<any> {
    return this.http.get(
      `${this.projects}projects/projecttaskssettings/${projectId}`
    );
  }

  getRequiredNotesFlag(projectId): Observable<boolean> {
    return combineLatest([
      this.getClientPreference(PROJECT_REQUIRE_TASK_NOTES),
      this.getProjectTaskSettings(projectId),
    ]).pipe(
      filter(
        ([clientPreferences, projTaskSettings]) =>
          !!clientPreferences && !!projTaskSettings
      ),
      map(([clientPreferences, projTaskSettings]) => {
        if (clientPreferences.success && projTaskSettings.success) {
          this.projectTaskNotesRequired =
            projTaskSettings.data.projectAllowTaskNoteOverride ==
            PROJECT_NOTES_OVERRIDE
              ? projTaskSettings.data.projectRequiredTaskNotes
              : clientPreferences.data == CLIENT_REQUIRE_NOTES
              ? true
              : false;
        } else {
          this.projectTaskNotesRequired = true;
        }
        return this.projectTaskNotesRequired;
      })
    );
  }
}
