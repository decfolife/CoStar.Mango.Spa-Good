import { Component, Input, SimpleChanges } from '@angular/core';
import { ApprovalDetail } from '@mango/data-models/lib-data-models';

@Component({
  selector: 'mango-task-assignees',
  templateUrl: './task-assignees.component.html',
  styleUrls: ['./task-assignees.component.scss'],
})
export class TaskAssigneesComponent {
  @Input() taskAssignees: ApprovalDetail[];
  @Input() userDateFormat: string;

  totalCount: number;
  approvedCount: number;
  rejectedCount: number;
  pendingCount: number;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.taskAssignees && !!changes.taskAssignees.currentValue) {
      this.totalCount = this.taskAssignees.length;
      this.approvedCount = this.taskAssignees.filter(
        (ta) => !!ta.approvalDate
      ).length;
      this.rejectedCount = this.taskAssignees.filter(
        (ta) => !!ta.rejectDate
      ).length;
      this.pendingCount =
        this.totalCount - (this.approvedCount + this.rejectedCount);
    }
  }

  adaAttrNoDataGrid(e: any) {
    const dxGridwithTables = e.component
      .$element()
      .find('.dx-datagrid-headers.dx-bordered-top-view');
    if (dxGridwithTables && dxGridwithTables.length > 0) {
      for (let i = 0; i < dxGridwithTables.length; i++) {
        const element = dxGridwithTables[i];
        if (element) {
          element.setAttribute('role', 'grid');
        }
      }
    }
  }
}
