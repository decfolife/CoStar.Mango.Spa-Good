import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MemberInfo, Team, TeamMember } from '@mango/data-models/lib-data-models';
import { SearchComponent } from '@mango/ui-shared/cosmos';
import { CardsService } from '@project-dashboard/services/cards.service';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { AddEditTeamComponent } from './add-edit-team/add-edit-team.component';
import { TeamMembersComponent } from './team-members/team-members.component';

@Component({
  selector: 'teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {
  @ViewChild("TeamsGrid") teamsGrid: DxDataGridComponent;
  @ViewChild('SearchBox') searchBox: SearchComponent;
  @ViewChild(TeamMembersComponent) teamMembersComponent: TeamMembersComponent;

  searchText: string = "";
  teams: Team[];
  teamMembers: TeamMember[];
  memberInfo: MemberInfo;
  dataRetrieved: boolean = false;
  autoExpand: boolean = false;
  headerCheckBox: any;
	headerHtmlCellElement: any;

  constructor(private dashboardService: DashboardService, private router: Router,
              private dialog: MatDialog,  private cardsService: CardsService) { }

  ngOnInit(): void {
  
    this.getUserPreferences();
    this.getMemberInfo();

    this.dashboardService.getTeams().subscribe(
      (res:any) => {
        this.teams = res.data;
        this.dataRetrieved = true;
        this.initEditFlag(this.teams);
      },
      (error: any) => console.log("Error occurred getting Teams Data ", error),
      () => {}
    );
  }
  
  initEditFlag(teams) {
    if(teams.length) {
      teams.forEach(team => {
        if(team.teamMembers.length) {
          team.teamMembers.forEach(teamMember => { teamMember.editMode = false})
        }
      })
    }
  }

  addOrEditTeam(tFunc: string, editTeam?:Team ) {
    let team = {};
    if(tFunc == "edit") {
      team=editTeam;
    }
    let dialogRef = this.dialog.open(AddEditTeamComponent, {
      height: '600px',
      width: '2000px',
      panelClass: 'addEditTeamModal',
      data: { teamFunction: tFunc, memberInfo: this.memberInfo, team: team, },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  doSomethingForNow(data) {}

  getUserPreferences(){
    this.dashboardService.GetUserPreferences().subscribe(
      (res:any) => {
        if (res.success) {
            this.cardsService.setUserDateFormat(res.data.isDatesEU);
        }
      }
    );
  }

  getMemberInfo() {

    this.dashboardService.getmemberinfo().subscribe(
      (res:any) => {
        this.memberInfo = res.data;
      },
      (error: any) => console.log("Error occurred getting Member Info Data ", error),
      () => {}
    );
  }

  toggleExpand() {
    this.autoExpand = !this.autoExpand;
  }

  searchDataGrid(data) {
    this.searchText = data;
		this.teamsGrid.instance.searchByText(this.searchText);
	}

  exportDataGrid(): void {
    this.teamsGrid.instance.exportToExcel(false);
  }

  clearAllFilters() {
    this.teamsGrid.instance.clearFilter();
    this.teamsGrid.instance.searchByText(this.searchText);
  }

}
