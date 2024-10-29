import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CardDetails } from '../../../models';
import { PortfolioDataService } from '../../../services/portfolio-data.service';
import { DxDataGridComponent } from 'devextreme-angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExportDevexDatagridService } from '@mango/core-shared';

@Component({
  selector: 'critical-dates-card',
  templateUrl: './critical-dates.component.html',
  styleUrls: ['./critical-dates.component.scss'],
})
export class CriticalDatesComponent implements OnInit, OnDestroy {
  @Input() card: CardDetails;
  private selectedFilters: string;
  @Output() cardDropEvent = new EventEmitter<any>();
  @Output() rowClickEvent = new EventEmitter<any>();

  public isGridExpanded: boolean = false;
  @ViewChild('CriticalDatesDataGrid') dataGrid: DxDataGridComponent;
  subs: Subscription[] = [];

  constructor(
    private router: Router,
    private exportToExcelService: ExportDevexDatagridService,
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

  portfolioRowClick(e: any) {
    this.router.navigate(['/v06/Forms/RenderForm.aspx'], {
      state: { data: { moduleId: 2 } },
      queryParams: {
        oid: e.data.leaseAbstractID,
        otid: e.data.objectTypeID,
        ottid: e.data.objectTypeTypeID,
      },
    });
  }

  filter(e, cardId) {
    this.card.filterInitialValue = e[0];
    this.portfolioDataService.criticalDatesDropdown = e[0];
    this.getCardData();
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
  expandAllGridData(e: any) {
    this.card.moreOptions.isExpanded = e;
  }

  exportAllGridData() {
    this.exportToExcelService.exportToExcel(
      this.dataGrid.instance,
      'Critical_Dates'
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
