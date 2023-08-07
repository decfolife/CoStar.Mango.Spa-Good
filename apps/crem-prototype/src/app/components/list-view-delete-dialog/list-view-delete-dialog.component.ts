import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, ListPageQuery, ListViewPrivilege } from '../../app.service';
import { DxDataGridComponent } from "devextreme-angular";

@Component({
	selector: 'list-view-delete-dialog',
	templateUrl: './list-view-delete-dialog.component.html',
	styleUrls: ['./list-view-delete-dialog.component.scss'],
	providers : [Service]
})
export class ListViewDeleteDialogComponent implements OnInit {

	@ViewChild("privilegeGrid") privilegeDataGrid: DxDataGridComponent;
	@Input() query : ListPageQuery;
	@Output() closed = new EventEmitter<ListPageQuery>();

	listViewPrivileges : ListViewPrivilege[];
	
	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { }

	ngOnInit() {
		this.listViewPrivileges = this.service.getListViewPrivileges(this.query.id);
	}

	deleteListView( ) {
		this.closed.emit(this.query);
	}

	cancel() {
		this.closed.emit(this.query);
	}

}
