import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Building } from '../../app.service';
import { DxChartComponent } from "devextreme-angular";

@Component({
	selector: 'ownership-type-card',
	templateUrl: './ownership-type-card.component.html',
	styleUrls: ['./ownership-type-card.component.scss']
})
export class OwnershipTypeCardComponent implements OnInit {

	buildings : Building[];
	ownershipTypeSummary : Array<any> = [];
	@ViewChild("OwnershipTypeChart") chart: DxChartComponent;
	legendVisible : boolean = true;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.buildings = this.service.getBuildings();

		// Transform the raw building data into a building summary by building type
		let unique = [...new Set(this.buildings.map(item => item.ownershipType))];
		unique.forEach(function(ot) {
			let count = this.buildings.filter(b => b.ownershipType == ot ).length;
			this.ownershipTypeSummary.push( { 'ownershipType' : ( ot == '' ? 'N/A' : ot ), 'count' : count });
		}, this);
	}

	exportChart() {
		this.chart.instance.exportTo('chart', 'png');
	}

	onPointHoverChanged(e) {
		// let series = this.chart.instance.getSeriesByPos(0);
		// series.getAllPoints().forEach(itm => itm.getLabel().hide());
		let point = e.target;
		let label = point.getLabel()
		if(point.isHovered()) {
			label.show();
		} else {
			label.hide();
		}
	}

	onLegendClick(e) {
		// let series = this.chart.instance.getSeriesByPos(0);
		// series.getAllPoints().forEach(itm => itm.getLabel().hide());
		let point = e.points[0];
		let label = point.getLabel();
		if( label.isVisible() ) {
			label.hide();
		} else {
			label.show();
		}		
	}

	customizeLabel(arg) {
		return `${arg.argumentText}:<br>${arg.valueText} (${arg.percentText})`;
	}

	hideLabels() {
		let series = this.chart.instance.getSeriesByPos(0);
		series.getAllPoints().forEach(itm => itm.getLabel().hide());
	}

	toggleLegend() {
		this.legendVisible = !this.legendVisible;
	}

}
