import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Building } from '../../app.service';
import { DxChartComponent } from "devextreme-angular";

@Component({
	selector: 'store-format-card',
	templateUrl: './store-format-card.component.html',
	styleUrls: ['./store-format-card.component.scss']
})
export class StoreFormatCardComponent implements OnInit {

	buildings : Building[];
	buildingTypeSummary : Array<any> = [];
	@ViewChild("StoreByFormatChart") chart: DxChartComponent;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.buildings = this.service.getBuildings();

		// Transform the raw building data into a building summary by building type
		let unique = [...new Set(this.buildings.map(item => item.buildingType))];
		unique.forEach(function(bt) {
			let count = this.buildings.filter(b => b.buildingType == bt ).length;
			this.buildingTypeSummary.push( { 'buildingType' : ( bt == '' ? 'N/A' : bt ), 'count' : count });
		}, this);
	}

	exportChart() {
		this.chart.instance.exportTo('chart', 'png');
	}

}
