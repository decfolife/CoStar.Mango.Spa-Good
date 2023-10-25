import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { TeamMember } from '@mango/data-models/lib-data-models';
import { DxDataGridComponent } from 'devextreme-angular';
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
	@Input() teamId: number;

	public dataRetrieved: boolean = false;
	saveTeamMember: TeamMember;
	isEdit: boolean = false;
	headerCheckBox: any;
	headerHtmlCellElement: any;
	editDataRow: any

	@ViewChild("TeamMembersGrid") teamMembersGrid: DxDataGridComponent;
	@Output() subGridEditClicked: EventEmitter<any> = new EventEmitter();

	constructor() {}	

	ngOnInit() {}

	ngAfterViewInit() {
    if(this.searchText) this.searchDataGrid();
  }

	searchDataGrid() {
		this.teamMembersGrid.instance.searchByText(this.searchText);
	}

	editRow(row) {
		this.editDataRow = row;
		//this.subGridEditClicked.emit(this.teamId);
		this.teamMembers.forEach(teamMember => { teamMember.editMode = false});
		this.teamMembersGrid.instance.cancelEditData();
		this.teamMembersGrid.instance.editRow(row.rowIndex);
		this.saveTeamMember = row.data
		this.isEdit = true;
		row.data.editMode = true;
	}

	gridOnCellPrepared(e) {
		if(this.rights.toLocaleLowerCase().trim()=="view") {
			if( e.rowType == 'header' && e.column.command == 'select') {
				this.headerHtmlCellElement = e.cellElement.length === undefined ? e.cellElement : e.cellElement[0];   
				this.headerCheckBox = CheckBox.getInstance(this.headerHtmlCellElement.querySelector(".dx-select-checkbox")); 
				if(!(!this.headerCheckBox))
				this.headerCheckBox.option("disabled", true);  
				if(this.headerHtmlCellElement) {
					this.headerHtmlCellElement.style.pointerEvents = 'none';
				}
			}
			let htmlCellElement = e.cellElement.length === undefined ? e.cellElement : e.cellElement[0];   
			var editor = CheckBox.getInstance(htmlCellElement.querySelector(".dx-select-checkbox"));  
			if(editor) {
				editor.option("disabled", true);
			}  
			htmlCellElement.style.pointerEvents = 'none'; 
		}  
	}

	saveChanges(row) {

	}
	
	cancelChanges(row) {
		row.data.editMode = false;
		this.teamMembersGrid.instance.cancelEditData();
	}

	doSomethingForNow(data) {}

}
