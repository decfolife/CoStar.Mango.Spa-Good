import { Injectable } from '@angular/core';
import {
  EndpointService,
  UtilitiesService,
} from '@mango/core-shared/lib-core-shared';
import { Observable, of } from 'rxjs';
import {
  Api,
  UserModuleRight,
  ObjectType,
} from '@mango/data-models/lib-data-models';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BaseService extends EndpointService {
  accountingUrl: string = UtilitiesService.getBaseApiUrl(Api.accounting);
  public userRights = 0; // 0 No Rights, 1 View Rights, 2 Add Rights

  getUserRights() {
    const url = `${this.accountingUrl}/Base/GetUserRights`;
    return this.callHttpGet(url, 'getUserRights');
  }

  HasUserModuleRight(): Observable<boolean> {
    const url = `${this.accountingUrl}/base/GetUserModuleRights`;
    return this.callHttpGet(url, 'getUserModuleRights').pipe(
      map((result) =>
        result.data.find(
          (x) => x.moduleId === ObjectType.MANAGE_ACCOUNTING_SETTINGS
        )
      ),
      map(
        (moduleRight) =>
          moduleRight !== null &&
          (moduleRight as UserModuleRight).maxSecurityTypeId > 0
      ),
      catchError((error) => {
        const message = `ModuleRight Retrieval error: ${error}`;
        console.error(message);
        return of(false);
      })
    );
  }
}
