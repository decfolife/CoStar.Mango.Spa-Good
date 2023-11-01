import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CardDetails } from '../../../models';
import { PortfolioDashboardService } from '../../../services/portfolio-dashboard.service';
import { PortfolioDataService } from '../../../services/portfolio-data.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
import { environment } from '../../../../../../../../mango/src/environments/environment.local';
import { Subscription } from 'rxjs';

@Component({
  selector: 'critical-dates-card',
  templateUrl: './critical-dates.component.html',
  styleUrls: ['./critical-dates.component.scss']
})
export class CriticalDatesComponent implements OnInit, OnDestroy {
  @Input() card: CardDetails;
  private selectedFilters: string;
  @Output() cardDropEvent = new EventEmitter<any>();
  @Output() rowClickEvent = new EventEmitter<any>();

  public isGridExpanded: boolean = false;
  @ViewChild("CriticalDatesDataGrid") dataGrid: DxDataGridComponent;
  subs: Subscription[] = []

  constructor(
    private router: Router,
    private portfolioDashboardService: PortfolioDashboardService,
    private portfolioDataService: PortfolioDataService,
  ) {
  }

  ngOnInit(): void {

    this.subs.push(this.portfolioDataService.filterString$.subscribe(data => {
      this.selectedFilters = data;
      this.getCardData();
    }));
  }
  //portfolioRowClick
  portfolioRowClick(e: any) {
    if (environment.isRestful) {
      this.router.navigate(
        ['crem/forms/render-form'],
        {
          state: { data: { moduleId: 2 } },
          queryParams: { fid: 312, oid: e.data.leaseAbstractID, otid: e.data.objectTypeID, ottid: e.data.objectTypeTypeID }
        });
    } else {
      e["objectIdField"] = "leaseAbstractID"
      this.rowClickEvent.emit(e);
    }
  }

  filter(e, cardId) {
    this.card.filterInitialValue = e[0];
    this.portfolioDataService.criticalDatesDropdown = e[0];
    this.getCardData();
  }

  getCardData() {
    this.subs.push(this.portfolioDataService.getCardDetails(this.card, this.selectedFilters).subscribe(
      (data: any) => {
        this.card.dispCard = true;
      }
    ));
  }
  expandAllGridData(e: any) {
    this.card.moreOptions.isExpanded = e;
  }

  exportAllGridData(e: any) {
    this.dataGrid.instance.exportToExcel(false);
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }
}

