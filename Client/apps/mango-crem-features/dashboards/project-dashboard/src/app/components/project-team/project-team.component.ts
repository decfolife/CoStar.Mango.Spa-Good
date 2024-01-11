import { Component, OnDestroy, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { ProjectTeamMember } from '@mango/data-models/lib-data-models'
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError, filter, first, map, switchMap, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';


@Component({
  selector: 'project-teams',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.scss']
})
export class ProjectTeamComponent implements OnInit, OnDestroy {

  dataRetrieved: boolean = false;;
  projectTeam: ProjectTeamMember[];
  subs: Subscription[] = [];
  constructor(private dashboardService: DashboardService, private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.subs.push(this.route.queryParams.pipe(
      filter(params => !!params && !!params.oid),
      tap(params => console.log(`${params.oid}`)),
      switchMap(params => this.getProjectTeam(params.oid)),
    ).subscribe());
  }

  public getProjectTeam(projectId): Observable<any> {
    return this.dashboardService.getProjectTeams(projectId).pipe(
      filter(res => !!res && !!res.success),
      tap(res => {
        this.projectTeam = res.data;
        this.dataRetrieved = true;
      }),
      catchError(error => (this.dataRetrieved = true, of(console.log("Error occurred getting Teams Data ", error))))
    )
  }

  emailToggle(e, data) {
    
  }

  sharedToggle(e, data) {

  }

  toggleExpand() {
    
  }

  clearAllFilters() {

  }

  searchDataGrid(e) {
    
  }

	ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe);
  }
}