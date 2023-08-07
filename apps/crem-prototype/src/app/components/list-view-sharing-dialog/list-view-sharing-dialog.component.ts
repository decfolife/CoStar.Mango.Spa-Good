import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, ListPageQuery, ListViewPrivilege } from '../../app.service';
import { DxDataGridComponent } from "devextreme-angular";

@Component({
	selector: 'list-view-sharing-dialog',
	templateUrl: './list-view-sharing-dialog.component.html',
	styleUrls: ['./list-view-sharing-dialog.component.scss'],
	providers : [Service]
})
export class ListViewSharingDialogComponent implements OnInit {

	@ViewChild("privilegeGrid") privilegeDataGrid: DxDataGridComponent;
	@Input() query : ListPageQuery;
	@Output() closed = new EventEmitter<ListPageQuery>();

	listViewPrivileges : ListViewPrivilege[];
	entityTypeOptions : string[] = ["Group", "User"];
	privilegeTypeOptions : string[] = ["Delete", "Edit", "View"];
	entityOptions : string[] = [];

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { }

	ngOnInit() {
		this.listViewPrivileges = this.service.getListViewPrivileges(this.query.id);
	}

	onToolbarPreparing(e){  
        e.toolbarOptions.visible = false;  
    } 

	addPrivilege() {
		this.privilegeDataGrid.instance.addRow();
	}	

	entityTypeChanged(e) {
		if( e.value == "Group" ) {
			this.entityOptions = ["Group A", "Company B", "Company C", "Group D"];	
		} else if( e.value == "User" ) {
			this.entityOptions = ["Jason Trkovsky", "Dan Galenkamp", "Elyse Jupiter", "Anne Martinez", "Patrick Griffith", "Dave Perrins", "Kent Carpenter", "Taylor Hampton"];
		}		
	}	

	close() {
		this.closed.emit(this.query);
	}

	save( close ) {
		this.privilegeDataGrid.instance.saveEditData();
		if( close ) {
			this.closed.emit(this.query);
		}
	}

	cancel( close ) {
		this.privilegeDataGrid.instance.cancelEditData();
		if( close ) {
			this.closed.emit(this.query);
		}
	}

}
