import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Report, Tag, DropdownField } from '../../../../../app.service';
import { DxDataGridComponent } from "devextreme-angular";

@Component({
	selector: 'reports-list',
	templateUrl: './reports-list.component.html',
	styleUrls: ['./reports-list.component.scss'],
	providers: [Service]
})
export class ReportsListComponent implements OnInit {

	@ViewChild("DataGrid") dataGrid: DxDataGridComponent;

	reports : Report[];
	tags : Tag[];
	favoriteReports : Report[];
	filteredReports : Report[];
	isExpanded : boolean = true;
	columnAutoWidth : boolean = false;
	showFavorites : boolean = false;
	tagFilters : string[] = [];

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 		
	}

	ngOnInit() {
		this.reports = this.service.getReports();
		this.tags = this.service.getTags();
		this.favoriteReports = this.reports.filter(itm => itm.isFavorite);
		this.filteredReports = this.reports;
	}

	toggleExpanded () {
		this.isExpanded = !this.isExpanded;
	}

	showColumnChooser() {
		this.dataGrid.instance.showColumnChooser();
	}

	searchDataGrid(data) {
		this.dataGrid.instance.searchByText(data);
	}

	launchManageTagsModal() {
		this.router.navigate(["managetags"], {relativeTo: this.route } );
	}

	launchUploadOfflineTemplateModal() {
		this.router.navigate(["uploadoffline"], {relativeTo: this.route } );
	}

	toggleShowFavorites() {
		this.favoriteReports = this.reports.filter(itm => itm.isFavorite);
		this.showFavorites = !this.showFavorites;
		this.applyTagsAndFavorites();
	}

	toggleItemFavorite(item) {
		item.data.isFavorite = !item.data.isFavorite;
	}

	applyTagFilters(e) {
		// console.log(e);
		this.tagFilters = e.map(itm => itm.tagName);
		this.applyTagsAndFavorites();			
	}

	applyTagsAndFavorites() {
		if( this.tagFilters.length > 0) {
			if( this.showFavorites ) {
				this.filteredReports = this.favoriteReports.filter(rpt => rpt.tags.map(t => t.tagName).some(itm => this.tagFilters.includes(itm)));
			} else {
				this.filteredReports = this.reports.filter(rpt => rpt.tags.map(t => t.tagName).some(itm => this.tagFilters.includes(itm)));
			}
		} else {
			if( this.showFavorites ) {
				this.filteredReports = this.favoriteReports;
			} else {
				this.filteredReports = this.reports;
			}
		}	
	}

	launchAssignTagsModal(rpt) {
		// console.log(rpt);
		this.router.navigate(["assigntags", rpt.data.id], {relativeTo: this.route } );
	}

	launchShareReportModal(rpt) {
		this.router.navigate(["share", rpt.data.id], {relativeTo: this.route } );
	}

	launchDeleteReportModal(rpt) {
		this.router.navigate(["delete", rpt.data.id], {relativeTo: this.route } );
	}
 
}
