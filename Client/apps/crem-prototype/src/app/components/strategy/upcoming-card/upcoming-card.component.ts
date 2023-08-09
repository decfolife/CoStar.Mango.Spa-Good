import { Component, OnInit, ViewChild } from '@angular/core';
import { Service, Strategy } from '../../../app.service';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
	selector: 'strategy-upcoming-card',
	templateUrl: './upcoming-card.component.html',
	styleUrls: ['./upcoming-card.component.scss'],
	providers: [Service]
})
export class StrategyUpcomingCardComponent implements OnInit {

	strategies : Strategy[];
	isExpanded : Boolean = true;

	@ViewChild('StrategyUpcomingDataGrid') dataGrid: DxDataGridComponent;

	constructor( private service : Service ) {}

	ngOnInit() {
		this.strategies = this.service.getStrategies();
	}

	toggleExpanded () {
		this.isExpanded = !this.isExpanded;
	}

	exportDataGrid() {
		this.dataGrid.instance.exportToExcel(false);
	}

}
