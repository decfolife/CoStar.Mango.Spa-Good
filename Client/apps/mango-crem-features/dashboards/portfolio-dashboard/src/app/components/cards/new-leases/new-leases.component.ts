import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxDataGridComponent } from 'devextreme-angular';
import { CardDetails } from '../../../models';
import { PortfolioDataService } from '../../../services/portfolio-data.service';
import { environment } from '../../../../../../../../mango/src/environments/environment.local';
import { Subscription } from 'rxjs';
import { ExportDevexDatagridService } from '@mango/core-shared';

@Component({
  selector: 'new-leases-card',
  templateUrl: './new-leases.component.html',
  styleUrls: ['./new-leases.component.scss']
})

export class NewLeasesComponent implements OnInit, OnDestroy {
  @Input() card: CardDetails;
  private selectedFilters: string;
  @Output() cardDropEvent = new EventEmitter<any>();
  @Output() rowClickEvent = new EventEmitter<any>();

  public isGridExpanded: boolean = false;
  @ViewChild("NewLeasesGrid") dataGrid: DxDataGridComponent;
  subs: Subscription[] = []
  constructor(
    private router: Router,
    private exportToExcelService: ExportDevexDatagridService,
    private portfolioDataService: PortfolioDataService
  ) { }

  ngOnInit(): void {
    this.subs.push(this.portfolioDataService.filterString$.subscribe(data => {
      this.selectedFilters = data;
      this.getCardData();
    }));
  }

  rowClick(e: any) {
    if (environment.isRestful) {
      this.router.navigate(
        ['crem/forms/render-form'],
        {
          queryParams: { fid: 312, oid: e.data.systemLeaseID, otid: e.data.objectTypeID, ottid: e.data.objectTypeTypeID }
        });
    } else {
      e["objectIdField"] = "systemLeaseID"
      this.rowClickEvent.emit(e);
    }
  }

  filter(e, cardId) {
    this.card.filterInitialValue = e[0];
    this.portfolioDataService.newLeasesDropdown = e[0];
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

  exportAllGridData() {
    this.exportToExcelService.exportToExcel(this.dataGrid.instance, "New_Leases");
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }
}

