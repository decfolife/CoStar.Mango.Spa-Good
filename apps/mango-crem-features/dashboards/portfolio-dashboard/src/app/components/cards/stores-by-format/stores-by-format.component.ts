import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxChartComponent } from 'devextreme-angular';
import { CardDetails } from '../../../models';
import { PortfolioDashboardService } from '../../../services/portfolio-dashboard.service';
import { PortfolioDataService } from '../../../services/portfolio-data.service';


@Component({
  selector: 'stores-by-format-card',
  templateUrl: './stores-by-format.component.html',
  styleUrls: ['./stores-by-format.component.scss']
})
export class StoresByFormatComponent implements OnInit {
  @Input() card: CardDetails;
  private selectedFilters : string;
  @Output() cardDropEvent = new EventEmitter<any>();
  @Output() rowClickEvent = new EventEmitter<any>();

  public isGridExpanded: boolean = false;
  @ViewChild("StoresByFormatChart") chart: DxChartComponent;

  constructor(
		private portfolioDashboardService: PortfolioDashboardService,
        private portfolioDataService: PortfolioDataService,
  ) {
     }

  ngOnInit(): void {

    this.portfolioDataService.filterString$.subscribe(data => {
      this.selectedFilters = data;
      this.getCardData();
    });
  }


  getCardData() {
    this.portfolioDataService.getCardDetails(this.card, this.selectedFilters).subscribe(
      (data: any) => {
        this.card.dispCard = true;
      }
    );
  }

  exportAllChartData(e: any) {
    this.chart.instance.exportTo('StoresByFormatChart', 'png');
  }

}