import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Building } from '../../app.service';
import { DxChartComponent } from "devextreme-angular";

export class BuildingTypeCount {
	buildingType : String;
	count : number;

	constructor(buildingType, count) {
		this.buildingType = buildingType;
		this.count = count;
	}
}

@Component({
	selector: 'building-type-card',
	templateUrl: './building-type-card.component.html',
	styleUrls: ['./building-type-card.component.scss']
})
export class BuildingTypeCardComponent implements OnInit {

	buildings : Building[];
	// buildingTypeSummary : Array<any> = [];
	buildingTypeSummary : BuildingTypeCount[];
	@ViewChild("BuildingTypeChart") chart: DxChartComponent;
	legendVisible : boolean = true;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.buildings = this.service.getBuildings();

		// Transform the raw building data into a building summary by building type
		// let unique = [...new Set(this.buildings.map(item => item.buildingType))];
		// unique.forEach(function(bt) {
		// 	let count = this.buildings.filter(b => b.buildingType == bt ).length;
		// 	this.buildingTypeSummary.push( { 'buildingType' : ( bt == '' ? 'N/A' : bt ), 'count' : count });
		// }, this);

		this.buildingTypeSummary = [
			new BuildingTypeCount("Office", 321),
			new BuildingTypeCount("Warehouse", 102),
			new BuildingTypeCount("Retail", 53),
			new BuildingTypeCount("Industrial", 12),
			new BuildingTypeCount("Mixed Use", 30),
			new BuildingTypeCount("Land", 53),
		];
	}

	exportChart() {
		this.chart.instance.exportTo('chart', 'png');
	}

	onPointHoverChanged(e) {
		console.log("hover point changing");
		// let series = this.chart.instance.getSeriesByPos(0);
		// series.getAllPoints().forEach(itm => itm.getLabel().hide());
		let point = e.target;
		let label = point.getLabel()		
		label.show();
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
