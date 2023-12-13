import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MemberInfo, TeamKeys, TeamMemUpdate, TeamMember } from '@mango/data-models/lib-data-models';
import { DxDataGridComponent } from 'devextreme-angular';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import CheckBox from 'devextreme/ui/check_box';
import { filter, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MangoDialogService } from '@project-dashboard/services/mango-dialog.service';

@Component({
  selector: 'team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent implements OnInit {

	@Input() teamMembers : TeamMember[];
	@Input() searchText: string;
	@Input() rights: string;
	@Input() userModuleAddRights: boolean;
	@Input() memberInfo: MemberInfo; 
	@Input() teamMemberCount: number;
	@Output() selectedMembersEvent: EventEmitter<any> = new EventEmitter();
	@Output() unSelectedMembersEvent: EventEmitter<any> = new EventEmitter();
	@Output() selectedTeamandMembersEvent: EventEmitter<any> = new EventEmitter();
	@Output() getLatestTeamsDataEvent: EventEmitter<any> = new EventEmitter();

	public dataRetrieved: boolean = false;
	memberIds: number[];
	memberUpdate: TeamMemUpdate;
	emailNotify: boolean;
	selectedTeamandMembersData: TeamKeys = <TeamKeys>{};

	@ViewChild("TeamMembersGrid") teamMembersGrid: DxDataGridComponent;
	@Output() subGridEditClicked: EventEmitter<any> = new EventEmitter();

	constructor(private dashboardService: DashboardService,
							private dialogService: MangoDialogService) {}	

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
						this.teamMembersGrid.instance.saveEditData();
        } else { 
					let message = `Team Member could not be updated. Please review and try again later.`;
					this.dialogService.alert('Update Member', message, 'ok').subscribe();
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

		if (this.teamMemberCount == 1) {
			let message = 'Team Member Removal can not be done. At least one team member must be assigned to the team.';
			this.dialogService.alert('Team Member Removal', message, 'ok').subscribe();
		} else {
			let confirmText = `Do you want to Remove the member "${member.name}" ?`;
			this.dialogService.confirm('Remove Team Member', confirmText, 'confirm', 'cancel').pipe(
				filter(confirmed => !!confirmed),
				switchMap(_ => this.dashboardService.deleteTeamMembers(this.memberIds)),
				switchMap(res => {
					if (res.success) {
						this.memberIds = [];
						this.getLatestTeamsDataEvent.emit();
					}
					return res.success ? of() : this.dialogService.alert('Removal unsuccessful!', 'Team Member could not be deleted. Please review and try again later.', 'ok');
				})
			).subscribe();
		}	

	}

	onSelectionChanged(e:any) {
		if(e.currentSelectedRowKeys.length) {
			this.selectedMembersEvent.emit(e.currentSelectedRowKeys);
			if(this.selectedTeamandMembersData.teamId) {
				this.selectedTeamandMembersData.memberIds = this.selectedTeamandMembersData.memberIds.concat(e.currentSelectedRowKeys);
			} else {
				this.selectedTeamandMembersData.teamId = e.selectedRowsData[0].teamId;
				this.selectedTeamandMembersData.memberIds = e.currentSelectedRowKeys;
			}
		}

		if(e.currentDeselectedRowKeys.length) {
		  this.unSelectedMembersEvent.emit(e.currentDeselectedRowKeys);
				this.selectedTeamandMembersData.memberIds = 
					this.selectedTeamandMembersData.memberIds.filter(item => !(e.currentDeselectedRowKeys).includes(item));
		}	
		this.selectedTeamandMembersEvent.emit(this.selectedTeamandMembersData);
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
		if(e.column.command == 'select' && (!this.userModuleAddRights || this.rights.toLocaleLowerCase().trim()=="view")) {
			let htmlCellElement = e.cellElement.length === undefined ? e.cellElement : e.cellElement[0];   
			var editor = CheckBox.getInstance(htmlCellElement.querySelector(".dx-select-checkbox"));  
			if(editor) {
				editor.option("disabled", true);
			}  
			htmlCellElement.style.pointerEvents = 'none'; 
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
