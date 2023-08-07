import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { ResolvedData } from '../../shared/models/index';
import { ProjectGanttChartService } from "./project-gantt-chart.service";

@Injectable({
    providedIn: 'any'
})

export class ProjectResolver implements Resolve<ResolvedData> {

    constructor(private service: ProjectGanttChartService) { }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<ResolvedData> {
        const projectId = +route.params['projectId'];
        return this.service.getProject(projectId)
            .pipe(
                map(result => ({ data: result.data })),
                catchError(error => {
                    const message = `ProjectResolver Retrieval error: ${error}`;
                    console.error(message);
                    return of({ data: null, error: message });
                })
            )
    }
}