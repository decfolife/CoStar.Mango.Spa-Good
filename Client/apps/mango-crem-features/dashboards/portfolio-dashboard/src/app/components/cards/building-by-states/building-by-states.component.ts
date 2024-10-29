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
import { PortfolioDashboardService } from '../../../services/portfolio-dashboard.service';
import { PortfolioDataService } from '../../../services/portfolio-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'building-by-state-card',
  templateUrl: './building-by-states.component.html',
  styleUrls: ['./building-by-states.component.scss'],
})
export class BuildingByStatesComponent implements OnInit, OnDestroy {
  @Input() card: CardDetails;
  private selectedFilters: string;
  @Output() cardDropEvent = new EventEmitter<any>();
  @Output() rowClickEvent = new EventEmitter<any>();

  public isGridExpanded: boolean = false;
  public checked: boolean = true;
  public legendVisible: boolean = true;
  @ViewChild('BuildingByStatesChart') chart: DxChartComponent;
  subs: Subscription[] = [];

  constructor(
    private portfolioDashboardService: PortfolioDashboardService,
    private portfolioDataService: PortfolioDataService
  ) {}

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
        })
    );
  }

  exportAllChartData(e: any) {
    this.chart.instance.exportTo('BuildingByStatesChart', 'png');
  }

  customizeLabel(arg) {
    return `${arg.argumentText}:<br>${arg.valueText} (${arg.percentText})`;
  }
  onPointHoverChanged(e) {
    let point = e.target;
    let label = point.getLabel();
    if (point.isHovered()) {
      label.show();
    } else {
      label.hide();
    }
  }
  toggleLegend(e: any) {
    this.legendVisible = !this.legendVisible;
  }
  hideLabels(e: any) {
    let series = this.chart.instance.getSeriesByPos(0);
    series.getAllPoints().forEach((itm) => itm.getLabel().hide());
  }

  toggleLegendChart(e: any) {
    this.checked = !this.checked;
  }
  onLegendClick(e) {
    let point = e.points[0];
    let label = point.getLabel();
    if (label.isVisible()) {
      label.hide();
    } else {
      label.show();
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
