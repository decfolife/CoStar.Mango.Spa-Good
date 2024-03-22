import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { MemberInfo, TeamKeys, TeamMemUpdate, TeamMember } from '@mango/data-models/lib-data-models';
import { DxDataGridComponent } from 'devextreme-angular';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import CheckBox from 'devextreme/ui/check_box';
import { filter, switchMap } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';
import { MangoDialogService } from '@project-dashboard/services/mango-dialog.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss']
})
export class TeamMembersComponent implements OnInit, OnDestroy, OnChanges {

	@Input() teamMembers : TeamMember[];
	@Input() searchText: string;
	@Input() rights: string;
	@Input() userModuleAddRights: boolean;
	@Input() projectsPrivateSetting: boolean;
	@Input() memberInfo: MemberInfo; 
	@Input() teamMemberCount: number;
	@Output() selectedMembersEvent: EventEmitter<any> = new EventEmitter();
	@Output() unSelectedMembersEvent: EventEmitter<any> = new EventEmitter();
	@Output() selectedTeamandMembersEvent: EventEmitter<any> = new EventEmitter();
	@Output() getLatestTeamsDataEvent: EventEmitter<any> = new EventEmitter();
  @Output() subGridEditClickedEvent: EventEmitter<any> = new EventEmitter();

	public dataRetrieved: boolean = false;
	memberIds: number[];
	memberUpdate: TeamMemUpdate;
	emailNotify: boolean;
	shareValue: boolean;
	memberId : number;
	showShareColumn = false;
	selectedTeamandMembersData: TeamKeys = <TeamKeys>{};
	subs: Subscription[] = [];
	teamMemberInfo: string = `This team member is either no longer active or has Allow Log On set to No. 
														Please consider replacing this team member or updating their User record.`;

	@ViewChild("TeamMembersGrid") teamMembersGrid: DxDataGridComponent;

	constructor(private dashboardService: DashboardService,
							public toastr: ToastrService,
							private dialogService: MangoDialogService) {}	

	ngOnInit() {}

	ngOnChanges(changes: SimpleChanges): void {
		if(!!changes.projectsPrivateSetting && changes.projectsPrivateSetting.currentValue > 0) {
			this.showShareColumn = changes.projectsPrivateSetting.currentValue <= 2;
		}		
	}

	ngAfterViewInit() {
    if(this.searchText) this.searchDataGrid();
  }

	searchDataGrid() {
		this.teamMembersGrid.instance.searchByText(this.searchText);
	}

	editRow(memberData: any) {
		this.emailNotify = memberData.data.emailOn;
		this.shareValue = memberData.data.share;
		this.memberId = memberData.data.memberId;
		this.teamMembersGrid.instance.cancelEditData();
		this.resetEditMode();
		this.teamMembersGrid.instance.editRow(memberData.rowIndex);
		memberData.data.editMode = true;

		this.subGridEditClickedEvent.emit({ memberData, membersGrid: this.teamMembersGrid, emailNotify: this.emailNotify, shareValue: this.shareValue});
	}

	saveMemberChanges(e:any, member: TeamMember) {

		this.memberUpdate = {
			teamId: member.teamId,
			contactId: member.contactId,
			emailOn: member.emailOn,
			role: member.role,
			level: member.level.charAt(1),
			share: member.share,
		}

		this.subs.push(this.dashboardService.updateTeamMember(this.memberUpdate).subscribe(
      (res:any) => {
        if (res.success) {
						this.teamMembersGrid.instance.saveEditData();
        } else { 
					let message = `Team Member could not be updated. Please review and try again later.`;
					this.subs.push(this.dialogService.alert('Update Member', message, 'OK').subscribe());
					this.teamMembersGrid.instance.cancelEditData();
				}
				member.editMode = false;
				this.resetEditMode();
      }

    ));

	}

	removeTeamMember(member: TeamMember) {
		this.memberIds = [];
		this.memberIds.push(member.memberId);

		if (this.teamMemberCount == 1) {
			let message = 'Team Member Removal can not be done. At least one team member must be assigned to the team.';
			this.subs.push(this.dialogService.alert('Team Member Removal', message, 'OK').subscribe());
		} else {
			let confirmText = `Do you want to Remove the member "${member.name}" ?`;
			this.subs.push(this.dialogService.confirm('Remove Team Member', confirmText, 'Confirm', 'Cancel').pipe(
				filter(confirmed => !!confirmed),
				switchMap(_ => this.dashboardService.deleteTeamMembers(this.memberIds)),
				switchMap(res => {
					if (res.success) {
						this.memberIds = [];
						this.getLatestTeamsDataEvent.emit();
					}
					return res.success ? of(this.toastr.info("Selected Member(s) successfully removed.", "", { positionClass: 'toast-bottom-right', timeOut: 3000, closeButton: false, progressBar: false })) 
					: this.dialogService.alert('Removal unsuccessful!', 'Team Member could not be deleted. Please review and try again later.', 'OK');
				})
			).subscribe());
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

	emailtoggle(e, member) {
		member.emailOn = e.checked;
		this.teamMembers.map(teamMember => teamMember.emailOn = (teamMember.memberId == member.memberId? e.checked: teamMember.emailOn));
	}
	
	sharedtoggle(e, member) {
		member.share = e.checked;
		this.teamMembers.map(teamMember => teamMember.share = (teamMember.memberId == member.memberId? e.checked: teamMember.share));
	}
	
	cancelChanges(member) {
		member.editMode = false;
		this.teamMembersGrid.instance.cancelEditData();
		this.resetEditMode(true);
	}

	getShareDisplayValue(rowData){
		return rowData.share ? 'On' : 'Off'
	}

	getEmailonDisplayValue(rowData) {
		return rowData.emailOn ? 'On' : 'Off';
	}

	resetEditMode(isCancel?: boolean) {
		this.teamMembers.forEach(teamMember => { 
			teamMember.editMode = false;
			if(isCancel && teamMember.memberId == this.memberId) {
				teamMember.emailOn = this.emailNotify;
				teamMember.share = this.shareValue;
			} 
		});
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
				e.rowType == 'header' ? editor.option("disabled", true) : editor.option("visible", false);
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

	ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe);
  }

}
