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
import * as ExcelJS from 'exceljs';
import { Buffer, Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { formatDate } from '@angular/common';
import dxCheckBox, { InitializedEvent } from 'devextreme/ui/check_box';

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

  selectAllCheckBox: dxCheckBox;
  teamSelected: boolean = false;
  selectedMemberIds: number[] = [];
  userModuleAddRights: boolean;

  constructor(private dashboardService: DashboardService, private router: Router,
              private dialog: MatDialog,  private cardsService: CardsService) { }

  ngOnInit(): void {
  
    this.getUserPreferences();
    this.getModuleRights();
    this.getMemberInfo();
    this.getTeamsData();
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
      if(result) { 
        this.dataRetrieved = false;
        this.getTeamsData();
        this.teamsGrid.instance.refresh();
      }
    });
  }

  doSomethingForNow(data) {}

  getTeamsData() {
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

  getUserPreferences(){
    this.dashboardService.GetUserPreferences().subscribe(
      (res:any) => {
        if (res.success) {
            this.cardsService.setUserDateFormat(res.data.isDatesEU);
        }
      }
    );
  }

  getModuleRights() {
    const objectType = 161;
    const securityType = 3;
    this.dashboardService.getModuleRights(objectType, securityType).subscribe(
      (res:any) => {
        if (res.success) {
          this.userModuleAddRights = res.data;
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
        this.disableCheckBoxes(e);
      }	
       else if(e.rowType !== 'header' && e.data.securityLevel.toLocaleLowerCase().trim() == "view") {
        this.disableCheckBoxes(e);
       }
		} 
	}

  disableCheckBoxes(e) {
    let htmlCellElement = e.cellElement.length === undefined ? e.cellElement : e.cellElement[0];   
    var editor = dxCheckBox.getInstance(htmlCellElement.querySelector(".dx-select-checkbox"));  
    if(editor) {
      editor.option("disabled", true);
    }  
    htmlCellElement.style.pointerEvents = 'none'; 
  }

  onSelectionChanged(e:any){  
    const deselectRowKeys: number[] = [];
    const dataGrid = e.component;
    e.selectedRowsData.forEach(row => {
      if(row.securityLevel.toLocaleLowerCase().trim() == "view") {
        deselectRowKeys.push(row.teamId);
      }
    });
      if(deselectRowKeys.length) {
        dataGrid.deselectRows(deselectRowKeys);
      }

      this.teamSelected = e.selectedRowsData.length? true: false;
      this.selectAllCheckBox.option('value',  this.teamSelected);
  }

  selectedMembers(e) {
    this.selectedMemberIds = this.selectedMemberIds.concat(e);
  }

  unSelectedMembers(e) {
    this.selectedMemberIds = this.selectedMemberIds.filter(item => !e.includes(item));
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
    this.teams.forEach((value, index) => {
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
}

