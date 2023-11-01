import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { CardDetails } from '../../../models';
import { PortfolioDashboardService } from '../../../services/portfolio-dashboard.service';
import { PortfolioDataService } from '../../../services/portfolio-data.service';
import { Router } from '@angular/router';
import { environment } from '../../../../../../../../mango/src/environments/environment.local';
import { Subscription } from 'rxjs';

@Component({
  selector: 'upcoming-lease-expirations-card',
  templateUrl: './upcoming-lease-expirations.component.html',
  styleUrls: ['./upcoming-lease-expirations.component.scss']
})
export class UpcomingLeaseExpirationsComponent implements OnInit, OnDestroy {
  @Input() card: CardDetails;
  private selectedFilters: string;
  @Output() cardDropEvent = new EventEmitter<any>();
  @Output() rowClickEvent = new EventEmitter<any>();
  subs: Subscription[] = []
  public isGridExpanded: boolean = false;
  @ViewChild("UpcomingExpirationsGrid") dataGrid: DxDataGridComponent;

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

  rowClick(e: any) {
    if (e.event.target.className != 'dx-datagrid-group-closed' &&
      e.event.target.className != 'dx-datagrid-group-opened' &&
      e.rowType != 'detail') {
      if (environment.isRestful) {
        this.router.navigate(
          ['crem/forms/render-form'],
          {
            queryParams: {
              fid: 312, oid: e.data.leaseAbstractID, otid: e.data.objectTypeID, ottid: e.data.objectTypeTypeID
            }
          });
      } else {
        e["objectIdField"] = "leaseAbstractID"
        this.rowClickEvent.emit(e);
      }
    }
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

