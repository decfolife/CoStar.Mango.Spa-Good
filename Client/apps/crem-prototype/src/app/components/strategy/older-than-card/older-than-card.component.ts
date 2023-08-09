import { Component, OnInit, ViewChild } from '@angular/core';
import { Service, Strategy } from '../../../app.service';
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
	selector: 'strategy-older-than-card',
	templateUrl: './older-than-card.component.html',
	styleUrls: ['./older-than-card.component.scss'],
	providers: [Service]
})
export class StrategyOlderThanCardComponent implements OnInit {

	strategies : Strategy[];
	isExpanded : Boolean = true;

	@ViewChild('StrategyOlderThanDataGrid') dataGrid: DxDataGridComponent;

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
