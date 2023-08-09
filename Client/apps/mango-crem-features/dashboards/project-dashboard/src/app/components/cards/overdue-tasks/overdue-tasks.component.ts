import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { CardDetails } from '../../../models';
import { CardsService } from '../../../services/cards.service';

@Component({
  selector: 'overdue-tasks-card',
  templateUrl: './overdue-tasks.component.html',
  styleUrls: ['./overdue-tasks.component.scss']
})
export class OverdueTasksComponent implements OnInit {

  @Input() card: CardDetails;
  private selectedFilters : string;
  @Output() cardDropEvent = new EventEmitter<any>();
  @Output() rowClickEvent = new EventEmitter<any>();
  @Input() objectType: string;
  @ViewChild("OverdueTasksGrid") dataGrid: DxDataGridComponent;

  constructor(
    private cardsService: CardsService
  ) { }

  ngOnInit(): void {
    this.cardsService.filterString$.subscribe(data => {
      this.selectedFilters = data;
      this.getCardData();
    });
  }

  rowClick(e: any) {
    this.rowClickEvent.emit(e);
  }
  
  exportAllGridData(e: any) {
    this.dataGrid.instance.exportToExcel(false);
  }

  getCardData() {
    this.cardsService.getCardDetails(this.card, this.selectedFilters).subscribe(
      (data: any) => {
        this.card.dispCard = true;
      }
    );
  }

  getProjectName(){
    return this.objectType + ' Name';
  }

  getProjectType(){
    return this.objectType + ' Type';
  }  
}

