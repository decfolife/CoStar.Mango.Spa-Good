import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MemberInfo, TeamMember } from '@mango/data-models/lib-data-models';
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
	headerCheckBox: any;
	headerHtmlCellElement: any;
	editDataRow: any
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
		this.editDataRow = memberData;
		this.emailNotify = memberData.data.emailOn;
		this.teamMembers.forEach(teamMember => { teamMember.editMode = false});
		this.teamMembersGrid.instance.cancelEditData();
		this.teamMembersGrid.instance.editRow(memberData.rowIndex);
		memberData.data.editMode = true;
	}

	saveMemberChanges(memberData: any) {
		memberData.row.data.emailOn = this.emailNotify;
		//**** once API is ready call API and If update successful -
		memberData.data.role = memberData.row.data.role;
		memberData.data.emailOn = memberData.row.data.emailOn;
		memberData.data.level = memberData.row.data.level;
		memberData.data.editMode = false;
		this.teamMembersGrid.instance.cancelEditData();
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

	emailtoggle(e) {
		this.emailNotify = e.checked;
	}
	
	cancelChanges(row) {
		row.data.editMode = false;
		this.teamMembersGrid.instance.cancelEditData();
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
        } else { console.log(`Team member deletion not successful`);}
      }
    );
	}

	doSomethingForNow(data) {}

}
