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
import { SaveTeamTemplateComponent } from './save-team-template/save-team-template.component';


@Component({
  selector: 'project-teams',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.scss']
})
export class ProjectTeamComponent implements OnInit, OnDestroy {

  dataRetrieved: boolean = false;;
  projectTeam: ProjectTeamMember[];
  projectId: number;
  memberInfo: MemberInfo = <MemberInfo>{};
  selectedMemberContactIds: number[] = [];
  userAccessLevel: number;
  subs: Subscription[] = [];
  constructor(private dashboardService: DashboardService, 
              private dialog: MatDialog,
              private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.subs.push(this.route.queryParams.pipe(
      filter(params => !!params && !!params.oid),
      tap(params => {this.projectId = params.oid}),
      switchMap(params => this.getProjectTeam(params.oid)),
      tap(_ => {this.getMemberInfo(), this.getProjectContactLevel(this.projectId)}),
    ).subscribe());
  }

  addOrEditMember(operation) {
    let height;
    if(operation == 'AC') {
      height = '500px';
    } else {
      height = '800px';
    }
    let dialogRef = this.dialog.open(AddEditMemberComponent, {
      height: height,
      width: '500px',
      panelClass: 'addEditMemberModal',
      data: { memberInfo: this.memberInfo, projectId: this.projectId, operation:operation },
      disableClose: true
    });

    this.subs.push(dialogRef.afterClosed().pipe(
      tap(_ => console.log(`modal closed`))
    ).subscribe());
  }

  removeMembers() {

  }

  saveTeamAsTemplate() {
    let dialogRef = this.dialog.open(SaveTeamTemplateComponent, {
      height: '300px',
      width: '600px',
      panelClass: 'saveTeamTemplateModal',
      data: { projectId: this.projectId },
      disableClose: true
    });

    this.subs.push(dialogRef.afterClosed().subscribe());
  }

  onSelectionChanged(e:any){
    this.selectedMemberContactIds = e.selectedRowKeys;
  }

  public getProjectTeam(projectId): Observable<any> {
    this.selectedMemberContactIds = [];
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

  public getProjectContactLevel(projectId) {
    this.subs.push(this.dashboardService.getProjectContactLevel(projectId).subscribe(
      (res:any) => {
        this.userAccessLevel = res.data;
      },
      (error: any) => console.log("Error occurred getting User Access Level ", error),
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