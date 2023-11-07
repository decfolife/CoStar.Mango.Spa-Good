import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MemberInfo, TeamMemUpdate, TeamMember } from '@mango/data-models/lib-data-models';
import { DxDataGridComponent } from 'devextreme-angular';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import CheckBox from 'devextreme/ui/check_box';


@Component({
  selector: 'team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent implements OnInit {

	@Input() teamMembers : TeamMember[];
	@Input() searchText: string;
	@Input() rights: string;
	@Input() memberInfo: MemberInfo; 

	public dataRetrieved: boolean = false;
	memberIds: number[];
	memberUpdate: TeamMemUpdate;
	headerCheckBox: any;
	headerHtmlCellElement: any;
	emailNotify: boolean;

	@ViewChild("TeamMembersGrid") teamMembersGrid: DxDataGridComponent;
	@Output() subGridEditClicked: EventEmitter<any> = new EventEmitter();

	constructor(private dashboardService: DashboardService) {}	

	ngOnInit() {}

	ngAfterViewInit() {
    if(this.searchText) this.searchDataGrid();
  }

	searchDataGrid() {
		this.teamMembersGrid.instance.searchByText(this.searchText);
	}

	editRow(memberData: any) {
		this.emailNotify = memberData.data.emailOn;
		this.teamMembersGrid.instance.cancelEditData();
		this.resetEditMode();
		this.teamMembersGrid.instance.editRow(memberData.rowIndex);
		memberData.data.editMode = true;
	}

	saveMemberChanges(e:any, member: TeamMember) {

		member.emailOn = this.emailNotify;
		this.memberUpdate = {
			teamId: member.teamId,
			contactId: member.contactId,
			emailOn: member.emailOn,
			role: member.role,
			level: member.level.charAt(1),
			share: member.share,
		}

		this.dashboardService.updateTeamMember(this.memberUpdate).subscribe(
      (res:any) => {
        if (res.success) {
            console.log(`Team member has been updated successfully: ${member.memberId}`);
						this.teamMembersGrid.instance.saveEditData();
        } else { 
					alert("Team Member could not be updated. Please review and try again later.");
					this.teamMembersGrid.instance.cancelEditData();
				}
				member.editMode = false;
				this.resetEditMode();
      }

    );

	}

	removeTeamMember(member: TeamMember) {
		this.memberIds = [];
		this.memberIds.push(member.memberId);

		this.dashboardService.deleteTeamMembers(this.memberIds).subscribe(
      (res:any) => {
        if (res.success) {
            console.log(`Team member deleted: ${member.memberId}`);
						const removeIndex: number[] =[];
						this.memberIds.forEach(memberId => {
							removeIndex.push(this.teamMembers.findIndex(member => memberId == member.memberId));
						});
						removeIndex.forEach(index => this.teamMembers.splice(index, 1));
        } else { alert("Team Member could not be deleted. Please review and try again later.");}
      }
    );
	}

	setRoleValue(newData, value: string, currentRowData) {
		(this as any).defaultSetCellValue(newData, value);
  }

	setLevelValue(newData, value: string, currentRowData) {
		newData.level = value;
  }

	emailtoggle(e) {
		this.emailNotify = e.checked;
	}
	
	cancelChanges(row) {
		row.data.editMode = false;
		this.teamMembersGrid.instance.cancelEditData();
		this.resetEditMode();
	}

	resetEditMode() {
		this.teamMembers.forEach(teamMember => { teamMember.editMode = false});
	}

	onKeyDown(e){
		if (e.event.keyCode == 13)
        e.handled = true;
  }

	gridOnCellPrepared(e) {
		if(this.rights.toLocaleLowerCase().trim()=="view" && e.column.command == 'select') {
			if( e.rowType == 'header' ) {
				this.headerHtmlCellElement = e.cellElement.length === undefined ? e.cellElement : e.cellElement[0];   
				this.headerCheckBox = CheckBox.getInstance(this.headerHtmlCellElement.querySelector(".dx-select-checkbox"));  
				if(this.headerHtmlCellElement) {
					this.headerHtmlCellElement.style.pointerEvents = 'none';
				}
			} else  {
				let htmlCellElement = e.cellElement.length === undefined ? e.cellElement : e.cellElement[0];   
				var editor = CheckBox.getInstance(htmlCellElement.querySelector(".dx-select-checkbox"));  
				if(editor) {
					editor.option("disabled", true);
				}  
				htmlCellElement.style.pointerEvents = 'none'; 
			}
		}  
	}

	setAttributes(e) {  
    setTimeout(() => {
      const inputElements = Array.from(document.getElementsByClassName('dx-texteditor-input'));
      inputElements?.forEach(ele => {
        ele.setAttribute('aria-label', 'select option');
				ele.setAttribute('name', 'selectionOption');
      })
    })
  }

}
