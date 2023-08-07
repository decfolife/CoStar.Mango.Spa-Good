import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { CardDetails } from '../../../models';
import { CardsService } from '../../../services/cards.service';

@Component({
  selector: 'new-projects-card',
  templateUrl: './new-projects.component.html',
  styleUrls: ['./new-projects.component.scss']
})
export class NewProjectsComponent implements OnInit {
  @Input() card: CardDetails;
  private selectedFilters : string;
  @Output() rowClickEvent = new EventEmitter<any>();
  @Input() objectType: string;
  @ViewChild("NewProjectsGrid") dataGrid: DxDataGridComponent;
  
  public keyDate: string;
  
  constructor(
    private cardsService: CardsService,
  ) {}

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

  filter(e, cardId) {
    this.card.filterInitialValue = e[0];
    this.cardsService.newTasksDropdown = e[0];
    this.getCardData();
  }
  
  getCardData() {
    this.cardsService.getCardDetails(this.card, this.selectedFilters).subscribe(
      (data: any) => {
        this.card.dispCard = true;
      }
    );
  }
}
