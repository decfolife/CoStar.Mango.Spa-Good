import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { CardDetails } from '../../../models';
import { CardsService } from '../../../services/cards.service';
import { Subscription } from 'rxjs';
import { ExportDevexDatagridService } from '@mango/core-shared';

@Component({
  selector: 'new-projects-card',
  templateUrl: './new-projects.component.html',
  styleUrls: ['./new-projects.component.scss'],
})
export class NewProjectsComponent implements OnInit, OnDestroy {
  @Input() card: CardDetails;
  private selectedFilters: string;
  @Output() rowClickEvent = new EventEmitter<any>();
  @Input() objectType: string;
  @ViewChild('NewProjectsGrid') dataGrid: DxDataGridComponent;

  public keyDate: string;

  subs: Subscription[] = [];

  constructor(
    private cardsService: CardsService,
    private exportToExcelService: ExportDevexDatagridService
  ) {}

  ngOnInit(): void {
    this.subs.push(
      this.cardsService.filterString$.subscribe((data) => {
        this.selectedFilters = data;
        this.getCardData();
      })
    );
  }

  rowClick(e: any) {
    this.rowClickEvent.emit(e);
  }

  exportAllGridData() {
    this.exportToExcelService.exportToExcel(
      this.dataGrid.instance,
      'New_Projects'
    );
  }

  filter(e, cardId) {
    this.card.filterInitialValue = e[0];
    this.cardsService.newTasksDropdown = e[0];
    this.getCardData();
  }

  getCardData() {
    this.subs.push(
      this.cardsService
        .getCardDetails(this.card, this.selectedFilters)
        .subscribe((data: any) => {
          this.card.dispCard = true;
        })
    );
  }

  adaAttrNoDataGrid(e: any) {
    let noDataEl = e.element.querySelector('.dx-empty');
    let spanChild = null;

    // Check if noDataEl exists
    if (noDataEl) {
      spanChild = noDataEl.querySelector('.dx-datagrid-nodata');
    }

    // If either element is missing, exit the function
    if (!noDataEl || !spanChild) {
      return;
    }

    noDataEl.setAttribute('role', 'row');
    spanChild.setAttribute('role', 'gridcell');
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
