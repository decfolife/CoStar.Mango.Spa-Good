import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MemberInfo, Team, TeamKeys, TeamMember } from '@mango/data-models/lib-data-models';
import { SearchComponent } from '@mango/ui-shared/cosmos';
import { CardsService } from '@project-dashboard/services/cards.service';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { AddEditTeamComponent } from './add-edit-team/add-edit-team.component';
import { TeamMembersComponent } from './team-members/team-members.component';
import * as ExcelJS from 'exceljs';
import { Buffer } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { formatDate } from '@angular/common';
import dxCheckBox, { InitializedEvent } from 'devextreme/ui/check_box';

import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { Observable, Subscription, of } from 'rxjs';
import { MangoDialogService } from '@project-dashboard/services/mango-dialog.service';
import { ExportDevexDatagridService } from '@mango/core-shared';

@Component({
  selector: 'teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit, OnDestroy {
  @ViewChild("TeamsGrid") teamsGrid: DxDataGridComponent;
  @ViewChild('SearchBox') searchBox: SearchComponent;
  @ViewChild(TeamMembersComponent) teamMembersComponent: TeamMembersComponent;

	private subEditedMembersDataAndGridList: any [] = [];
  searchText: string = "";
  teams: Team[];
  teamMembers: TeamMember[];
  teamNames: string[] = [];
  memberInfo: MemberInfo;
  dataRetrieved: boolean = false;
  autoExpand: boolean = false;
  headerCheckBox: any;
  headerHtmlCellElement: any;

  selectAllCheckBox: dxCheckBox;
  teamSelected: boolean = false;
  selectedMemberIds: number[] = [];
  selectedTeamIds: number[] = [];
  teamsTobeRemoved: number[] = [];
  selectedTeams: Team[] = [];
  selectedMembersData: TeamKeys[] = [];
  userModuleAddRights: boolean;
  subs: Subscription[] = [];
  projectsPrivateSetting: number;

  constructor(private dashboardService: DashboardService, private router: Router,
    private exportToExcelService: ExportDevexDatagridService,
    private dialogService: MangoDialogService,
    private dialog: MatDialog, private cardsService: CardsService) {}

  ngOnInit(): void {

    this.subs.push(this.getUserPreferences().subscribe());
    this.getModuleRights();
    this.getProjectsPrivateSetting();
    this.getMemberInfo();
    this.subs.push(this.getTeamsData().subscribe());
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
    let team = <Team>{};
    this.teamNames=[];
    if(tFunc == "edit") {
      team=editTeam;
      let tempTeams = this.teams.filter(tempTeam => tempTeam.teamId != team.teamId);
      this.teamNames = tempTeams.map(team => team.teamName.toLowerCase().trim());
    } else {
      this.teamNames = this.teams.map(team => team.teamName.toLowerCase().trim());
    }

    let dialogRef = this.dialog.open(AddEditTeamComponent, {
      height: '600px',
      width: '2000px',
      panelClass: 'addEditTeamModal',
      data: { teamFunction: tFunc, memberInfo: this.memberInfo, team: team, 
              projectsPrivateSetting: this.projectsPrivateSetting, teamNames: this.teamNames},
      disableClose: true
    });

    this.subs.push(dialogRef.afterClosed().pipe(
      filter(res => !!res),
      switchMap(_ => this.getTeamsData())
    ).subscribe());
  }

  deleteTeams(removeTeam?:Team, singleTeam?: boolean) {
    this.teamsTobeRemoved = [];
    let confirmText = "You are about to delete the following team(s). Do you want to continue ?\n\n"
    if(singleTeam) {
      confirmText += removeTeam.teamName + "\n";
      this.teamsTobeRemoved.push(removeTeam.teamId);
    } else {
      this.teamsTobeRemoved = this.selectedTeamIds;
      this.selectedTeams.forEach(team => {
        confirmText += team.teamName + "\n";
      })
    }

    this.subs.push(this.dialogService.confirm('Teams Deletion', confirmText, 'Confirm', 'Cancel').pipe(
      filter(confirmed => !!confirmed),
      switchMap(_ => this.dashboardService.deleteTeams(this.teamsTobeRemoved)),
      switchMap(res => {
        if (res.success && !singleTeam) {
          this.selectedTeamIds = [];
          this.selectedTeams = [];
        }
        return res.success ? 
        (this.dashboardService.successNotify("Selected Team(s) successfully removed."), this.getTeamsData()) 
        : of(this.dashboardService.errorNotify("The teams(s) could not be deleted. Please review and try again."))
      })
    ).subscribe());
  }

  removeMembers() {
    let removingAllTeamMembers = false;
    this.selectedMembersData.forEach(selectedTeam => {
      const index = this.teams.findIndex(team => team.teamId == selectedTeam.teamId);
      if(this.teams[index].teamMembers.length == selectedTeam.memberIds.length){
        removingAllTeamMembers = true;
      }
    });
    if(removingAllTeamMembers) {
      this.subs.push(this.dialogService.alert('Remove All Team Members!', `Team Member Removal can not be done. You have selected all team members for one or more teams.  At least one team member must be assigned to a team.`, 'OK').subscribe());
    } else {
      this.subs.push(this.dialogService.confirm('Remove Members', `Do you want to remove the Selected Members from their teams ?`, 'Confirm', 'Cancel').pipe(
        filter(confirmed => !!confirmed),
        switchMap(_ => this.dashboardService.deleteTeamMembers(this.selectedMemberIds)),
        switchMap(res => !!res.success ? 
          (this.dashboardService.successNotify("Selected Member(s) successfully removed."), this.getTeamsData()) 
          : this.dialogService.alert('Team Member Removal', 'Selected Member(s) could not be deleted. Please review and try again later.', 'OK')
        )
      ).subscribe());
    }
  }

  getLatestData() {
    this.subs.push(this.getTeamsData().subscribe());
  }

  getTeamsData(): Observable<any> {
    this.selectedMembersData = [];
    this.selectedMemberIds = [];
    return this.dashboardService.getTeams().pipe(
      filter(res => !!res && !!res.success),
      tap(res => {
        this.teams = res.data;
        this.dataRetrieved = true;
        this.initEditFlag(this.teams);
      }),
      catchError(error => of(console.log("Error occurred getting Teams Data ", error)))
    )
  }

  getUserPreferences(): Observable<any> {
    return this.dashboardService.GetUserPreferences().pipe(
      filter(res => !!res && !!res.success),
      map(res => this.cardsService.setUserDateFormat(res.data.isDatesEU))
    );
  }

  getModuleRights() {
    const objectType = 161;
    const securityType = 3;
    this.subs.push(this.dashboardService.getModuleRights(objectType, securityType).subscribe(
      (res:any) => {
        if (res.success) {
          this.userModuleAddRights = res.data;
        }
      }
    ));
  }

  getMemberInfo() {

    this.subs.push(this.dashboardService.getmemberinfo().subscribe(
      (res:any) => {
        this.memberInfo = res.data;
      },
      (error: any) => console.log("Error occurred getting Member Info Data ", error),
      () => {}
    ));
  }

  toggleExpand() {
    this.cancelChangesForOutsideOfGridClick();
    this.autoExpand = !this.autoExpand;
  }

  searchDataGrid(data) {
    this.searchText = data;
    this.teamsGrid.instance.searchByText(this.searchText);
  }

  searchBoxClick() {
    this.cancelChangesForOutsideOfGridClick();
  }

  clearAllFilters() {
    this.cancelChangesForOutsideOfGridClick();
    this.teamsGrid.instance.clearFilter();
    this.teamsGrid.instance.searchByText(this.searchText);
  }

  onEditorPreparing(e) {
    if (e.type !== 'selection') return;
    if (e.parentType === 'headerRow') {
      e.editorOptions.onInitialized = (e: InitializedEvent) => {
        if (e.component) this.selectAllCheckBox = e.component;
      };
    }
  }

  gridOnCellPrepared(e) {
    if(e.column.command == 'select') {
      if( !this.userModuleAddRights ) {
        this.hideCheckBoxes(e);
      }
      else if(e.rowType !== 'header' && (!e.data.canDelete)) {
        this.hideCheckBoxes(e);
      }
    }
  }

  hideCheckBoxes(e) {
    let htmlCellElement = e.cellElement.length === undefined ? e.cellElement : e.cellElement[0];
    var editor = dxCheckBox.getInstance(htmlCellElement.querySelector(".dx-select-checkbox"));
    if(editor) {
      editor.option("visible", false);
    }
    htmlCellElement.style.pointerEvents = 'none';
  }

  onSelectionChanged(e:any){
    const deselectRowKeys: number[] = [];
    const dataGrid = e.component;
    e.selectedRowsData.forEach(row => {
      if(!row.canDelete) {
        deselectRowKeys.push(row.teamId);
      }
    });
    if(deselectRowKeys.length) {
      dataGrid.deselectRows(deselectRowKeys);
    }

    this.teamSelected = e.selectedRowsData.length? true: false;
    this.selectAllCheckBox.option('value',  this.teamSelected);

    this.selectedTeams = e.selectedRowsData;
    this.selectedTeamIds = e.selectedRowKeys;
  }

  onCellClick(e:any) {
    if(e.rowType === 'header' && e.columnIndex > 1) {
      this.cancelChangesForOutsideOfGridClick();
    }
  }

  onOptionChanged(e:any) {
    if (e.name === "columns" && e.fullName.endsWith("filterValues")) {
      this.cancelChangesForOutsideOfGridClick();
    }
  }

  selectedMembers(e) {
    this.selectedMemberIds = this.selectedMemberIds.concat(e);
  }

  unSelectedMembers(e) {
    this.selectedMemberIds = this.selectedMemberIds.filter(item => !e.includes(item));
  }

  selectedTeamandMembers(e) {
    if(this.selectedMembersData.length) {
      const index = this.selectedMembersData.findIndex(team => team.teamId == e.teamId);
      if (index > -1) {
        this.selectedMembersData[index].memberIds = e.memberIds;
      } else {
        this.selectedMembersData.push(e);
      }
    } else {
      this.selectedMembersData.push(e);
    }
  }

  subGridEditClicked(e){
		const foundIndex = this.subEditedMembersDataAndGridList.findIndex(em => em.memberData.data.teamId === e.memberData.data.teamId);

		//remove if found because 2 team members can not be in edit mode on the same team
		if (foundIndex >= 0)
			this.subEditedMembersDataAndGridList.splice(foundIndex, 1);

		this.subEditedMembersDataAndGridList.push(e);
  }

  exportToFile() {
    let excelFileName = 'TeamsList_' + formatDate(new Date(), 'yyyy-MM-dd_HHmmss', 'en-US') + '.xlsx';
    var workbook = new ExcelJS.Workbook();
    var worksheet = workbook.addWorksheet('Teams');
    worksheet.properties.outlineProperties = {
      summaryBelow: false,
      summaryRight: false,
    };

    let masterRows = [];
    this.teamsGrid.instance.getDataSource().items().forEach((value, index) => {
      masterRows.push({ rowIndex: index, data: value });
    });

    const borderStyle = { style: "thin", color: { argb: "FF7E7E7E" } };
    const insertRow = (currentIndex, outlineLevel) => {
      const row = worksheet.insertRow(currentIndex, [], 'n');

      for(var j = worksheet.rowCount + 1; j > currentIndex; j--) {
        worksheet.getRow(j).outlineLevel = worksheet.getRow(j - 1).outlineLevel;
      }
      row.outlineLevel = outlineLevel;
      return row;
    }

    let rowIndex = 1;
    const mainCaptions = ["Team ID", "Name", "Members", "Modified By", "Modified Date", "Created By", "Created Date", "Rights"];
    let row = insertRow(rowIndex, 1);
    mainCaptions.forEach((mainCaption, currentColumnIndex) => {
      Object.assign(row.getCell(currentColumnIndex+1), {
        value: mainCaption,
        font: { bold: true }
      });
    });

    for(var i = 0; i < masterRows.length; i++) {
      rowIndex++;
      let row = insertRow(rowIndex, 1);

      let teamData = this.teams.find((item) => item.teamId === masterRows[i].data.teamId);
      const mainColumns = ["teamId", "teamName", "members", "modifiedBy", "modifiedDate", "createdBy", "createdDate", "securityLevel"];

      mainColumns.forEach((columnName, currentColumnIndex) => {
        Object.assign(row.getCell(currentColumnIndex+1), {
          value: teamData[columnName]
        });
      });

      rowIndex++;
      row = insertRow(rowIndex, 2);
      Object.assign(row.getCell(1), {
        value: 'Team Members',
        font: { bold: true }
      });
      worksheet.mergeCells(row.number, 1, row.number, 8);
      row.hidden = true;

      rowIndex++;
      row = insertRow(rowIndex, 2);
      const captions = ["Name", "Company", "Email", "Phone Number", "Role", "Email Notifications", "Access Level"];
      captions.forEach((caption, currentColumnIndex) => {
        Object.assign(row.getCell(currentColumnIndex+2), {
          value: caption,
          font: { bold: true },
          border: { bottom: borderStyle, left: borderStyle, right: borderStyle, top: borderStyle }
        });
      });
      row.hidden = true;

      const columns = ["name", "company", "email", "phoneNumber", "role", "emailOn",  "level"];
      this.teams.filter((team) => team.teamId === teamData.teamId)[0].teamMembers.forEach((teamMember, index) => {
        rowIndex++;
        row = insertRow(rowIndex, 2);
        row.hidden = true;
        columns.forEach((columnName, currentColumnIndex) => {
          Object.assign(row.getCell(currentColumnIndex+2), {
            value: teamMember[columnName],
            border: { bottom: borderStyle, left: borderStyle, right: borderStyle,top: borderStyle }
          });
        });
      });
    }

    worksheet.columns.forEach(function (column, i) {
      let maxLength = 0;
      column["eachCell"]({ includeEmpty: true }, function (cell) {
        var columnLength = cell.value ? cell.value.toString().length : 10;
        if (columnLength > maxLength ) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength < 10 ? 10 : maxLength;
    });

    workbook.xlsx.writeBuffer().then((buffer: Buffer) => {
      saveAs(new Blob([ buffer ], { type: 'application/octet-stream' }), excelFileName);
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe);
  }

	private cancelChangesForOutsideOfGridClick() {
		this.subEditedMembersDataAndGridList.forEach(memDataAndGrid => {
			memDataAndGrid.memberData.data.editMode = false;
			memDataAndGrid.membersGrid.instance.cancelEditData();
      memDataAndGrid.memberData.data.emailOn = memDataAndGrid.emailNotify;
      memDataAndGrid.memberData.data.share = memDataAndGrid.shareValue;
  });

		this.subEditedMembersDataAndGridList = [];
	}

  private getProjectsPrivateSetting() {
    this.subs.push(this.dashboardService.getClientPreference('ClientProjectsPrivate').subscribe(
      (res:any) => {
        if (res.success) {
          this.projectsPrivateSetting = Number(res.data);
        }
      },
      (error: any) => console.log("Error occurred getting Projects Private Setting", error),
      () => {}
    ));
  }
}

