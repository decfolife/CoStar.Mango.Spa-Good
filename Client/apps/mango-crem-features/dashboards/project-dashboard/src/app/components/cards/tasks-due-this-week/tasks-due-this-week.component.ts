import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../../../mango/src/environments/environment.local';
import { CardDetails } from '../../../models';
import { CardsService } from '../../../services/cards.service';

@Component({
  selector: 'tasks-due-this-week-card',
  templateUrl: './tasks-due-this-week.component.html',
  styleUrls: ['./tasks-due-this-week.component.scss']
})
export class TasksDueThisWeekComponent implements OnInit, OnDestroy {
  @Input() card: CardDetails;
  private selectedFilters: string;
  @Output() cardDropEvent = new EventEmitter<any>();
  @Output() rowClickEvent = new EventEmitter<any>();
  @Input() objectType: string;
  @ViewChild("TasksDueThisWeekGrid") dataGrid: DxDataGridComponent;
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

  decorateText(e: any) {
    if (e.rowType == "data") {
      if ((new Date(e.data.taskCompletedDate).getFullYear()) >= 1920) {
        if (environment.isRestful) {
          e.rowElement.classList.add('tdtw-row-stike');  //this line executes on Mango
        } else {
          e.rowElement[0].classList.add('tdtw-row-stike');  //this line executes On CREM
        }
      }
    }
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

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }
}

