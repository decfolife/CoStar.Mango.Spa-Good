import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { CardDetails } from '../../../models';
import { CardsService } from '../../../services/cards.service';

@Component({
  selector: 'overdue-projects-card',
  templateUrl: './overdue-projects.component.html',
  styleUrls: ['./overdue-projects.component.scss']
})
export class OverdueProjectsComponent implements OnInit {

  @Input() card: CardDetails;
  private selectedFilters : string;
  @Output() cardDropEvent = new EventEmitter<any>();
  @Output() rowClickEvent = new EventEmitter<any>();
  @Input() objectType: string;
  @ViewChild("OverdueProjectsGrid") dataGrid: DxDataGridComponent;

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
}

