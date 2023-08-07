import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CardDetails } from '../../../models';
import { CardsService } from '../../../services/cards.service';
import { TaskApprovalComponent } from '../../modal/task-approval/task-approval.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';

@Component({
  selector: 'tasks-due-soon-card',
  templateUrl: './tasks-due-soon.component.html',
  styleUrls: ['./tasks-due-soon.component.scss']
})
export class TasksDueSoonComponent implements OnInit {
  @Input() card: CardDetails;
  @Output() cardDropEvent = new EventEmitter<any>();
  @Output() rowClickEvent = new EventEmitter<any>();
  @Input() objectType: string;
  @ViewChild("TasksDueSoonGrid") dataGrid: DxDataGridComponent;

 private selectedFilters : string = null;

  private dropdown: string;
  filStr$: Observable<string>;
  filterStr: string;

  subscription: Subscription;

  constructor(
    private cardsService: CardsService,
    private dialog: MatDialog
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

  approve(selectedTask, actionName) {
    let dialogRef = this.dialog.open(TaskApprovalComponent, {
      height: '240px',
      width: '600px',
      panelClass: 'taskApprovalModal',
      data: {selectedTask, actionName}
    });
    dialogRef.afterClosed().subscribe(result => {
        if (result === "Approve") {
          this.getCardData();
        }
      });
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