import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { CardDetails } from '../../../models';
import { CardsService } from '../../../services/cards.service';
import { environment } from '../../../../../../../../mango/src/environments/environment.local';
import { TaskApprovalComponent } from '../../modal/task-approval/task-approval.component';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'new-tasks-card',
  templateUrl: './new-tasks.component.html',
  styleUrls: ['./new-tasks.component.scss']
})
export class NewTasksComponent implements OnInit, OnDestroy {
  @Input() card: CardDetails;
  private selectedFilters : string;
  @Output() rowClickEvent = new EventEmitter<any>();
  @Input() objectType: string;
  @ViewChild("NewTasksGrid") dataGrid: DxDataGridComponent;

  public keyDate: string;

  subs: Subscription[] = []
  constructor(
    private cardsService: CardsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.subs.push(this.cardsService.filterString$.subscribe(data => {
      this.selectedFilters = data;
      this.getCardData();
    }));
  }

  customizeTaskAddedText(cellInfo){
    let valueToReturn = (cellInfo.valueText === '01/01/1901' || cellInfo.valueText === '01.01.1901' ? "N/A" : cellInfo.valueText);
    return valueToReturn;
  }

  rowClick(e: any) {
    this.rowClickEvent.emit(e);
  }
  
  exportAllGridData(e: any) {
    this.dataGrid.instance.exportToExcel(false);
  }

  // decorating rows for completed tasks
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
  filter(e, cardId) {
    this.card.filterInitialValue = e[0];
    this.cardsService.newTasksDropdown = e[0];
    this.getCardData();
  }

  getCardData() {
    this.subs.push(this.cardsService.getCardDetails(this.card, this.selectedFilters).subscribe(
      (data: any) => {
        this.card.dispCard = true;
      }
    ));
  }

  getProjectName(){
    return this.objectType + ' Name';
  }

  getProjectType(){
    return this.objectType + ' Type';
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
