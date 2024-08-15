import { Component, Input, OnInit } from '@angular/core';
import { Metric } from '@mango/data-models/lib-data-models';

@Component({
  selector: 'crem-metric',
  templateUrl: 'hero-metric.component.html',
  styleUrls: ['./hero-metric.component.scss'],
})
export class HeroMetricComponent implements OnInit{
  @Input() metric: Metric;
  popoverId: string;
  valColor: string;

  ngOnInit() {
    const { symbol } = this.metric.sidekick || {}
    const colorDictionary = {
      'positive': 'green',
      'negative': 'red',
    }
    this.valColor = colorDictionary[symbol] || 'gray';
  }
}
