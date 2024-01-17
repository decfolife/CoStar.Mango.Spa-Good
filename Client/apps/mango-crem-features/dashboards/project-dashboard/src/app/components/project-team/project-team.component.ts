import { Component, OnDestroy, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { MemberInfo, ProjectTeamMember } from '@mango/data-models/lib-data-models'
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError, filter, first, map, switchMap, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AddEditMemberComponent } from './add-edit-member/add-edit-member.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'project-teams',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.scss']
})
export class ProjectTeamComponent implements OnInit, OnDestroy {

  dataRetrieved: boolean = false;;
  projectTeam: ProjectTeamMember[];
  memberInfo: MemberInfo = <MemberInfo>{};
  subs: Subscription[] = [];
  constructor(private dashboardService: DashboardService, 
              private dialog: MatDialog,
              private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.subs.push(this.route.queryParams.pipe(
      filter(params => !!params && !!params.oid),
      tap(params => console.log(`${params.oid}`)),
      switchMap(params => this.getProjectTeam(params.oid)),
      tap(_ => this.getMemberInfo()),
    ).subscribe());
  }

  addOrEditTeamMember() {

    let dialogRef = this.dialog.open(AddEditMemberComponent, {
      height: '800px',
      width: '500px',
      panelClass: 'addEditMemberModal',
      data: { memberInfo: this.memberInfo },
      disableClose: true
    });

    this.subs.push(dialogRef.afterClosed().pipe(
      tap(_ => console.log(`modal closed`))
    ).subscribe());
  }

  public getProjectTeam(projectId): Observable<any> {
    return this.dashboardService.getProjectTeams(projectId).pipe(
      filter(res => !!res && !!res.success),
      tap(res => {
        this.projectTeam = res.data;
        this.dataRetrieved = true;
      }),
      catchError(error => (this.dataRetrieved = true, console.log("Error occurred getting Teams Data ", error), of(false)))
    )
  }

  public getMemberInfo() {
    this.subs.push(this.dashboardService.getmemberinfo().subscribe(
      (res:any) => {
        this.memberInfo = res.data;
      },
      (error: any) => console.log("Error occurred getting Member Info Data ", error),
      () => {}
    ));
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