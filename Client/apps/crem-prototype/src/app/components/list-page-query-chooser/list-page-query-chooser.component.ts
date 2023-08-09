import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, ListPageQuery, ListViewPrivilege } from '../../app.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { DxDropDownBoxComponent, DxDataGridComponent, DxAccordionComponent } from "devextreme-angular";

@Component({
	selector: 'list-page-query-chooser',
	templateUrl: './list-page-query-chooser.component.html',
	styleUrls: ['./list-page-query-chooser.component.scss'],
	providers : [Service]
})
export class ListPageQueryChooserComponent implements OnInit {

	@Input() queries : ListPageQuery[];
	@Output() changed = new EventEmitter<ListPageQuery>();
	query : ListPageQuery;
	queryName : string;	
	costarQueries : ListPageQuery[];
	myQueries : ListPageQuery[];
	sharedQueries : ListPageQuery[];
	hiddenQueries : ListPageQuery[];
	hoverQuery : string;
	categories : Object[];

	sharePopupTitle : string;
	sharePopupVisible : Boolean = false;
	shareQuery : ListPageQuery;	

	deletePopupTitle : string;
	deletePopupVisible : Boolean = false;
	deleteQuery : ListPageQuery;	

	@ViewChild("queryMenuTrigger") queryMenuTrigger : MatMenuTrigger;
	@ViewChild("DropdownBox") dropdownBox: DxDropDownBoxComponent;
	@ViewChild("accordion") accordion: DxAccordionComponent;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { }

	ngOnInit() {
		this.costarQueries = this.queries.filter(itm => ( itm.category == 'CoStar List Views' && !itm.isHidden));
		this.myQueries = this.queries.filter(itm => ( itm.category == 'My List Views' && !itm.isHidden));
		this.sharedQueries = this.queries.filter(itm => ( itm.category == 'Shared List Views' && !itm.isHidden));
		this.hiddenQueries = this.queries.filter(itm => (itm.isHidden));		
		
		this.categories = [
			{ 	'name': 'CoStar Views',
				'queries': this.costarQueries
			},
			{ 	'name': 'My Views',
				'queries': this.myQueries
			},
			{ 	'name': 'Shared Views',
				'queries': this.sharedQueries
			},
			{ 	'name': 'Hidden Views',
				'queries': this.hiddenQueries
			},
		];	
	}

	ngAfterViewInit() {
		this.setQuery(this.queries.find(itm => ( itm.isDefault == true)));
	}

	setQuery(query) {
		this.query = query;
		this.queryName = query.name;
		// this.queryMenuTrigger.closeMenu();
		this.dropdownBox.instance.close();
		this.hoverQuery = null;

		this.changed.emit(this.query);
	}

	mouseOverQuery(query) {
		this.hoverQuery = query.id;
	}

	makeDefault(query) {
		this.queries.forEach(function(itm) {
			if( itm.id == query.id ) {
				itm.isDefault = true;
			} else {
				itm.isDefault = false;
			}
		}, this);
	}

	launchSharePopup(query) {
		// console.log(this.query.id);
		this.sharePopupTitle = "Share List View - " + query.name;
		this.shareQuery = query;		
		this.sharePopupVisible = true;
	}

	sharePopupClose(query: ListPageQuery) {
		this.sharePopupVisible = false;	
	}

	launchDeletePopup(query) {
		this.deletePopupTitle = "Delete List View - " + query.name;
		this.deleteQuery = query;		
		this.deletePopupVisible = true;
	}

	deletePopupClose(query: ListPageQuery) {
		this.deletePopupVisible = false;	
	}
 
}
