import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Dropdown } from '@mango/data-models/lib-data-models';
import { DxChartComponent } from 'devextreme-angular';
import { CardDetails } from '../../../models';
import { PortfolioDashboardService } from '../../../services/portfolio-dashboard.service';
import { PortfolioDataService } from '../../../services/portfolio-data.service';

@Component({
  selector: 'annual-expiration-rent-value-card',
  templateUrl: './annual-expiration-rent-value.component.html',
  styleUrls: ['./annual-expiration-rent-value.component.scss']
})
export class AnnualExpirationRentValueComponent implements OnInit {
  @Input() card: CardDetails;
  private selectedFilters : string;
  @Output() cardDropEvent = new EventEmitter<any>();
  @Output() rowClickEvent = new EventEmitter<any>();

  @ViewChild(DxChartComponent, { static: false }) chartComponent: DxChartComponent;

  constructor(private portfolioDashboardService: PortfolioDashboardService, private portfolioDataService: PortfolioDataService) { }

  ngOnInit(): void {

    this.portfolioDataService.filterString$.subscribe(data => {
      this.selectedFilters = data;
      this.getCardData();
    });
  }
  
  filter(e, cardId) {
    this.card.filterInitialValue = e[0];
    this.portfolioDataService.annualExpirationRentValueDropdown = e[0];
    this.getCardData();
  }

  getCardData() {
    this.portfolioDataService.getCardDetails(this.card, this.selectedFilters).subscribe(
      (data: any) => {
        this.card.dispCard = true;
      }
    );
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
    this.chartComponent.instance.exportTo('AnnualExpirationRentValueChart', 'png');
  }
}