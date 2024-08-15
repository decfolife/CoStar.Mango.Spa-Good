import {
  APPROVE_BUTTON_TEXT,
  PROJECT_REQUIRE_TASK_NOTES,
  QUICK_APPROVAL_FOOTER_TEXT,
} from './../../models/constants/quick-approval-constants';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import {
  faCircleCheck,
  faCircleXmark,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import {
  GetViewDropdownDataRequest,
  HideListViewRequest,
  ListView,
  SetDefaultListViewRequest,
  ViewDropDownData,
} from '@list-pages/components/listpage/shared/models';
import {
  CLIENT_PREFERENCE,
  ContactRecord,
  MemberInfo,
  PostProjectEmailPreferences,
  PostProjectTaskSettings,
  ProjectEmailPreferences,
  ProjectTaskDetails,
  ProjectTaskDropdownInfo,
  ProjectTaskSettings,
} from '@mango/data-models/lib-data-models';
import {
  DatePickerComponent,
  InputComponent,
} from '@mango/ui-shared/lib-ui-elements';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { DxTreeListComponent } from 'devextreme-angular';
import { Column } from 'devextreme/ui/data_grid';
import { MangoDialogService } from 'libs/core-shared/src/lib/services/mango-dialog.service';
import { CremPopupComponent } from 'libs/ui-shared/lib-ui-elements/src/lib/popup';
import { CremShareViewPopupComponent } from 'libs/ui-shared/lib-ui-shared/src/lib/crem-list-views/crem-share-view-popup/crem-share-view-popup.component';
import { Subscription, combineLatest, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { AddEditTaskComponent } from './add-edit-tasks/add-edit-task.component';
import { CopyTransactionComponent } from './copy-transaction/copy-transaction.component';
import { TaskInfoComponent } from './task-info/task-info.component';
import { TaskModifyCompleteDateComponent } from './task-modify-complete-date/task-modify-complete-date.component';
import dxCheckBox from 'devextreme/ui/check_box';
import { AppendTemplateComponent } from './append-template/append-template.component';
import { QuickApprovalService } from '@project-dashboard/services/quick-approval.service';
import { SaveTasksTemplateService } from '@project-dashboard/services/save-tasks-template.service';

@Component({
  selector: 'project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.scss'],
})
export class ProjectTasksComponent implements OnInit, OnDestroy {
  @ViewChild('ProjectTasksGrid') projectTasksGrid: DxTreeListComponent;
  @ViewChild('StartDatePicker') taskSettingStartDate: DatePickerComponent;
  @ViewChild('CopyTransactionPopup') copyTransactionPopup: CremPopupComponent;

  subs: Subscription[] = [];
  projectId: number;
  projectCurrentTasks: ProjectTaskDropdownInfo[];
  memberInfo: MemberInfo = <MemberInfo>{};
  projectTaskList: ProjectTaskDetails[] = [];
  selectedTaskId: number;
  dataRetrieved: boolean = true;
  noDataText: string = '';
  dateFormat: string = '';
  searchText: string = '';
  rowId: number = 0;
  isUserDatesEU: boolean = true;
  taskStatusColor: string = '';
  inputViewName: string = '';
  currentListView: ListView = null;
  gridData: any = [];
  objectTypeId: number = 196;
  faUserPlus = faUserPlus;
  faCircleCheck = faCircleCheck;
  faCircleXmark = faCircleXmark;
  availableApprovers: any = [];
  approversValues: any = [];
  availablePredecessors: any = [];
  predValues: any = [];
  isExpandAll: boolean = false;
  userAccessLevel: number;
  allSelectedRowKeys: number[] = [];
  disableOrEnableRowKeys: number[] = [];
  selectionEvent: boolean = false;
  deSelectionEvent: boolean = false;
  allDisabledRowKeys: number[] = [];
  deleteTaskIds: number[] = [];
  deleteBtnTitle: string =
    'Use the Delete Selected Tasks option via the Actions menu to delete tasks that have been selected';
  showQuickApprovalPopup = false;
  approveButtonText = '';
  quickApprovalFooterText = '';
  showSaveTasksAsTemplatePopup = false;
  disableTasksTemplateSaveButton = true;

  private currentUserInfo$: Observable<ContactRecord>;

  //***for views
  currentListViewName: string;
  listViews: ViewDropDownData;
  activeViewId: number;
  isActiveListView: boolean = false;
  isNewListViewCreated: boolean = false;
  activeViewState: any;
  userListViewType: number = 2;
  newListViewId: string;
  availableListViewCount: number;
  sharingListView: ListView;
  isSuperUser: boolean = false;
  sessionView: ListView;
  expandedRowKeys: number[];
  // ****/

  //** Task Settings related data **/
  projectTaskSettings: ProjectTaskSettings = <ProjectTaskSettings>{};
  projectEmailPreferences: ProjectEmailPreferences = <
    ProjectEmailPreferences
  >{};
  postProjectTaskSettings: PostProjectTaskSettings = <
    PostProjectTaskSettings
  >{};
  postProjectEmailPreferences: PostProjectEmailPreferences = <
    PostProjectEmailPreferences
  >{};
  settingsVisible: boolean = false;
  taskSettingsTitle: string = 'Task Settings';
  selectAllEmailPref: boolean = false;
  taskSettingsChangesMade: boolean = false;

  //**** **/
  //** Copy Transaction related data **/
  copyTransactionVisible: boolean = false;
  ctSaveButtonText: string = null;

  //**** **/

  @ViewChild('moreMenuTrigger') moreMenuTrigger: MatMenuTrigger;
  @ViewChild('InputViewTextBox') inputViewTextBox: InputComponent;
  @ViewChild('cremShareListViewPopup')
  cremShareListViewPopup: CremShareViewPopupComponent;
  @ViewChild('taskDetailsSettingsPopup')
  taskDetailsSettingsPopup: CremPopupComponent;
  @ViewChild('copyTransactionComponent')
  copyTransactionComponent: CopyTransactionComponent;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private dashboardService: DashboardService,
    private dialogService: MangoDialogService,
    private facade: MangoAppFacade,
    private quickApprovalService: QuickApprovalService,
    private saveTasksTemplateService: SaveTasksTemplateService
  ) {
    this.saveState = this.saveState.bind(this);
  }

  ngOnInit(): void {
    this.getMemberInfo();
    this.subs.push(
      this.route.queryParams
        .pipe(
          filter((params) => !!params && !!params.oid),
          tap((params) => {
            this.projectId = parseInt(params.oid);
            this.getProjectContactLevel(this.projectId);
          })
        )
        .subscribe()
    );

    this.sessionView = sessionStorage.getItem('projectTasksSessionView')
      ? JSON.parse(sessionStorage.getItem('projectTasksSessionView'))
      : null;
    this.getListViews();

    this.currentUserInfo$ = this.facade.contactRecord$;
    this.subs.push(
      this.currentUserInfo$.subscribe((contact) => {
        this.isUserDatesEU = contact.preferences.contactDatesEU;
        this.isSuperUser =
          contact.userRoleName.toLowerCase().trim() == 'superuser'
            ? true
            : false;
        this.dateFormat = this.isUserDatesEU ? 'dd.MM.yyyy' : 'MM/dd/yyyy';
      })
    );
  }

  onTasksSelectionChanged(e) {
    let currentSelectedOrDeselectedKeys = [];
    if (e.currentSelectedRowKeys.length) {
      this.selectionEvent = true;
      currentSelectedOrDeselectedKeys = e.currentSelectedRowKeys;
    } else if (e.currentDeselectedRowKeys.length) {
      this.selectionEvent = false;
      currentSelectedOrDeselectedKeys = e.currentDeselectedRowKeys;
    }

    let allChildKeys = [];
    currentSelectedOrDeselectedKeys.forEach((key) => {
      allChildKeys = allChildKeys.concat(this.getChildKeys(key));
    });
    this.disableOrEnableRowKeys = allChildKeys;
    if (this.selectionEvent) {
      this.allDisabledRowKeys = this.allDisabledRowKeys.concat(allChildKeys);
      this.allSelectedRowKeys = allChildKeys.length
        ? this.allSelectedRowKeys.concat(allChildKeys)
        : this.allSelectedRowKeys;
    } else {
      this.removeDeselectedKeys(allChildKeys);
    }

    this.allSelectedRowKeys = [...new Set(this.allSelectedRowKeys)];
    this.allDisabledRowKeys = [...new Set(this.allDisabledRowKeys)];
    this.disableCheckboxes(this.disableOrEnableRowKeys);
    if (!this.selectionEvent && allChildKeys.length) {
      let rowIndexes = [];
      allChildKeys.forEach((childKey) => {
        rowIndexes.push(
          this.projectTasksGrid.instance.getRowIndexByKey(childKey)
        );
      });
      this.projectTasksGrid.instance.repaintRows(rowIndexes);
    }
  }

  removeDeselectedKeys(removeKeys) {
    let removeIndex: number;
    let disableIndex: number;
    removeKeys.forEach((key) => {
      removeIndex = this.allSelectedRowKeys.findIndex(
        (selectedKey) => key == selectedKey
      );
      if (removeIndex >= 0) this.allSelectedRowKeys.splice(removeIndex, 1);

      disableIndex = this.allDisabledRowKeys.findIndex(
        (disabledKey) => key == disabledKey
      );
      if (disableIndex >= 0) this.allDisabledRowKeys.splice(disableIndex, 1);
    });
  }

  getChildKeys(parentKey) {
    let childKeys: number[] = [];
    const getChildren = (key: number) => {
      const children = this.gridData.filter(
        (task) => task.ProjectMilestoneParentID == key
      );
      children.forEach((subTask) => {
        childKeys.push(subTask.ProjectMilestoneID);
        getChildren(subTask.ProjectMilestoneID);
      });
    };

    getChildren(parentKey);
    return childKeys;
  }

  disableCheckboxes(disableKeys) {
    disableKeys.forEach((key) => {
      let rowIndex = this.projectTasksGrid.instance.getRowIndexByKey(key);
      if (rowIndex !== -1) {
        let rowElements =
          this.projectTasksGrid.instance.getRowElement(rowIndex);
        rowElements?.forEach((element) => {
          let editor = dxCheckBox.getInstance(
            element.querySelector('.dx-select-checkbox')
          );
          if (editor) {
            if (this.selectionEvent) {
              editor.option('disabled', true);
            } else {
              editor.option('disabled', false);
            }
          }
        });
      }
    });
  }

  hasSubTasks(taskId): boolean {
    return this.gridData.some(
      (task) => task.ProjectMilestoneParentID == taskId
    );
  }

  tasksContentReady(e) {
    this.selectionEvent = true;
    this.disableCheckboxes(this.allDisabledRowKeys);
  }

  deleteSelectedTasks(taskId) {
    this.deleteTaskIds = [];
    if (taskId) {
      if (this.allSelectedRowKeys.length || this.hasSubTasks(taskId)) {
        return;
      }

      this.deleteTaskIds.push(taskId);
    } else {
      this.deleteTaskIds = this.allSelectedRowKeys;
    }

    let selectedTasks = [];
    this.deleteTaskIds.forEach((delTaskId) => {
      this.gridData.forEach((task) => {
        if (delTaskId == task.ProjectMilestoneID) {
          selectedTasks.push({
            fullStep: task.ProjectMilestoneStepFull,
            taskName: task.ProjectMilestoneName,
          });
        }
      });
    });
    let confirmText =
      'Are you sure you want to delete the selected task(s)? \n\n';
    selectedTasks.forEach((task) => {
      confirmText += task.fullStep + ' - ' + task.taskName + '\n';
    });

    let tasksToDelete = {
      projectID: this.projectId,
      iDs: this.deleteTaskIds,
    };

    this.subs.push(
      this.dialogService
        .confirm('Tasks Deletion', confirmText, 'Confirm', 'Cancel')
        .pipe(
          filter((confirmed) => !!confirmed),
          switchMap((_) => this.dashboardService.deleteTasks(tasksToDelete)),
          tap((res) => {
            res.success
              ? (this.dashboardService.successNotify(
                  'Selected Tasks(s) successfully removed.'
                ),
                this.getGridData())
              : this.dashboardService.errorNotify(
                  'The task(s) could not be deleted. Please review and try again.'
                );
          })
        )
        .subscribe()
    );
  }

  modifyCompleteDate(taskId?: number) {
    this.selectedTaskId = taskId;
    let dialogRef = this.dialog.open(TaskModifyCompleteDateComponent, {
      height: '320px',
      width: '450px',
      panelClass: 'modifyCompleteDateModal',
      data: { projectId: this.projectId, taskId: this.selectedTaskId },
      disableClose: true,
    });

    this.subs.push(
      dialogRef
        .afterClosed()
        .pipe(filter((reload) => !!reload))
        .subscribe()
    );
  }

  addOrEditTask(
    taskIndexOrder,
    editTask: boolean,
    taskId?: number,
    taskParentId?: number,
    taskStep?: number,
    taskSubTasksCount?: number
  ) {
    this.openAddEditTaskDialog(
      taskIndexOrder,
      editTask,
      false,
      taskId,
      taskParentId,
      taskStep,
      taskSubTasksCount
    );
  }

  addSubTask(
    taskIndexOrder,
    taskId?: number,
    taskParentId?: number,
    taskStep?: number,
    taskSubTasksCount?: number
  ) {
    this.openAddEditTaskDialog(
      taskIndexOrder,
      false,
      true,
      taskId,
      taskParentId,
      taskStep,
      taskSubTasksCount
    );
  }

  private openAddEditTaskDialog(
    taskIndexOrder: number,
    editTask: boolean,
    addSubTask: boolean,
    taskId?: number,
    taskParentId?: number,
    taskStep?: number,
    taskSubTasksCount?: number
  ) {
    this.selectedTaskId = taskId;
    this.getCurrentProjectTasks();

    this.subs.push(
      this.getProjectTaskSettingsObservable().subscribe(
        (successful: boolean) => {
          if (!successful) {
            return;
          }

          let dialogRef = this.dialog.open(AddEditTaskComponent, {
            height: '800px',
            width: '500px',
            panelClass: 'addEditTaskModal',
            data: {
              memberInfo: this.memberInfo,
              projectId: this.projectId,
              taskId: this.selectedTaskId,
              taskParentId: taskParentId,
              projectCurrentTasks: this.projectCurrentTasks,
              editTask: editTask,
              addSubTask: addSubTask,
              projectTaskSettings: this.projectTaskSettings,
              taskStep: taskStep,
              taskSubTasksCount: taskSubTasksCount,
              taskIndexOrder: taskIndexOrder,
            },
            disableClose: true,
          });

          this.subs.push(
            dialogRef.componentInstance.onApplyClick.subscribe(
              (newTaskId: number) => {
                let gridDataObservable = this.returnGridDataObservable();

                this.subs.push(
                  gridDataObservable
                    .pipe(
                      map((res: boolean) => {
                        if (res) {
                          this.getCurrentProjectTasks();
                          dialogRef.componentInstance.changeToEditPopup(
                            newTaskId,
                            this.projectCurrentTasks
                          );
                        }
                      })
                    )
                    .subscribe()
                );
              }
            )
          );

          this.subs.push(
            dialogRef
              .afterClosed()
              .pipe(filter((reload) => !!reload))
              .subscribe((reload) => {
                if (reload) {
                  this.getGridData();
                }
              })
          );
        }
      )
    );
  }

  displayTaskDetail(e) {
    if (e.rowType == 'data' && e.column.dataField == 'ProjectMilestoneName') {
      this.showTaskInfoModal(
        e.data.ProjectMilestoneID,
        e.data.ProjectMilestoneParentID,
        e.data.ProjectMilestoneStep,
        e.data.IndexOrder,
        e.data.TaskSubTasksCount
      );
    }
  }

  searchDataGrid(searchText) {
    this.searchText = searchText;
    this.projectTasksGrid.instance.searchByText(searchText);
  }
  clearAllFilters() {
    this.projectTasksGrid.instance.clearFilter();
    this.searchText = '';
  }

  onViewNameChange(e, process) {
    !this.inputViewTextBox.validate()
      ? this.inputViewTextBox.focusTextBox()
      : this.createNewListView(e.value);
  }

  onEnterKeyHit(e, process) {
    !this.inputViewTextBox.validate()
      ? this.inputViewTextBox.focusTextBox()
      : this.createNewListView(this.inputViewTextBox.value);
  }

  onCellPrepared(e) {
    if (e.rowType !== 'header' && e.column.name == 'selection') {
      let htmlCellElement = e.cellElement;
      htmlCellElement.setAttribute('id', 'ptm-taskId' + e.rowIndex);
    }
  }

  getRestOfApprovers(Approvers) {
    let assigneeNames = '';
    Approvers.forEach((assignee, index) => {
      if (index > 2) {
        assigneeNames += assignee.FullName + ' \n';
      }
    });
    return assigneeNames;
  }

  showTaskInfoModal(
    taskId: number,
    taskParentId: number,
    taskStep: number,
    taskIndexOrder: number,
    taskSubTasksCount: number
  ) {
    console.log(
      `taskDetail before: taskID: ${taskId}, parentId: ${taskParentId}, step: ${taskStep}`
    );
    this.selectedTaskId = taskId;
    this.getCurrentProjectTasks();
    let dialogRef = this.dialog.open(TaskInfoComponent, {
      height: '800px',
      width: '500px',
      panelClass: 'taskInfoModal',
      data: {
        projectId: this.projectId,
        taskId: this.selectedTaskId,
        taskParentId,
        taskStep,
        taskIndexOrder,
        taskSubTasksCount,
        projectCurrentTasks: this.projectCurrentTasks,
      },
      disableClose: true,
    });

    this.subs.push(
      dialogRef
        .afterClosed()
        .pipe(filter((reload) => !!reload))
        .subscribe((toDo) => {
          if (toDo.reload) {
            this.getGridData();
          }
          if (toDo.showEditTask && toDo.taskDetails) {
            console.log(
              `taskDetail before: taskID: ${toDo.taskDetails.taskId}, parentId: ${toDo.taskDetails.taskParentId}, step: ${toDo.taskDetails.taskStep}`
            );
            this.addOrEditTask(
              toDo.taskDetails.taskIndexOrder,
              true,
              toDo.taskDetails.taskId,
              toDo.taskDetails.taskParentId,
              toDo.taskDetails.taskStep,
              toDo.taskDetails.taskSubTasksCount
            );
          }
        })
    );
  }

  saveState(state) {
    sessionStorage.setItem('projectTasksGridState', JSON.stringify(state));
    sessionStorage.setItem(
      'projectTasksGridExpand',
      JSON.stringify(this.isExpandAll)
    );
  }

  expandCollapseAll() {
    this.isExpandAll = !this.isExpandAll;
    this.expandOrCollapseGrid();
  }

  expandOrCollapseGrid() {
    if (this.isExpandAll) {
      this.gridData.forEach((row) => {
        this.projectTasksGrid.instance.expandRow(row.ProjectMilestoneID);
      });
    } else {
      this.gridData.forEach((row) => {
        this.projectTasksGrid.instance.collapseRow(row.ProjectMilestoneID);
      });
      this.expandedRowKeys?.forEach((key) => {
        this.projectTasksGrid.instance.expandRow(key);
      });
    }
  }

  showColumnChooser() {
    this.projectTasksGrid.instance.showColumnChooser();
  }

  moreMenuClosed() {
    !this.inputViewTextBox.validate() && this.inputViewTextBox.reset();
  }

  getTaskStatusColor(color: string): string {
    switch (color) {
      case 'Red':
        return 'tin-status-icon-red';
        break;
      case 'Green':
        return 'tin-status-icon-green';
        break;
      case 'Yellow':
        return 'tin-status-icon-yellow';
        break;
      case 'Gray':
        return 'tin-status-icon-gray';
        break;
      case 'White':
        return 'tin-status-icon-white';
        break;
      default:
        return 'tin-status-icon-lightGray';
        break;
    }
  }

  getCurrentProjectTasks() {
    this.projectCurrentTasks = [];
    this.gridData.forEach((projectTask) => {
      let tempDtls: ProjectTaskDropdownInfo = <ProjectTaskDropdownInfo>{};
      tempDtls.taskId = projectTask.ProjectMilestoneID;
      tempDtls.taskParentId = projectTask.ProjectMilestoneParentID;
      tempDtls.taskStepNumber = projectTask.ProjectMilestoneStep;
      tempDtls.taskFullStep = projectTask.ProjectMilestoneStepFull;
      tempDtls.taskName = projectTask.ProjectMilestoneName;
      tempDtls.displayVal =
        projectTask.ProjectMilestoneStepFull +
        ' - ' +
        projectTask.ProjectMilestoneName;
      tempDtls.indexOrder = projectTask.IndexOrder;
      tempDtls.taskSubTasksCount = projectTask.TaskSubTasksCount;
      this.projectCurrentTasks.push(tempDtls);
    });
  }

  public getMemberInfo() {
    this.subs.push(
      this.dashboardService.getmemberinfo().subscribe(
        (res: any) => {
          this.memberInfo = res.data;
        },
        (error: any) =>
          console.log('Error occurred getting Member Info Data ', error),
        () => {}
      )
    );
  }

  public getProjectContactLevel(projectId) {
    this.subs.push(
      this.dashboardService.getProjectContactLevel(projectId).subscribe(
        (res: any) => {
          this.userAccessLevel = res.data;
        },
        (error: any) =>
          console.log('Error occurred getting User Access Level ', error),
        () => {}
      )
    );
  }

  private getGridData() {
    let gridDataObservable = this.returnGridDataObservable();
    this.subs.push(gridDataObservable.subscribe());
  }

  private returnGridDataObservable(): Observable<boolean> {
    let gridDataRequest = {
      listPageId: this.currentListView.listPageId,
      userViewId: null,
      masterGroupId: null,
      gridStateOverride: '',
      tempArchiveToggleValue: 3,
      OID: this.projectId,
      Oids: [1, 1],
      InClauses: ['(0)'],
    };

    return this.dashboardService.getGridData(gridDataRequest).pipe(
      map((res: any) => {
        if (res) {
          this.availablePredecessors = [];
          this.predValues = [];
          this.availableApprovers = [];
          this.approversValues = [];

          this.gridData = res.data;
          this.noDataText = this.gridData.length ? '' : 'No Data';
          this.dataRetrieved = true;
          this.gridData.forEach((task) => {
            task.Approvers = JSON.parse(task.Approvers);
            task.TaskStatus = JSON.parse(task.TaskStatus);
            task.ProjectMilestoneDescription = task.ProjectMilestoneDescription
              ? task.ProjectMilestoneDescription.replace(/<br>/g, '\n')
              : task.ProjectMilestoneDescription;
            task.Predecessors = JSON.parse(task.Predecessors);
            if (task.Predecessors?.length) {
              task.Predecessors.forEach((taskPred) => {
                if (this.predValues.indexOf(taskPred) == -1) {
                  this.predValues.push(taskPred);
                }
              });
            }
            if (task.Approvers?.length) {
              task.Approvers.forEach((approver) => {
                let approverVal = `${approver.FullName} - ${approver.ApprovalStatus}`;
                if (this.approversValues.indexOf(approverVal) == -1) {
                  this.approversValues.push(approverVal);
                }
              });
            }
          });
          if (this.approversValues.length) {
            this.buildApproversFilterSource();
          }
          if (this.predValues.length) {
            this.buildPredecessorFilterSource();
          }

          let savedState = sessionStorage.getItem('projectTasksGridState');
          this.activeViewId = this.currentListView.id;
          this.isExpandAll = sessionStorage.getItem('projectTasksGridExpand')
            ? JSON.parse(sessionStorage.getItem('projectTasksGridExpand'))
            : this.currentListView.isExpandAllSelected;
          this.activeViewState = savedState
            ? savedState
            : this.currentListView.view;
          this.setCurrentState();

          return true;
        } else {
          return false;
        }
      })
    );
  }

  buildApproversFilterSource() {
    let approverHeaderFilterObj = {
      text: null,
      value: null,
    };
    this.availableApprovers.push(approverHeaderFilterObj);
    this.approversValues?.forEach((val) => {
      let approverHeaderFilterObj = {
        text: val,
        value: val,
      };
      this.availableApprovers.push(approverHeaderFilterObj);
    });
  }

  calcApproversCellValue(data) {
    return data.Approvers?.length
      ? data.Approvers.map((a) => `${a.FullName} - ${a.ApprovalStatus}`)
      : '';
  }

  buildPredecessorFilterSource() {
    let predHeaderFilterObj = {
      text: null,
      value: null,
    };
    this.availablePredecessors.push(predHeaderFilterObj);
    this.predValues.forEach((val) => {
      let predHeaderFilterObj = {
        text: val,
        value: val,
      };
      this.availablePredecessors.push(predHeaderFilterObj);
    });
  }

  calcPredecessorsCellValue(data) {
    return data.Predecessors?.length ? data.Predecessors.map((p) => p) : '';
  }

  calcFilterExpression(
    this: Column,
    filterValue,
    selectedFilterOperation,
    target
  ) {
    if (target === 'search') {
      return ['Predecessors', 'contains', filterValue];
    }

    if (filterValue) {
      let selector = (data) => {
        let applyOperation = (arg1, arg2, op) => {
          if (op === '=') return arg1 === arg2;
          if (op === 'contains') return arg1.includes(arg2);
          if (op === 'startswith') return arg1.startsWith(arg2);
          if (op === 'endswith') return arg1.endsWith(arg2);
        };
        let values = this.calculateCellValue(data);
        return (
          values &&
          !!values.find((v) =>
            applyOperation(v, filterValue, selectedFilterOperation)
          )
        );
      };
      return [selector, '=', true];
    }
    return this.defaultCalculateFilterExpression.apply(this, arguments);
  }

  getListViews() {
    const request: GetViewDropdownDataRequest = {
      objectTypeId: this.objectTypeId,
      isSuperUser: this.isSuperUser,
    };

    this.dashboardService
      .getListViewSelectorItems(request)
      .subscribe((res: any) => {
        if (res) {
          this.listViews = res.data;

          this.availableListViewCount =
            this.listViews.coStarListViews.length +
            this.listViews.myListViews.length +
            this.listViews.sharedListViews.length;

          this.makeProjectTaskViewNull(); //** this will be removed once we establish the projectTasks View */
          if (this.isNewListViewCreated) {
            const newListView = this.listViews.myListViews.find(
              (x) => x.id == new Number(this.newListViewId)
            );
            this.isNewListViewCreated = false;
            this.getCurrentView(newListView);
          } else if (this.isActiveListView) {
            this.isActiveListView = false;
            this.getDefaultView();
          } else if (!this.activeViewId) {
            if (this.sessionView) {
              const foundView =
                this.listViews.coStarListViews.find(
                  (x) => x.id == this.sessionView.id
                ) ||
                this.listViews.myListViews.find(
                  (x) => x.id == this.sessionView.id
                ) ||
                this.listViews.sharedListViews.find(
                  (x) => x.id == this.sessionView.id
                ) ||
                this.listViews.hiddenListViews.find(
                  (x) => x.id == this.sessionView.id
                );
              if (foundView) {
                this.getCurrentView(foundView);
              } else {
                this.getDefaultView();
              }
            } else {
              this.getDefaultView();
            }
          } else {
            this.setCurrentState();
          }
        } else {
          //this.dialogService.alert('Get Project Tasks Grid Data Error', 'There was an issue with getting Project Tasks. Please contact the system administrator.', 'OK');
        }
      });
  }

  makeProjectTaskViewNull() {
    if (this.listViews.coStarListViews.length) {
      this.listViews.coStarListViews[0].view = null;
    } else {
      if (this.listViews.hiddenListViews.length) {
        let projectTasksListView = this.listViews.hiddenListViews.find(
          (x) => x.name.toLocaleLowerCase().trim() == 'projecttasks'
        );
        projectTasksListView ? (projectTasksListView.view = null) : '';
      }
    }
  }

  getDefaultView() {
    let defaultListView = this.listViews?.coStarListViews?.find(
      (x) => x.isDefault
    )
      ? this.listViews?.coStarListViews?.find((x) => x.isDefault)
      : this.listViews?.myListViews?.find((x) => x.isDefault)
      ? this.listViews?.myListViews?.find((x) => x.isDefault)
      : this.listViews?.sharedListViews?.find((x) => x.isDefault)
      ? this.listViews?.sharedListViews?.find((x) => x.isDefault)
      : this.listViews?.coStarListViews[0]
      ? this.listViews?.coStarListViews[0]
      : this.listViews?.myListViews[0]
      ? this.listViews?.myListViews[0]
      : this.listViews?.sharedListViews[0]
      ? this.listViews?.sharedListViews[0]
      : this.listViews?.hiddenListViews[0];

    this.getCurrentView(defaultListView);
  }

  createNewListView(viewName: string) {
    this.inputViewName = viewName.trim();

    const userListView: ListView = {
      id: 0,
      listViewType: this.userListViewType,
      objectTypeId: this.objectTypeId,
      listPageId: this.currentListView.listPageId,
      name: this.inputViewName,
      view: JSON.stringify(this.projectTasksGrid.instance.state()),
      isExpandAllSelected: this.isExpandAll,
      archiveToggleValue: 3,
      masterGroupId: null,
    };

    this.dashboardService
      .createUserListView(userListView)
      .subscribe((res: any) => {
        if (res) {
          this.isNewListViewCreated = true;
          this.newListViewId = res.data;
          this.inputViewTextBox.reset();
          this.getListViews();
        } else {
        }
      });

    this.moreMenuTrigger.closeMenu();
  }

  saveSessionState(view) {
    sessionStorage.setItem('projectTasksSessionView', JSON.stringify(view));
  }

  getCurrentView(view: any) {
    this.currentListView = view;
    this.currentListViewName = this.currentListView.name;
    this.saveSessionState(this.currentListView);
    if (!this.activeViewId) {
      this.getGridData();
    } else {
      this.activeViewId = this.currentListView.id;
      this.isExpandAll = this.currentListView.isExpandAllSelected;
      this.activeViewState = this.currentListView.view;
      this.setCurrentState();
    }
  }

  setCurrentState() {
    this.allSelectedRowKeys = [];
    this.allDisabledRowKeys = [];
    this.searchText = JSON.parse(this.activeViewState)?.searchText
      ? JSON.parse(this.activeViewState).searchText
      : '';
    this.projectTasksGrid?.instance.state({});
    let parsedState = JSON.parse(this.activeViewState);
    if (parsedState) {
      parsedState.selectedRowKeys = [];
      this.expandedRowKeys = parsedState.expandedRowKeys?.length
        ? parsedState.expandedRowKeys
        : [];
    }
    this.projectTasksGrid?.instance.state(parsedState);
    this.projectTasksGrid?.instance.clearSelection();
    this.expandOrCollapseGrid();
  }

  setCurrentListView(selectedListView: ListView) {
    if (selectedListView.id === this.currentListView.id) {
      return;
    }
    this.getCurrentView(selectedListView);
  }

  setDefaultListView(view: ListView) {
    view.isDefault = true;

    const request: SetDefaultListViewRequest = {
      listViewId: view.id,
      listViewType: view.listViewType,
      objectTypeId: this.objectTypeId,
      clearDefault: false,
    };

    this.dashboardService.setDefaultListView(request).subscribe(() => {
      this.getListViews();
    });
  }

  clearDefault(view: ListView) {
    view.isDefault = false;

    const request: SetDefaultListViewRequest = {
      listViewId: view.id,
      listViewType: view.listViewType,
      objectTypeId: this.objectTypeId,
      clearDefault: true,
    };

    this.dashboardService.setDefaultListView(request).subscribe(() => {
      this.getListViews();
    });
  }

  shareListView(listview: ListView) {
    this.sharingListView = listview;

    this.cremShareListViewPopup.showPopup();
  }

  reloadListViewMenu() {
    if (this.cremShareListViewPopup.isDeleteConfirm) {
      return;
    }

    this.getListViews();
  }

  hideListView(listView: ListView, isHidden: boolean) {
    if (isHidden && this.availableListViewCount === 1) {
      this.dialogService.alert(
        'Information',
        'Cannot delete or hide all views in the list.',
        'Close'
      );
      return;
    }

    const request: HideListViewRequest = {
      listViewId: listView.id,
      listViewType: listView.listViewType,
      isHidden: isHidden,
    };

    this.dashboardService.hideListView(request).subscribe(() => {
      this.getListViews();
    });
  }

  updateListView() {
    this.currentListView.view = JSON.stringify(
      this.projectTasksGrid.instance.state()
    );

    const viewObj = {
      id: this.currentListView.id,
      listViewType: this.currentListView.listViewType,
      view: this.currentListView.view,
      archiveToggleValue: 3,
      isExpandAllSelected: this.isExpandAll,
      masterGroupId: this.currentListView.masterGroupId,
    };

    this.dashboardService.updateListView(viewObj).subscribe(() => {});
  }

  resetListView() {
    this.setCurrentState();
  }

  deleteListView(delView: ListView, isConfirmed = false) {
    if (this.availableListViewCount === 1) {
      this.dialogService.alert(
        'Information',
        'Cannot delete or hide all views in the list.',
        'Close'
      );
      return;
    }

    if (
      !isConfirmed &&
      (delView.isSharedWithOthers || delView.isSharedWithMe)
    ) {
      this.sharingListView = delView;
      this.cremShareListViewPopup.showPopup(true);

      return;
    }

    this.isActiveListView =
      delView.listViewType === this.currentListView.listViewType &&
      delView.id === this.currentListView.id;

    this.dashboardService.deleteUserView(delView.id).subscribe(() => {
      this.getListViews();
    });
  }

  getFiltersCount() {
    if (typeof this.projectTasksGrid?.instance?.state !== 'function') {
      return '';
    }
    const filters = this.projectTasksGrid?.instance?.state().filterValue;
    if (!filters || (filters && filters.length === 0)) {
      return '';
    }
    const arrayCount = (filters as any[]).reduce((acc: number, item: any) => {
      if (Array.isArray(item)) {
        acc += 1;
      }
      return acc;
    }, 0);
    if (arrayCount) {
      return arrayCount;
    }
    return '1';
  }

  //**** Task Setting Popup Related Code */
  showTaskDetailSettings() {
    this.subs.push(
      combineLatest([
        this.dashboardService.getProjectTaskSettings(this.projectId),
        this.dashboardService.getProjectEmailPreferences(this.projectId),
      ]).subscribe(
        ([projSettings, projEmailPreferences]) => {
          if (!projSettings || !projEmailPreferences) {
            this.dashboardService.displayContactSystemAdminMessage();
          } else if (projSettings.success && projEmailPreferences.success) {
            this.projectTaskSettings = projSettings.data;
            this.projectEmailPreferences = projEmailPreferences.data;
            this.checkAllemailOptionsSelected();

            this.settingsVisible = true;
          } else {
            this.dashboardService.displayContactSystemAdminMessage();
          }
        },
        (error: any) => {
          console.log(
            'Error occurred getting Projects Client Settings and or Email Preferences',
            error
          );
        },
        () => {}
      )
    );
  }

  showAppendTemplateDialog() {
    let dialogRef = this.dialog.open(AppendTemplateComponent, {
      height: '800px',
      width: '2000px',
      panelClass: 'appendTemplateModal',
      data: { projectId: this.projectId },
      disableClose: true,
    });

    this.subs.push(
      dialogRef
        .afterClosed()
        .pipe(filter((reload) => !!reload))
        .subscribe((changesSaved) => {
          if (changesSaved) {
            this.dashboardService.successNotify(
              'Tasks were successfully appended to the transaction.'
            );
            this.getGridData();
          }
        })
    );
  }

  checkAllemailOptionsSelected() {
    this.selectAllEmailPref = true;
    let setting;
    for (setting in this.projectEmailPreferences) {
      if (
        setting.trim() !== 'transactionName' &&
        setting.trim() !== 'emailOnInitiation'
      ) {
        if (this.projectEmailPreferences[setting] == true) {
          continue;
        } else {
          this.selectAllEmailPref = false;
          break;
        }
      }
    }
  }

  taskSettingsOnClose(e) {
    if (e == 'close') {
      this.settingsVisible = false;
      this.taskSettingsChangesMade = false;
    } else {
      if (this.taskSettingsChangesMade) {
        this.subs.push(
          this.dialogService
            .confirm(
              'Changes Made!',
              `Changes you made have not been saved.  Would you like to continue editing or leave ?`,
              'Continue',
              'Leave'
            )
            .pipe(
              filter((confirmed) => !confirmed),
              tap((_) => {
                this.settingsVisible = false;
                this.taskSettingsChangesMade = false;
              })
            )
            .subscribe()
        );
      } else {
        this.settingsVisible = false;
        this.taskSettingsChangesMade = false;
      }
    }
  }

  onStartOrDueDateChange(e, setting) {
    if (!e.event) {
      return;
    }
    this.taskSettingsChangesMade = true;
    this.projectTaskSettings[setting] = e.value;
  }

  projSettingToggleChanged(e, setting) {
    this.taskSettingsChangesMade = true;
    this.projectTaskSettings[setting] = e.checked;
  }

  selectAllEmailPreferences(e) {
    if (!e.event) {
      return;
    }
    this.taskSettingsChangesMade = true;
    this.selectAllEmailPref = e.value;

    for (let setting in this.projectEmailPreferences) {
      if (setting !== 'transactionName' && setting !== 'emailOnInitiation') {
        this.projectEmailPreferences[setting] = e.value;
      }
    }
  }

  emailOptionChanged(e, option) {
    if (!e.event) {
      return;
    }
    this.taskSettingsChangesMade = true;
    this.projectEmailPreferences[option] = e.value;
    this.selectAllEmailPref = e.value ? this.selectAllEmailPref : e.value;

    if (e.value) {
      this.checkAllemailOptionsSelected();
    }
  }

  applyOrSaveTaskSettings(oper) {
    if (!this.projectTaskSettings.startDate) {
      this.taskSettingStartDate.focusDatePicker();
      return;
    }

    this.postProjectTaskSettings.projectID = this.projectId;
    this.postProjectTaskSettings.startDate = this.projectTaskSettings.startDate;
    this.postProjectTaskSettings.dueDate = this.projectTaskSettings.dueDate;
    this.postProjectTaskSettings.calculateDates =
      this.projectTaskSettings.calculateDates;
    this.postProjectTaskSettings.calculatedBy =
      this.projectTaskSettings.calculatedBy;
    this.postProjectTaskSettings.autoCalculate =
      this.projectTaskSettings.autoCalculate;
    this.postProjectTaskSettings.shiftTimeline =
      this.projectTaskSettings.shiftTimeline;
    this.postProjectTaskSettings.projectRequiredTaskNotes =
      this.projectTaskSettings.projectRequiredTaskNotes;

    this.postProjectEmailPreferences.projectID = this.projectId;
    this.postProjectEmailPreferences.autoEmail =
      this.projectEmailPreferences.transactionAutoEmail;
    this.postProjectEmailPreferences.overdueEmails =
      this.projectEmailPreferences.emailOverdue;
    this.postProjectEmailPreferences.onStartEmails =
      this.projectEmailPreferences.emailOnStart;
    this.postProjectEmailPreferences.onApproval =
      this.projectEmailPreferences.emailOnApproval;
    this.postProjectEmailPreferences.copyApprover =
      this.projectEmailPreferences.emailCopyApprover;
    this.postProjectEmailPreferences.includeMinors =
      this.projectEmailPreferences.emailIncludeMinors;
    this.postProjectEmailPreferences.onCompletion =
      this.projectEmailPreferences.emailOnCompletion;
    this.postProjectEmailPreferences.onInitiation =
      this.projectEmailPreferences.emailOnInitiation;
    this.postProjectEmailPreferences.followDependencies =
      this.projectEmailPreferences.emailFollowDependencies;
    this.postProjectEmailPreferences.followSteps =
      this.projectEmailPreferences.emailFollowSteps;
    this.postProjectEmailPreferences.fileUpload =
      this.projectEmailPreferences.emailOnFileUpload;
    this.postProjectEmailPreferences.milestoneApproval =
      this.projectEmailPreferences.emailOnMilestoneApproval;
    this.postProjectEmailPreferences.copyTeam =
      this.projectEmailPreferences.emailCopyTeam;
    this.postProjectEmailPreferences.milestoneCompletion =
      this.projectEmailPreferences.emailMilestoneCompletionCCTeam;

    this.subs.push(
      combineLatest([
        this.dashboardService.postProjectTaskSettings(
          this.postProjectTaskSettings
        ),
        this.dashboardService.postProjectEmailPreferences(
          this.postProjectEmailPreferences
        ),
      ]).subscribe(
        ([pps, ppep]) => {
          if (!pps || !ppep) {
            this.dialogService.alert(
              'Information',
              'Either Project Task Settings or Project Email Preferences API call has failed.',
              'Close'
            );
          } else if (pps.success && ppep.success) {
          } else {
            this.dialogService.alert(
              'Information',
              'Saving either Project Task Settings or Project Email Preferences is not successful.',
              'Close'
            );
          }
        },
        (error: any) => {
          console.log(
            'Error occurred Saving Project Task Settings or Project Email Preferences ',
            error
          );
        },
        () => {}
      )
    );

    this.taskSettingsChangesMade = false;
    if (oper == 'save') {
      this.settingsVisible = false;
    }
  }

  copyTransactionTemplate() {
    this.copyTransactionVisible = true;
  }

  applyOrSaveCopyTransaction(applyOrSave) {
    if (applyOrSave == 'Copy') {
      this.copyTransactionComponent.validateAndApplyChanges();
    } else {
      this.ctSaveButtonText = null;
      this.copyTransactionVisible = false;
      this.copyTransactionComponent.resetPopup();
    }
  }

  copyProjectEvent(e) {
    this.ctSaveButtonText = e ? 'Go' : null;
  }

  private getProjectTaskSettingsObservable() {
    return this.dashboardService.getProjectTaskSettings(this.projectId).pipe(
      switchMap((res) => {
        if (!res) {
          this.dashboardService.displayContactSystemAdminMessage();
          return of(false);
        } else if (res.success) {
          this.projectTaskSettings = res.data;
          return of(true);
        } else {
          this.dashboardService.displayContactSystemAdminMessage();
          return of(false);
        }
      })
    );
  }

  openQuickApprovalPopup() {
    this.subs.push(
      this.dashboardService
        .getClientPreference(PROJECT_REQUIRE_TASK_NOTES)
        .subscribe((res) => {
          if (res.data === CLIENT_PREFERENCE.REQUIRED) {
            this.quickApprovalFooterText = QUICK_APPROVAL_FOOTER_TEXT;
          }
          this.approveButtonText = APPROVE_BUTTON_TEXT;
          this.showQuickApprovalPopup = !this.showQuickApprovalPopup;
        })
    );
  }
  setSaveButtonText(count: number): void {
    if (count !== 0)
      this.approveButtonText = `${APPROVE_BUTTON_TEXT} (${count})`;
    else this.approveButtonText = APPROVE_BUTTON_TEXT;
  }
  onQuickApprovalSave(): void {
    this.quickApprovalService.quickApprovalSaveClick$.next(true);
  }
  onQuickApprovalClose(): void {
    this.showQuickApprovalPopup = !this.showQuickApprovalPopup;
  }
  quickApprovalSaved(saveCompleted: boolean): void {
    if (saveCompleted) {
      this.showQuickApprovalPopup = !this.showQuickApprovalPopup;
    }
  }

  showSaveAsTasksTemplateDialog(): void {
    this.showSaveTasksAsTemplatePopup = !this.showSaveTasksAsTemplatePopup;
  }

  tasksTemplateInputChange(input: string) {
    input === ''
      ? (this.disableTasksTemplateSaveButton = true)
      : (this.disableTasksTemplateSaveButton = false);
  }

  saveTasksTemplatePopup(): void {
    this.saveTasksTemplateService.saveTasksTemplateSaveClick$.next(true);
  }

  closeTasksTemplatePopup(): void {
    this.showSaveTasksAsTemplatePopup = !this.showSaveTasksAsTemplatePopup;
  }

  tasksTemplateSaved(saveCompleted: boolean): void {
    if (saveCompleted) {
      this.showSaveTasksAsTemplatePopup = !this.showSaveTasksAsTemplatePopup;
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
