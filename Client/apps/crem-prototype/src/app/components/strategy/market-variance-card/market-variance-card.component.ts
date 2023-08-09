import { Component, OnInit, ViewChild } from '@angular/core';
import { Service, Strategy } from '../../../app.service';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
	selector: 'strategy-market-variance-card',
	templateUrl: './market-variance-card.component.html',
	styleUrls: ['./market-variance-card.component.scss'],
	providers: [Service]
})
export class StrategyMarketVarianceCardComponent implements OnInit {

	strategies : Strategy[];
	isExpanded : Boolean = true;

	@ViewChild('StrategyMarketVarianceDataGrid') dataGrid: DxDataGridComponent;

	constructor( private service : Service ) {}

	ngOnInit() {
		this.strategies = this.service.getStrategies().filter( e => e.currentVsMarketRent != null);
	}

	toggleExpanded () {
		this.isExpanded = !this.isExpanded;
	}

	exportDataGrid() {
		this.dataGrid.instance.exportToExcel(false);
	}

}
