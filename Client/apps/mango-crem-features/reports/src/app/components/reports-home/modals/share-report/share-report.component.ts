import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReportUsersGroups } from '@reports/models';
import { ReportsService } from '@reports/services/reports.service';
import { SecurityType } from '@mango/data-models/lib-data-models';
import {
  DxDataGridComponent,
  DxDataGridTypes,
} from 'devextreme-angular/ui/data-grid';
import { forkJoin, Subscription } from 'rxjs';

type UserGroupShareOptions = {
  id: number;
  name: string;
};

@Component({
  selector: 'mango-share-report-modal',
  templateUrl: './share-report.component.html',
  styleUrls: ['./share-report.component.scss'],
})
export class ShareReportComponent implements OnInit, OnDestroy {
  reportUsersGroups: ReportUsersGroups[];
  securityTypeOptions = [
    { name: 'Edit', value: SecurityType.EDIT },
    { name: 'View', value: SecurityType.VIEW },
    { name: 'Delete', value: SecurityType.DELETE },
  ];

  shareType = [{ type: 'User' }, { type: 'Group' }];
  dataRetrieved = false;
  addingNewRow = false;
  userGroupNames: UserGroupShareOptions[] = [];
  private subs: Subscription = new Subscription();

  @ViewChild(DxDataGridComponent, { static: false })
  dataGrid: DxDataGridComponent;

  constructor(
    private reportsSerivce: ReportsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.setShareNameOptions = this.setShareNameOptions.bind(this);

    this.getFilteredIds = this.getFilteredIds.bind(this);
  }

  ngOnInit() {
    const allUsers = forkJoin({
      users: this.reportsSerivce.getReportUsersShareOptions('user'),
      groups: this.reportsSerivce.getReportUsersShareOptions('group'),
      reportUsersGroups: this.reportsSerivce.getReportUsersGroups(
        this.data.reportId
      ),
    });

    this.subs.add(
      allUsers.subscribe((result) => {
        result.groups.data.forEach((group) => {
          group.type = 'Group';
        });
        result.users.data.forEach((user) => {
          user.type = 'User';
        });

        this.userGroupNames.push(...result.groups.data, ...result.users.data);
        this.reportUsersGroups = result.reportUsersGroups.data;
        this.dataRetrieved = true;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getFilteredIds(options: { data: any }) {
    const filtereddata = {
      store: this.userGroupNames,
      filter: options.data ? ['type', '=', options.data.type] : null,
    };

    return filtereddata;
  }

  onEditorPreparing(e) {
    if (
      e.dataField === 'id' &&
      e.row &&
      e.row.rowType === 'data' &&
      e.parentType === 'dataRow'
    ) {
      e.editorOptions.disabled = e.row.data.type === undefined;
    }
  }

  rightsDisplay(rowData: ReportUsersGroups) {
    if (!rowData.rights) {
      return;
    }

    return (
      SecurityType[rowData.rights][0].toLocaleUpperCase() +
      SecurityType[rowData.rights].slice(1).toLocaleLowerCase()
    );
  }

  setShareNameOptions(
    newData: ReportUsersGroups,
    value: string,
    currentRowData: ReportUsersGroups
  ) {
    newData.type = value;

    this.dataGrid.editing.changes[0].data.id = undefined;
  }

  getShareNameOptions(type: string) {
    return this.reportsSerivce.getReportUsersShareOptions(type).toPromise();
  }

  onRowUpdating(
    event: DxDataGridTypes.RowUpdatingEvent<ReportUsersGroups, number>
  ) {
    this.dataRetrieved = false;
    const newReportUsersGroup: ReportUsersGroups = {
      name: event.oldData.name,
      id: event.oldData.id,
      rights: event.newData.rights,
      type: event.oldData.type,
    };
    this.subs.add(
      this.reportsSerivce
        .updateReportUsersGroups(this.data.reportId, newReportUsersGroup)
        .subscribe(
          (res: any) => {
            if (!res.success) {
              console.error('updateReportUsersGroups failed');
            }
          },
          (error: any) => {
            console.error('Error in updateReportUsersGroups', error);
          },
          () => {
            this.dataRetrieved = true;
          }
        )
    );
  }

  onInitNewRow(
    event: DxDataGridTypes.InitNewRowEvent<ReportUsersGroups, number>
  ) {
    this.addingNewRow = true;
  }

  onRowRemoving(
    event: DxDataGridTypes.RowRemovingEvent<ReportUsersGroups, number>
  ) {
    this.dataRetrieved = false;
    this.subs.add(
      this.reportsSerivce
        .deleteReportUsersShare(this.data.reportId, {
          type: event.data.type,
          userGroupId: event.data.id,
        })
        .subscribe(
          (res: any) => {
            if (!res.success) {
              console.error('updateReportUsersGroups failed');
            }
          },
          (error: any) => {
            console.error('Error in updateReportUsersGroups', error);
          },
          () => {
            this.dataRetrieved = true;
          }
        )
    );
  }

  onRowInserted(
    event: DxDataGridTypes.RowInsertedEvent<ReportUsersGroups, number>
  ) {
    this.addingNewRow = false;
  }

  onRowInserting(
    event: DxDataGridTypes.RowInsertingEvent<ReportUsersGroups, number>
  ) {
    this.dataRetrieved = false;
    this.subs.add(
      this.reportsSerivce
        .updateReportUsersGroups(this.data.reportId, event.data)
        .subscribe(
          (res: any) => {
            if (!res.success) {
              console.error('updateReportUsersGroups failed');
            }
          },
          (error: any) => {
            console.error('Error in updateReportUsersGroups', error);
          },
          () => {
            this.dataRetrieved = true;
          }
        )
    );
  }

  addRow() {
    this.dataGrid.instance.addRow();
    this.dataGrid.instance.deselectAll();
  }

  onGridContentReady(event: DxDataGridTypes.ContentReadyEvent) {
    const gridElement = event?.element;

    if (gridElement) {
      const tdElement = gridElement.querySelector(
        '.dx-command-edit.dx-cell-focus-disabled'
      );

      if (tdElement) {
        tdElement.textContent = 'Actions';
        tdElement.id = 'actionsColumnHeader';
      }
    }
  }
}
