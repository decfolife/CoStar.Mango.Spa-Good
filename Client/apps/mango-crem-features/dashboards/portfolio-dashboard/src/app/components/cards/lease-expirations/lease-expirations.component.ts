import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DxChartComponent } from 'devextreme-angular';
import { CardDetails } from '../../../models';
import { PortfolioDataService } from '../../../services/portfolio-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lease-expirations-card',
  templateUrl: './lease-expirations.component.html',
  styleUrls: ['./lease-expirations.component.scss'],
})
export class LeaseExpirationsComponent implements OnInit, OnDestroy {
  @Input() card: CardDetails;
  private selectedFilters: string;
  @Output() cardDropEvent = new EventEmitter<any>();
  @Output() rowClickEvent = new EventEmitter<any>();

  @ViewChild('LeaseExpirationsChart') chartComponent: DxChartComponent;
  subs: Subscription[] = [];

  constructor(private portfolioDataService: PortfolioDataService) {}

  ngOnInit(): void {
    this.subs.push(
      this.portfolioDataService.filterString$.subscribe((data) => {
        this.selectedFilters = data;
        this.getCardData();
      })
    );
  }

  getCardData() {
    this.subs.push(
      this.portfolioDataService
        .getCardDetails(this.card, this.selectedFilters)
        .subscribe((data: any) => {
          this.card.dispCard = true;
          this.renderChart();
        })
    );
  }

  renderChart() {
    if (this.chartComponent !== undefined) {
      this.chartComponent.instance.render();
    }
  }

  customizeTooltip(arg: any) {
    const items = arg.valueText.split('\n');
    const color = arg.point.getColor();
    items.forEach((item, index) => {
      if (item.indexOf(arg.seriesName) === 0) {
        const element = document.createElement('span');

        element.textContent = item;
        element.style.color = color;
        element.className = 'active';

        items[index] = element.outerHTML;
      }
    });
    return { text: items.join('\n') };
  }

  exportChartToPng(e: any) {
    this.chartComponent.instance.exportTo('LeaseExpirationsChart', 'png');
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
