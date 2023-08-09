import { Component, OnInit, Input } from '@angular/core';
import { Service, Strategy, Markers } from '../../../app.service';
import { DxMapModule, DxChartModule } from 'devextreme-angular';

export interface MapConfiguration {
  zoom: number,
  center: string,
  height: number,
  width: string,
  provider:  "google" | "googleStatic" | "bing",
  accessKey?: string,
  controls?: boolean,
  apiKey?: {
    bing: string,
    google: string,
    googleStatic: string,
  },
};

/**
 *
 * Docs: DxMap https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxMap/
 * @export
 * @class StrategyGlobalCardComponent
 * @implements {OnInit}
 */
@Component({
	selector: 'strategy-global-card',
	templateUrl: './global-card.component.html',
	styleUrls: ['./global-card.component.scss'],
	providers: [Service]
})
export class StrategyGlobalCardComponent implements OnInit {

  @Input()
  title : string = 'Global Strategies';
  @Input()
  mapConf : MapConfiguration = {
    center: 'Atlanta, GA',
    zoom: 3,
    controls: true,
    height: 420,
    width: '100%',
    provider: 'bing',
    apiKey: {
      bing: '',
      google: '',
      googleStatic: '',
    },
  };
	strategies : any;
	isExpanded : Boolean = true;
  markers: Markers[];

	constructor( private service : Service ) {}

	ngOnInit() {
    this.strategies = this.service.getStrategies().sort(function(a,b){
      return a.strategyYear - b.strategyYear;
    });
    this.markers = this.service.getStrategyLocations();
	}

	toggleExpanded () {
		this.isExpanded = !this.isExpanded;
	}

  removeThousandSeparator(arg: any) {
    return `${arg.valueText.replace(',','')}`;
  }

}
