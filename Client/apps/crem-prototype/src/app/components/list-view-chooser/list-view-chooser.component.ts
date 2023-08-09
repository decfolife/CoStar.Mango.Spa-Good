import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, ListPageQuery } from '../../app.service';
import { DxDataGridComponent } from "devextreme-angular";

@Component({
	selector: 'list-view-chooser',
	templateUrl: './list-view-chooser.component.html',
	styleUrls: ['./list-view-chooser.component.scss']
})
export class ListViewChooserComponent implements OnInit {

	@Input() listViews : ListPageQuery[];
	@Output() changed = new EventEmitter<ListPageQuery>();	
	@ViewChild("ListViewDataGrid") dataGrid: DxDataGridComponent;

	listView : ListPageQuery;
	sharePopupTitle : string;
	sharePopupVisible : Boolean = false;
	shareListView : ListPageQuery;	
	deletePopupTitle : string;
	deletePopupVisible : Boolean = false;
	deleteListView : ListPageQuery;
	isOpened : Boolean = false;
	selectedItems : number[] = [];


	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { }

	ngOnInit() {
		this.listView = this.listViews.find(itm => itm.isDefault);
		this.selectedItems.push(this.listView.id);		
	}

	selectionChanged() {
		this.listView = this.listViews.find(itm => itm.id == this.selectedItems[0]);
		this.changed.emit(this.listView);
		this.isOpened = false;
	}

	dropdownChange(e) {
		if (!e.value) {
			this.changed.emit(null);
		}
	}

	makeDefault(listView) {
		this.listViews.forEach(function(itm) {
			if( itm.id == listView.id ) {
				itm.isDefault = true;
			} else {
				itm.isDefault = false;
			}
		}, this);
	}

	launchSharePopup(listView) {
		// console.log(this.listView.id);
		this.sharePopupTitle = "Share List View - " + listView.name;
		this.shareListView = listView;		
		this.sharePopupVisible = true;
	}

	sharePopupClose(query: ListPageQuery) {
		this.sharePopupVisible = false;	
	}

	launchDeletePopup(listView) {
		this.deletePopupTitle = "Delete List View - " + listView.name;
		this.deleteListView = listView;		
		this.deletePopupVisible = true;
	}

	deletePopupClose(query: ListPageQuery) {
		this.deletePopupVisible = false;	
	}

	searchListViews(e) {
		this.dataGrid.instance.searchByText(e);
	}	

}



