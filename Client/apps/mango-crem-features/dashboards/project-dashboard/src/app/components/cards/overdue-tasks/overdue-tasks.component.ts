import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { Subscription } from 'rxjs';
import { CardDetails } from '../../../models';
import { CardsService } from '../../../services/cards.service';

@Component({
  selector: 'overdue-tasks-card',
  templateUrl: './overdue-tasks.component.html',
  styleUrls: ['./overdue-tasks.component.scss']
})
export class OverdueTasksComponent implements OnInit, OnDestroy {

  @Input() card: CardDetails;
  private selectedFilters: string;
  @Output() cardDropEvent = new EventEmitter<any>();
  @Output() rowClickEvent = new EventEmitter<any>();
  @Input() objectType: string;
  @ViewChild("OverdueTasksGrid") dataGrid: DxDataGridComponent;
  subs: Subscription[] = []

  constructor(
    private cardsService: CardsService
  ) { }

  ngOnInit(): void {
    this.subs.push(this.cardsService.filterString$.subscribe(data => {
      this.selectedFilters = data;
      this.getCardData();
    }));
  }

  rowClick(e: any) {
    this.rowClickEvent.emit(e);
  }

  exportAllGridData(e: any) {
    this.dataGrid.instance.exportToExcel(false);
  }

  getCardData() {
    this.subs.push(this.cardsService.getCardDetails(this.card, this.selectedFilters).subscribe(
      (data: any) => {
        this.card.dispCard = true;
      }
    ));
  }

  getProjectName() {
    return this.objectType + ' Name';
  }

  getProjectType() {
    return this.objectType + ' Type';
  }
  
  adaAttrNoDataGrid(e:any) {
    let noDataEl = e.element.querySelector(".dx-empty");
    let spanChild = null;

    // Check if noDataEl exists
    if (noDataEl) {
        spanChild = noDataEl.querySelector(".dx-datagrid-nodata");
    }

    // If either element is missing, exit the function
    if (!noDataEl || !spanChild) {
        return;
    }

    noDataEl.setAttribute("role", "row");
    spanChild.setAttribute("role", "gridcell");
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }
}

