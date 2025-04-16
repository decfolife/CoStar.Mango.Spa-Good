import { Component, Input, OnInit } from '@angular/core';
import { Metric, RenderFormHeaderData } from '@mango/data-models/lib-data-models';
import { LibUiElementsModule} from '@mango/ui-shared/lib-ui-elements';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCog, faClose } from '@fortawesome/free-solid-svg-icons';
import { BrowserModule } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  selector: 'mango-render-form-header',
  standalone: true,
  imports: [BrowserModule ,
    LibUiElementsModule,
    FontAwesomeModule,
    MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  schemaMetrics: Metric[] = [
    {
      id: '1',
      title: 'Metric 1 Title',
      subtitle: 'Metric 1 Subtitle',
      heroMetric: '15',
      tooltipData: 'Tooltip Data 1',
      sidekick: {
        metricValue: '0',
        direction: 'neutral'
      },
      isActive: true,
      elementId: 1,
      elementTypeId: 1
    },
    {
      id: '2',
      title: 'Metric 2 Title',
      subtitle: 'Metric 2 Subtitle',
      heroMetric: '8',
      tooltipData: 'Tooltip Data 2',
      sidekick: {
        metricValue: '912',
        direction: 'down',
        symbol: 'negative'
      },
      isActive: true,
      elementId: 2,
      elementTypeId: 2
    },
    {
      id: '3',
      title: 'Metric 3 Title',
      subtitle: 'Metric 3 Subtitle',
      heroMetric: '10,256',
      tooltipData: 'Tooltip Data 3',
      sidekick: {
        metricValue: '122',
        direction: 'up',
        symbol: 'positive'
      },
      isActive: true,
      elementId: 3,
      elementTypeId: 3
    },
    {
      id: '4',
      title: 'Metric 4 Title',
      subtitle: 'Metric 4 Subtitle',
      heroMetric: '634',
      tooltipData: 'Tooltip Data 4',
      sidekick: {
        metricValue: '75',
        direction: 'up',
        symbol: 'positive'
      },
      isActive: true,
      elementId: 4,
      elementTypeId: 4
    },
    {
      id: '5',
      title: 'Metric 5 Title',
      subtitle: 'Metric 5 Subtitle',
      heroMetric: '5,897',
      tooltipData: 'Tooltip Data 5',
      sidekick: {
        metricValue: '6',
        direction: 'down',
        symbol: 'negative'
      },
      isActive: true,
      elementId: 5,
      elementTypeId: 5
    },
    {
      id: '6',
      title: 'Metric 6 Title',
      subtitle: 'Metric 6 Subtitle',
      heroMetric: '45,896',
      tooltipData: 'Tooltip Data 6',
      sidekick: {
        metricValue: '4',
        direction: 'down',
        symbol: 'negative'
      },
      isActive: true,
      elementId: 6,
      elementTypeId: 6
    },
  ];
  constructor(
    private location: Location
  ) {}

  @Input() data!: RenderFormHeaderData;
  faCog = faCog;
  faClose = faClose;
  showLoader: boolean;

  close() {
    this.showLoader = true;
    
    this.goBack();
  }
  goBack() {
    this.location.back();
  }
}

