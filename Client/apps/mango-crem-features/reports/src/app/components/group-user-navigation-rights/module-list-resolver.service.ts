import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ResolvedData } from '../../shared/models/index';
import { GroupUserNavigationRightsService } from './group-user-navigation-rights.service';

@Injectable({
  providedIn: 'any',
})
export class ModuleListResolver {
  constructor(
    private groupUserNavigationRightsService: GroupUserNavigationRightsService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ResolvedData> {
    return this.groupUserNavigationRightsService
      .getNavigationRightModuleList()
      .pipe(
        map((result) => ({ data: result.data })),
        catchError((error) => {
          const message = `ModuleListResolver Retrieval error: ${error}`;
          console.error(message);
          return of({ data: null, error: message });
        })
      );
  }
}
