import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Building } from '../../app.service';
import { DxChartComponent } from "devextreme-angular";

@Component({
  selector: 'building-state-card',
  templateUrl: './building-state-card.component.html',
  styleUrls: ['./building-state-card.component.scss']
})
export class BuildingStateCardComponent implements OnInit {

	buildings : Building[];
	stateSummary : Array<any> = [];
	@ViewChild("BuildingStateChart") chart: DxChartComponent;
	legendVisible : boolean = true;

	constructor( private service : Service, private router: Router, private route: ActivatedRoute ) { 	
	}

	ngOnInit() {
		this.buildings = this.service.getBuildings();

		// Transform the raw building data into a building summary by building type
		let unique = [...new Set(this.buildings.map(item => item.state))];
		unique.forEach(function(state) {
			let count = this.buildings.filter(b => b.state == state ).length;
			this.stateSummary.push( { 'state' : ( state == '' ? 'N/A' : state ), 'count' : count });
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
