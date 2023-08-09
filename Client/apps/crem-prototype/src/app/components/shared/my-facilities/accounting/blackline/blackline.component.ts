import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, AccountingMonth, Blackline } from '../../../../../app.service';
import { MatDrawer } from '@angular/material/sidenav';
import { DxDataGridComponent } from "devextreme-angular";
import notify from 'devextreme/ui/notify';

@Component({
	selector: 'app-blackline',
	templateUrl: './blackline.component.html',
	styleUrls: ['./blackline.component.scss'],
	providers : [Service]
})
export class BlacklineComponent implements OnInit {

	periods : AccountingMonth[];
	data : Blackline[] = [];
	periodFilter : any;

	@ViewChild("filterDrawer") filterDrawer: MatDrawer;
	@ViewChild("blacklineGird") dataGrid : DxDataGridComponent;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute) { 
	}

	ngOnInit() {
		this.periods = this.service.getAllAccountingMonths();

		this.periodFilter = {
			data : this.periods,
			valueExpr : "period",
			displayExpr : "periodName",
			placeholder : "Period",	
			controlType : "multi-select",
			selected : [],		
		};
	}

	applyFilters() {
		this.data = this.service.getBlacklineData(null, null);
		this.filterDrawer.close();
	}

	periodChange(e) {
		this.periodFilter.selected = e;
	}

	exportDataGrid() {
		this.dataGrid.instance.exportToExcel(false);
	}

	sendBlackline() {
		notify({
			message : "Sent to Blackline successfully.", 
			type : "success", 
			displayTime : 2000,
			position : { at: 'bottom right', my: 'bottom right', offset: '-16 -16'},
			maxWidth : "400px",
			closeOnClick : true,
		});
	}


}
