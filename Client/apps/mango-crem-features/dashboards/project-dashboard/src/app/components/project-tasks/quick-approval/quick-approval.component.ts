import { QUICK_APPROVAL_TASK_STATUS } from './../../../models/enums/quick-approval.enums';
import {
  adaptResponseToUI,
  buildQuickApprovalRequest,
} from './../../adapters/quick-approval-request.adapter';
import {
  QuickApprovalRequest,
  QuickApprovalUI,
} from './../../../models/interfaces/quick-approval.interface';
import { QuickApprovalService } from './../../../services/quick-approval.service';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import {
  DatePickerComponent,
  DatePickerModule,
  InputComponent,
  LoaderModule,
  SimpleGridModule,
} from '@mango/ui-shared/lib-ui-elements';
import {
  DxDataGridModule,
  DxTemplateModule,
  DxBulletModule,
  DxDateBoxModule,
  DxTextBoxModule,
  DxDataGridComponent,
  DxValidatorModule,
  DxValidatorComponent,
} from 'devextreme-angular';
import { Subject, Subscription } from 'rxjs';
import {
  concatMap,
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  tap,
} from 'rxjs/operators';
import { MangoDialogService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { updateGlobalSession } from '@mangoSpa/src/app/+state/app/app.actions';

@Component({
  selector: 'crem-quick-approval',
  standalone: true,
  imports: [
    CommonModule,
    LoaderModule,
    SimpleGridModule,
    DxDataGridModule,
    DxTemplateModule,
    DxDateBoxModule,
    DxBulletModule,
    DatePickerModule,
    InputComponent,
    DxTextBoxModule,
    DxValidatorModule,
  ],
  templateUrl: './quick-approval.component.html',
  styleUrls: ['./quick-approval.component.scss'],
})
export class CremQuickApprovalComponent implements OnInit {
  @Input() projectId: string;
  @Input() isNotesFieldRequired: boolean;
  @Input() dateFormat;
  @Output() pendingTaskApprovalCount = new EventEmitter<number>();
  @Output() hasChanges = new EventEmitter<boolean>();
  @Output() refreshTasksGrid = new EventEmitter();

  @ViewChild('DataGrid') dataGrid: DxDataGridComponent;
  @ViewChildren('notesInput') notesInput: QueryList<InputComponent>;
  @ViewChildren('startDatePicker')
  startDatePicker: QueryList<DatePickerComponent>;
  @ViewChild('emailValidator', { static: false })
  emailValidator: DxValidatorComponent;
  loader$ = new BehaviorSubject(false);
  changes$ = new BehaviorSubject<{ [k: number]: any }>({});
  changesNoteDate$ = new BehaviorSubject<{ [k: number]: any }>({});
  subs: Subscription[] = [];
  dataSource: QuickApprovalUI[] = [];
  dataLoaded = false;
  count = 0;
  selectedTasksToApprove = [];
  requireActualStartDate: boolean;
  currentSelectedKeys: any[];
  selectablekeys: any[];
  isSelectAllActive: boolean;
  private triggerRefreshGrid$ = new Subject<void>();
  constructor(
    private quickApprovalService: QuickApprovalService,
    private dialogService: MangoDialogService,
    private facade: MangoAppFacade
  ) {}

  ngOnInit(): void {
    this.loader$.next(true);
    this.triggerRefreshGrid$.subscribe(() => {
      this.quickApprovalService
        .getQuickApprovals(this.projectId)
        .subscribe((res) => {
          this.requireActualStartDate = res.data.requireActualStartDate;
          this.loader$.next(false);
          this.dataLoaded = true;
          this.dataSource = adaptResponseToUI(res.data.approvals);
        });
    });

    this.subs.push(
      this.changes$
        .pipe(
          map((changeset) => Object.keys(changeset).length > 0),
          tap((hasChanges) => this.hasChanges.emit(hasChanges))
        )
        .subscribe()
    );

    this.triggerRefreshGrid$.next();
  }

  onEditorPreparing(e): void {
    if (e.row && e.command == 'select') {
      const disable =
        e.row.data.approve === QUICK_APPROVAL_TASK_STATUS.APPROVED ||
        e.row.data.blockApproval;
      e.editorOptions.disabled = disable;
    }
  }

  onFocusedCellChanged(e: any) {
    setTimeout(() => {
      const focusedElement = document.activeElement as HTMLElement;
      if (focusedElement) {
        focusedElement.addEventListener('keydown', (event: KeyboardEvent) => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            // Prevent the default behavior to stop the cell from changing focus
            event.stopPropagation();
          }
        });
      }
    }, 0);
  }

  async onSelectionChanged(event) {
    const changeset = this.changes$.getValue();
    const changedKeys = Object.keys(this.changes$.getValue());
    const gridInstance = this.dataGrid.instance;
    gridInstance.beginCustomLoading('Processing...');
    gridInstance.beginUpdate();
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const totalVisibleRows = event.component.getVisibleRows().length;
        const totalSelectedRows = event.selectedRowKeys.length;
        const allSelected = totalSelectedRows === totalVisibleRows;
        const allDeselected = totalSelectedRows === 0;

        const selectableRows = gridInstance.getVisibleRows().filter((row) => {
          return row.data.selectable;
        });

        const unselectableRowsKeys = gridInstance
          .getVisibleRows()
          .filter((row) => !row.data.selectable)
          .map((row) => row.data.projectMilestoneApprovalID);

        if (allSelected) {
          selectableRows.forEach((row) => {
            row.data.note = 'Approved';
            row.data.date = today;
            row.data.isRowSelected = true;
          });
          let rowElement;
          unselectableRowsKeys.forEach((key) => {
            rowElement = this.dataGrid.instance.getRowElement(
              this.dataGrid.instance.getRowIndexByKey(key)
            );

            if (rowElement[0].classList.contains('dx-selection')) {
              rowElement[0].classList.remove('dx-selection');
            }
          });
        } else if (
          allDeselected &&
          event.currentDeselectedRowKeys.length !== 1
        ) {
          selectableRows.forEach((row) => {
            row.data.note = '';
            row.data.date = null;
            row.data.isRowSelected = false;
          });
        } else if (event.currentSelectedRowKeys.length > 0) {
          event.currentSelectedRowKeys.forEach((key) => {
            const rowIndex = this.dataSource.findIndex(
              ({ projectMilestoneApprovalID }) =>
                projectMilestoneApprovalID === key
            );

            if (rowIndex > -1) {
              const rowToUpdate = this.dataSource[rowIndex];
              this.dataSource[rowIndex] = {
                ...rowToUpdate,
                isRowSelected: true,
                note: 'Approved',
                date: today,
                actualStartDate:
                  changedKeys?.length > 0 &&
                  changeset?.[key]?.actualStartDate != null
                    ? changeset[key]?.actualStartDate
                    : rowToUpdate.actualStartDate, // Modify another date field if needed
              };
              if (changedKeys.length > 0 && changeset[key]?.actualStartDate)
                gridInstance.option('dataSource', this.dataSource);
            }
          });
        } else if (event.currentDeselectedRowKeys.length > 0) {
          event.currentDeselectedRowKeys.forEach((key) => {
            const rowIndex = this.dataSource.findIndex(
              ({ projectMilestoneApprovalID }) =>
                projectMilestoneApprovalID === key
            );

            if (rowIndex > -1) {
              const rowToUpdate = this.dataSource[rowIndex];
              this.dataSource[rowIndex] = {
                ...rowToUpdate,
                isRowSelected: false,
                note: '',
                date: null,
                actualStartDate:
                  changedKeys?.length > 0 &&
                  changeset?.[key]?.actualStartDate != null
                    ? changeset[key]?.actualStartDate
                    : rowToUpdate.actualStartDate, // Modify another date field if needed
              };
              if (changedKeys.length > 0 && changeset[key]?.actualStartDate)
                gridInstance.option('dataSource', this.dataSource);
            }
            gridInstance.deselectRows(unselectableRowsKeys);
          });
        }

        this.selectedTasksToApprove = this.dataSource.filter((d) =>
          event.selectedRowsData.some(
            (k: QuickApprovalUI) =>
              k.projectMilestoneApprovalID === d.projectMilestoneApprovalID &&
              d.approve !== QUICK_APPROVAL_TASK_STATUS.APPROVED &&
              !d.blockApproval
          )
        );
        this.pendingTaskApprovalCount.emit(
          this.selectedTasksToApprove.length || 0
        );
        resolve();
      }, 0);
    }).then((x) => {
      gridInstance.endCustomLoading();
      gridInstance.endUpdate();
    });
  }
  onValueChanged(row, event) {
    const { dataField } = row.column;
    const today = new Date();

    switch (dataField) {
      case 'date': {
        const { value, previousValue } = event;
        const delta = this.changesNoteDate$.getValue();
        const { key } = row;
        const selectedDate = new Date(value);

        // Set the time of both dates to the same to only compare the day
        today.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
          this.dialogService.alert(
            'Invalid Date',
            'Date must be less than or equal to current date.',
            'Close'
          );
          event.component.option('value', previousValue);
        }

        if (value && dataField) {
          this.changesNoteDate$.next({
            ...delta,
            [key]: {
              ...delta[key],
              [dataField]: value,
            },
          });
        }

        break;
      }
      case 'actualStartDate': {
        const { value, previousValue } = event;
        const { key } = row;
        const selectedDate = new Date(value);
        const delta = this.changes$.getValue();

        // Set the time of both dates to the same to only compare the day
        today.setHours(0, 0, 0, 0);
        selectedDate.setHours(0, 0, 0, 0);

        if (selectedDate > today) {
          this.dialogService.alert(
            'Invalid Actual Start Date',
            'Date must be less than or equal to current date.',
            'Close'
          );
          event.component.option('value', previousValue);
        }

        if (value && dataField) {
          this.changes$.next({
            ...delta,
            [key]: {
              ...delta[key],
              [dataField]: value,
            },
          });
        }
        break;
      }
      case 'note': {
        const key = row.key;
        const value = event;
        const delta = this.changesNoteDate$.getValue();
        if (value && dataField) {
          this.changesNoteDate$.next({
            ...delta,
            [key]: {
              ...delta[key],
              [dataField]: value,
            },
          });
        }
        break;
      }
      default: {
      }
    }
  }

  approveTasks(): void {
    const changeset = this.changes$.getValue();
    const changedKeys = Object.keys(this.changes$.getValue());
    const changesetNotes = this.changesNoteDate$.getValue();
    const changeNoteKeys = Object.keys(this.changesNoteDate$.getValue());

    if (changeNoteKeys.length > 0) {
      this.selectedTasksToApprove = this.selectedTasksToApprove.map((task) => {
        const updatedTask = changesetNotes[task.projectMilestoneApprovalID];
        return updatedTask
          ? {
              ...task,
              note: updatedTask.note ? updatedTask.note : task.note,
              date: updatedTask.date ? updatedTask.date : task.date,
            }
          : task;
      });
    }

    if (changedKeys.length > 0) {
      this.selectedTasksToApprove = this.selectedTasksToApprove.map((task) => {
        const updatedTask = changeset[task.projectMilestoneApprovalID];
        return updatedTask
          ? {
              ...task,
              actualStartDate: updatedTask.actualStartDate
                ? updatedTask.actualStartDate
                : task.actualStartDate,
            }
          : task;
      });
    }

    if (this.selectedTasksToApprove.length > 0) {
      const validationResult = this.selectedTasksToApprove.some((element) => {
        if (this.requireActualStartDate) {
          const selectedStartDate = this.startDatePicker
            .toArray()
            .find((startArray) => {
              return startArray.dataKey === element.projectMilestoneApprovalID;
            });
          if (selectedStartDate) {
            if (!selectedStartDate.validate()) {
              selectedStartDate.focusDatePicker();
              return true;
            }
          }
        }
        const selectedNote = this.notesInput.toArray().find((note) => {
          return note.dataKey === element.projectMilestoneApprovalID;
        });

        if (selectedNote) {
          if (!selectedNote.validate()) {
            selectedNote.focusInputBox();
            return true;
          }
        }
      });

      if (validationResult) {
        return;
      }
    }

    const payload: QuickApprovalRequest = buildQuickApprovalRequest(
      this.selectedTasksToApprove
    );

    this.subs.push(
      this.facade.currentProjectId$
        .pipe(
          first(),
          map((projectId) => ({ ...payload, projectId })),
          concatMap((data) =>
            this.quickApprovalService.saveQuickApprovals(data)
          )
        )
        .subscribe(
          (res) => {
            if (res) {
              this.loader$.next(false);
              this.pendingTaskApprovalCount.emit(0);
              this.changes$.next({});
              this.changesNoteDate$.next({});
              this.triggerRefreshGrid$.next();
              this.refreshTasksGrid.next();
              this.dataGrid.instance.deselectAll();
            }
          },
          () => {
            this.loader$.next(false);
            // TODO: Show some kind of indicator that the request has failed.
          }
        )
    );
  }

  saveChanges() {
    const changedKeys = Object.keys(this.changes$.getValue());
    if (changedKeys.length > 0) {
      this.loader$.next(true);
      const changeset = this.changes$.getValue();

      const payload: QuickApprovalRequest = {
        isQuickApproval: false,
        approveRejectTasksRequestList: changedKeys
          .map((key) => [key, changeset[key]])
          .map(([taskApprovalID, task]) => ({
            taskApprovalID,
            isProxyApproval: false,
            actualStartDate: task.actualStartDate
              ? task.actualStartDate.toISOString()
              : null,
          })),
      };

      this.subs.push(
        this.facade.currentProjectId$
          .pipe(
            first(),
            map((projectId) => ({ ...payload, projectId })),
            concatMap((data) =>
              this.quickApprovalService.saveQuickApprovals(data)
            )
          )
          .subscribe(
            (res) => {
              if (res) {
                this.changes$.next({});
                this.loader$.next(false);
                this.refreshTasksGrid.next();
              }
            },
            () => {
              this.loader$.next(false);
              // TODO: Show some kind of indicator that the request has failed.
            }
          )
      );
    }
  }
}
