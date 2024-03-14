import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ResolvedData } from '../../shared/models/index';
import { SharedService } from "../services/shared.service";

@Injectable({
    providedIn: 'any'
})

export class UserPreferencesResolver  {

    constructor(private service: SharedService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<ResolvedData> {
        return this.service.getUserPreferences()
            .pipe(
                map(result => ({ data: result.data })),
                catchError(error => {
                    const message = `UserPreferencesResolver Retrieval error: ${error}`;
                    console.error(message);
                    return of({ data: null, error: message });
                })
            )
    }
}