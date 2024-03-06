import { Component, Input } from '@angular/core';
import { Metric } from '@mango/data-models/lib-data-models';

@Component({
  selector: 'crem-metric',
  templateUrl: 'hero-metric.component.html',
  styleUrls: ['./hero-metric.component.scss'],
})
export class HeroMetricComponent {
  @Input() metric: Metric;
  popoverId: string;
  fill: string;
  valIndicator: string[];
  valColor: string;
  valDirection: string;

  ngOnInit() {
    if (
      this.metric.sidekick !== null &&
      this.metric.sidekick !== undefined &&
      this.metric.sidekick.valueIndicator !== null &&
      this.metric.sidekick.valueIndicator !== undefined
    ) {
      this.valIndicator = this.metric.sidekick.valueIndicator.split('-');
      this.getValColor(this.valIndicator);
      this.getValDirection(this.valIndicator);
    }
  }

  getValColor = (valIndicator: string[]) => {
    if (valIndicator[0] === 'positive') {
      this.valColor = 'green';
      this.fill = '#017B30';

    } else if (valIndicator[0] === 'negative') {
      this.valColor = 'red';
      this.fill = '#CF0201';
    } else {
      this.valColor = 'gray';
      this.fill = '#808080';
    }
    return this.valColor;
  };
  getValDirection = (valIndicator: string[]) => {
    if (valIndicator[1] === 'up') {
      this.valDirection = 'arrows-brand-up';
    } else if (valIndicator[1] === 'down') {
      this.valDirection = 'arrows-brand-down';
    } else {
      this.valDirection = '';
    }
    return this.valDirection;
  };
}
