import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { SearchComponent } from '@mango/ui-shared/cosmos';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { Router } from '@angular/router';
import { CardsService } from '@project-dashboard/services/cards.service';
import { Team, TeamMember} from '@mango/data-models/lib-data-models';
import { TeamMembersComponent } from './team-members/team-members.component';
import CheckBox from 'devextreme/ui/check_box';

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
  dataRetrieved: boolean = false;
  autoExpand: boolean = false;
  headerCheckBox: any;
	headerHtmlCellElement: any;

  constructor(private dashboardService: DashboardService, private router: Router,
              private cardsService: CardsService) { }

  ngOnInit(): void {
  
    this.getUserPreferences();

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

  addTeam() {}

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
