import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
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
import { CurrentObjectService } from '@mango/core-shared';
import {
  CLIENT_PREFERENCE,
  ContactRecord,
  CurrentObjectInfo,
  MemberInfo,
  PostProjectEmailPreferences,
  PostProjectTaskSettings,
  ProjectEmailPreferences,
  ProjectTaskDetails,
  ProjectTaskDropdownInfo,
  ProjectTaskInfo,
  ProjectTaskSettings,
} from '@mango/data-models/lib-data-models';
import {
  DatePickerComponent,
  InputComponent,
} from '@mango/ui-shared/lib-ui-elements';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { TaskUserApprovalStatus } from '@project-dashboard/models/enums/task-user-approval-enums';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { SaveTasksTemplateService } from '@project-dashboard/services/save-tasks-template.service';
import { ProjectTaskTreeExportUtility } from '@project-dashboard/utilities/project-task-tree-export.utility';
import { DxTreeListComponent } from 'devextreme-angular';
import dxCheckBox from 'devextreme/ui/check_box';
import { Column } from 'devextreme/ui/data_grid';
import { MangoDialogService } from 'libs/core-shared/src/lib/services/mango-dialog.service';
import { CremPopupComponent } from 'libs/ui-shared/lib-ui-elements/src/lib/popup';
import { CremShareViewPopupComponent } from 'libs/ui-shared/lib-ui-shared/src/lib/crem-list-views/crem-share-view-popup/crem-share-view-popup.component';
import { combineLatest, EMPTY, of, Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { concatMap, filter, first, map, switchMap, tap } from 'rxjs/operators';
import { TaskApproveOrRejectComponent } from '../modal/task-approve-or-reject/task-approve-or-reject.component';
import {
  APPROVE_BUTTON_TEXT,
  PROJECT_REQUIRE_TASK_NOTES,
  QUICK_APPROVAL_FOOTER_TEXT,
} from '../../models/constants/project-tasks-constants';
import { AddEditTaskComponent } from './add-edit-tasks/add-edit-task.component';
import { AppendTemplateComponent } from './append-template/append-template.component';
import { CopyTransactionComponent } from './copy-transaction/copy-transaction.component';
import { ModifyCompleteDateComponent } from './modify-complate-date/modify-complete-date.component';
import { CremQuickApprovalComponent } from './quick-approval/quick-approval.component';
import { AddEditTaskAssigneesComponent } from './task-info/task-assignees/add-edit-task-assignees/add-edit-task-assignees.component';
import { TaskInfoComponent } from './task-info/task-info.component';
import { AddTaskNoteComponent } from './task-info/task-notes/add-task-note/add-task-note.component';
import { RequiredNotesFlagService } from '@project-dashboard/services/required-notes-flag.service';
import { ReorderTaskModal } from './reorder-tasks-modal/reorder-tasks-modal.component';

@Component({
  selector: 'project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.scss'],
})
export class ProjectTasksComponent implements OnInit, OnDestroy {
  @ViewChild('ProjectTasksGrid') projectTasksGrid: DxTreeListComponent;
  @ViewChild('StartDatePicker') startDatePicker: DatePickerComponent;
  @ViewChild('DueDatePicker') dueDatePicker: DatePickerComponent;
  @ViewChild('CopyTransactionPopup') copyTransactionPopup: CremPopupComponent;

  subs: Subscription[] = [];
  projectId: number;
  taskInfoData: ProjectTaskInfo = <ProjectTaskInfo>{};
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
  isOneTaskShrinkable: boolean = false;
  isProxyApproverForOneTask: boolean = false;
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
  modifyApprovalDateBtnTitle: string =
    'Approval Date can be modified once approval has been done.';
  approvalBtnTitle: string =
    'require approval. Once completed this task will be available for approval.';
  dragPosition: any = { x: 0, y: 0 };
  showQuickApprovalPopup = false;
  approveButtonText = '';
  saveButtonText = 'Save';
  quickApprovalFooterText = '';
  quickApprovalApproveDisabled = true;
  quickApprovalSaveDisabled = true;
  showSaveTasksAsTemplatePopup = false;
  disableTasksTemplateSaveButton = true;
  taskUserApprovalStatus;
  workFlowOttid: number;

  private originalStartDate: string = '';
  private originalDueDate: string = '';
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
  isNotesFieldRequired: boolean = true;
  // ****/
  public readonly availableActions = {
    COPY_TRANSACTION: [1],
    QUICK_APPROVAL: [1, 2, 3],
    TASK_DETAILS_SETTINGS: undefined,
    DELETE_TASKS: [1],
    SAVE_TASKS_AS_TEMPLATE: [1],
    APPEND_TEMPLATE: [1],
    REORDER_TASKS: [1],
  };

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
  newProjectId?: number = null;

  //**** **/
  //** Copy Transaction related data **/
  copyTransactionVisible: boolean = false;
  ctSaveButtonText: string = null;
  ctApplyButtonText: string = 'Copy';

  //**** **/

  @ViewChild('moreMenuTrigger') moreMenuTrigger: MatMenuTrigger;
  @ViewChild('InputViewTextBox') inputViewTextBox: InputComponent;
  @ViewChild('cremShareListViewPopup')
  cremShareListViewPopup: CremShareViewPopupComponent;
  @ViewChild('taskDetailsSettingsPopup')
  taskDetailsSettingsPopup: CremPopupComponent;
  @ViewChild('copyTransactionComponent')
  copyTransactionComponent: CopyTransactionComponent;
  @ViewChild(CremQuickApprovalComponent)
  quickApprovalComponent!: CremQuickApprovalComponent;
  currentObject: Observable<CurrentObjectInfo> = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private dashboardService: DashboardService,
    private requiredNotesFlagService: RequiredNotesFlagService,
    private dialogService: MangoDialogService,
    private facade: MangoAppFacade,
    private saveTasksTemplateService: SaveTasksTemplateService,
    private currentObjectService: CurrentObjectService,
    private reorderTasksModal: ReorderTaskModal
  ) {
    this.saveState = this.saveState.bind(this);
  }

  ngOnInit(): void {
    this.taskUserApprovalStatus = TaskUserApprovalStatus;

    this.getMemberInfo();
    this.subs.push(
      this.route.queryParams
        .pipe(
          filter((params) => !!params && !!params.oid),
          tap((params) => {
            this.projectId = parseInt(params.oid);
            this.workFlowOttid = parseInt(params.ottid)
              ? parseInt(params.ottid)
              : 0;
            this.getProjectContactLevel(this.projectId);
          })
        )
        .subscribe()
    );

    this.getNotesRequiredFlag();

    this.sessionView = sessionStorage.getItem('projectTasksSessionView')
      ? JSON.parse(sessionStorage.getItem('projectTasksSessionView'))
      : null;
    this.getListViews();

    this.currentUserInfo$ = this.facade.contactRecord$;
    this.currentObject =
      this.currentObjectService.getCurentObjectNameAndType$();
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

  deleteSelectedTasks(taskId?: number) {
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

  addOrEditAssignees(task) {
    if (this.userAccessLevel !== 1) {
      return;
    }

    this.subs.push(
      this.dashboardService
        .getTaskDetails(this.projectId, task.ProjectMilestoneID)
        .pipe(
          switchMap((res) => {
            if (!!res && res.success) {
              this.taskInfoData = res.data;
              this.openEditAssinees(task, this.taskInfoData.approvers);
            } else {
              this.dialogService.alert(
                'Get Task Approvers',
                'There was an issue with getting task info. Please contact the system administrator.',
                'OK'
              );
            }
            return EMPTY;
          })
        )
        .subscribe()
    );
  }

  openEditAssinees(task, taskApprovers) {
    let dialogHeight = '800px';
    let dialogWidth = '500px';

    let dialogRef = this.dialog.open(AddEditTaskAssigneesComponent, {
      height: dialogHeight,
      width: dialogWidth,
      panelClass: 'aea-addOrEditAssginees',
      data: {
        projectId: this.projectId,
        taskId: task.ProjectMilestoneID,
        taskAssignees: taskApprovers,
        userDateFormat: this.dateFormat,
        dragPosition: this.dragPosition,
      },
      disableClose: true,
    });

    this.subs.push(
      dialogRef
        .afterClosed()
        .pipe(filter((reload) => !!reload))
        .subscribe((reload) => {
          if (reload.saveSuccessful) {
            this.getGridData();
          }
        })
    );
  }

  openReorderTasks() {
    const orderableTasks = this.gridData.map(
      ({
        ProjectMilestoneParentID: parentId,
        ProjectMilestoneID: taskId,
        ProjectMilestoneStep: ordinal,
        ProjectMilestoneName: name,
      }) => ({
        taskId,
        parentId,
        ordinal,
        name,
      })
    );
    this.reorderTasksModal
      .open({
        data: {
          projectID: this.projectId,
          orderableTasks,
        },
      })
      .afterClosed()
      .subscribe((_) => {
        this.getGridData();
      });
  }

  getNotesRequiredFlag() {
    this.subs.push(
      this.requiredNotesFlagService
        .getRequiredNotesFlag(this.projectId)
        .subscribe(
          (notesRequiredFlag) => {
            this.isNotesFieldRequired = notesRequiredFlag;
          },
          (error) => {
            this.isNotesFieldRequired = true;
          },
          () => {}
        )
    );
  }

  modifyCompleteDate(taskId, isProxyUser, userApprovalStatus) {
    if (
      this.userAccessLevel !== 1 &&
      userApprovalStatus.trim() == this.taskUserApprovalStatus.NOT_ASSIGNED
    ) {
      return;
    }

    let dialogRef = this.dialog.open(ModifyCompleteDateComponent, {
      height: '350px',
      width: '500px',
      maxWidth: '800px',
      maxHeight: '600px',
      panelClass: 'modifyCompleteDateModal',
      data: {
        projectId: this.projectId,
        taskId: taskId,
        isCompleteDate: 1,
        isProxyUser: isProxyUser,
        dateFormat: this.dateFormat,
        notesRequired: this.isNotesFieldRequired,
      },
      disableClose: true,
    });

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

  addOrEditTask(
    taskIndexOrder,
    editTask: boolean,
    taskId?: number,
    taskParentId?: number,
    taskStep?: number,
    taskSubTasksCount?: number
  ) {
    if (this.userAccessLevel !== 1) {
      return;
    }

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
    if (this.userAccessLevel !== 1) {
      return;
    }

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
              workFlowOttid: this.workFlowOttid,
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

  openAddNotesPopup(taskData) {
    this.selectedTaskId = taskData.ProjectMilestoneID;
    let dialogRef = this.dialog.open(AddTaskNoteComponent, {
      height: '800px',
      width: '500px',
      panelClass: 'addTaskNotesModal',
      data: { taskId: this.selectedTaskId, dragPosition: this.dragPosition },
      disableClose: true,
    });

    this.subs.push(
      dialogRef
        .afterClosed()
        .pipe(filter((addTaskNoteResult) => !!addTaskNoteResult))
        .subscribe((addTaskNoteResult) => {
          if (addTaskNoteResult.saveSuccessful) {
            this.getGridData();
          }
        })
    );
  }

  openUploadFilesPopup(e): void {
    const selectedTabIndex = 3; // upload files tab
    this.showTaskInfoModal(
      e.data.ProjectMilestoneID,
      e.data.ProjectMilestoneParentID,
      e.data.ProjectMilestoneStep,
      e.data.IndexOrder,
      e.data.TaskSubTasksCount,
      selectedTabIndex
    );
  }

  displayTaskDetail(e) {
    if (
      e.rowType == 'data' &&
      (e.column.dataField == 'ProjectMilestoneName' ||
        e.column.dataField == 'Approvers' ||
        e.column.dataField == 'FilesCount' ||
        e.column.dataField == 'NotesCount')
    ) {
      let colName = e.column.dataField;
      const selectedTabIndex =
        colName == 'ProjectMilestoneName'
          ? 0
          : colName == 'Approvers'
          ? 1
          : colName == 'FilesCount'
          ? 3
          : 2;
      this.showTaskInfoModal(
        e.data.ProjectMilestoneID,
        e.data.ProjectMilestoneParentID,
        e.data.ProjectMilestoneStep,
        e.data.IndexOrder,
        e.data.TaskSubTasksCount,
        selectedTabIndex
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

    if (this.userAccessLevel !== 1 && e.column.name == 'selection') {
      if (e.rowType == 'header') {
        this.disableHeaderCheckbox(e);
      } else {
        this.disableCheckboxes([e.data.ProjectMilestoneID]);
      }
    }
  }

  disableHeaderCheckbox(e) {
    let htmlCellElement =
      e.cellElement.length === undefined ? e.cellElement : e.cellElement[0];
    var editor = dxCheckBox.getInstance(
      htmlCellElement.querySelector('.dx-select-checkbox')
    );
    if (editor) {
      editor.option('disabled', true);
    }
    htmlCellElement.style.pointerEvents = 'none';
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
    taskSubTasksCount: number,
    selectedTabIndex: number = 0
  ) {
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
        selectedTabIndex,
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

  excelExportClick() {
    this.subs.push(
      this.currentObject
        .pipe(first())
        .subscribe(({ objectName, objectType }) =>
          new ProjectTaskTreeExportUtility(this.projectTasksGrid).download(
            `${objectType}_${objectName}`
          )
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
      Oids: [this.userAccessLevel],
      InClauses: ['(0)'],
    };

    return this.dashboardService.getGridData(gridDataRequest).pipe(
      map((res: any) => {
        this.isOneTaskShrinkable = false;
        this.isProxyApproverForOneTask = false;

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
            if (task.IsShrinkable === 'Yes') {
              this.isOneTaskShrinkable = true;
            }
            if (task.IsProxyUser === 1) {
              this.isProxyApproverForOneTask = true;
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

            this.originalStartDate = new Date(
              this.projectTaskSettings.startDate
            ).toDateString();
            this.originalStartDate =
              this.originalStartDate === 'Invalid Date'
                ? ''
                : this.originalStartDate;

            this.originalDueDate = new Date(
              this.projectTaskSettings.dueDate
            ).toDateString();
            this.originalDueDate =
              this.originalDueDate === 'Invalid Date'
                ? ''
                : this.originalDueDate;

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

    this.checkDateChangeForUserAlert(e.value, setting);
  }

  private checkDateChangeForUserAlert(
    datePickerNewValue,
    datePickerChangedName: string
  ) {
    let showCanNotChangeBothDatesAlert = false;
    let determineDates = false;
    datePickerNewValue = new Date(datePickerNewValue).toDateString();

    if (datePickerChangedName === 'startDate') {
      if (
        new Date(this.dueDatePicker.value).toDateString() !==
        this.originalDueDate
      ) {
        showCanNotChangeBothDatesAlert = true;
      } else {
        if (
          datePickerNewValue !== '' &&
          datePickerNewValue !== this.originalStartDate
        ) {
          determineDates = true;
        }
      }
    } else {
      if (
        new Date(this.startDatePicker.value).toDateString() !==
        this.originalStartDate
      ) {
        showCanNotChangeBothDatesAlert = true;
      } else {
        if (
          datePickerNewValue !== '' &&
          datePickerNewValue !== this.originalDueDate
        ) {
          determineDates = true;
        }
      }
    }

    if (showCanNotChangeBothDatesAlert) {
      this.dialogService.alert(
        'Information',
        'You cannot change both the Start and Due dates.',
        'Close'
      );

      this.resetDates(datePickerChangedName);

      return;
    }

    if (determineDates) {
      this.determineAutoCalcDates(datePickerNewValue, datePickerChangedName);
    }
  }

  private determineAutoCalcDates(
    datePickerNewValue: string,
    datePickerChangedName: string
  ) {
    let newDate: Date = null;
    let originalDate: Date = null;
    let dateTypeText = null;

    newDate = new Date(datePickerNewValue);

    if (
      datePickerChangedName === 'startDate' &&
      this.originalStartDate !== ''
    ) {
      originalDate = new Date(this.originalStartDate);
      dateTypeText = 'end';
    } else if (
      datePickerChangedName === 'dueDate' &&
      this.originalDueDate !== ''
    ) {
      originalDate = new Date(this.originalDueDate);
      dateTypeText = 'start';
    }

    if (
      this.isOneTaskShrinkable &&
      this.projectTaskSettings.autoCalculate &&
      this.projectTaskSettings.shiftTimeline
    ) {
      const dialogCloseEvent = this.dialogService.confirm(
        'Information',
        `Click OK to allow the ${dateTypeText} date to shift.\r\nClick Cancel to lock the ${dateTypeText} date and shrink the project to the max ${this.projectTaskSettings.shrinkableCount} days.`,
        'OK',
        'Close'
      );

      dialogCloseEvent.subscribe((res) => {
        if (!res) {
          var numdays: number = this.dateDiffByDays(
            originalDate,
            newDate,
            this.projectTaskSettings.calculatedBy
          );
          numdays = numdays < 0 ? Math.abs(numdays) : numdays;
          if (numdays > this.projectTaskSettings.shrinkableCount) {
            this.dialogService.alert(
              'Information',
              `You entered ${numdays} days but only have ${this.projectTaskSettings.shrinkableCount} days available.`,
              'Close'
            );

            this.resetDates(datePickerChangedName);
          }
        }
      });
    }
  }

  private resetDates(datePickerChangedName: string) {
    if (datePickerChangedName === 'startDate') {
      this.projectTaskSettings[datePickerChangedName] = new Date(
        this.originalStartDate
      );
    } else {
      this.projectTaskSettings[datePickerChangedName] = new Date(
        this.originalDueDate
      );
    }
  }

  private dateDiffByDays(
    startDate: Date,
    endDate: Date,
    excludeWeekEnds: boolean
  ): number {
    var count = 0;
    var target = new Date(
      Math.min(new Date(startDate).getTime(), new Date(endDate).getTime())
    );
    var end = new Date(
      Math.max(new Date(startDate).getTime(), new Date(endDate).getTime())
    );
    while (target < end) {
      if (!excludeWeekEnds) {
        count++;
      } else {
        let targetDay = target.getDay();

        if (0 < targetDay && targetDay < 6) count++;
      }

      target.setDate(target.getDate() + 1);
    }

    return count;
  }

  projSettingToggleChanged(e, setting) {
    this.taskSettingsChangesMade = true;
    this.projectTaskSettings[setting] = e.checked;
    // this.determineTogglesInfoText();
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
      this.startDatePicker.focusDatePicker();
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
            this.getNotesRequiredFlag();
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

  handleCopyTransactionFormChanged(hasChanges: boolean) {
    this.ctApplyButtonText = hasChanges ? 'Copy' : null;
    this.ctSaveButtonText = hasChanges ? null : 'Go';
  }

  handleCopyCompleted({ newProjectId }) {
    this.newProjectId = newProjectId;
    this.ctSaveButtonText = !!newProjectId ? 'Go' : null;
    this.ctApplyButtonText = !!newProjectId ? null : 'Copy';
    this.copyTransactionComponent.resetPopup();
  }

  navigateToNewProject(oid: number) {
    this.route.queryParams.pipe(first()).subscribe((params) => {
      const updatedParams = { ...params, oid };
      this.copyTransactionPopup.close.emit(true);
      const urlTree = this.router.createUrlTree([], {
        relativeTo: this.route,
        queryParams: updatedParams,
        queryParamsHandling: 'merge',
      });

      const newUrl = this.router.serializeUrl(urlTree);
      window.location.href = newUrl; // This will reload the whole page
    });
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
    if (this.isNotesFieldRequired) {
      this.quickApprovalFooterText = QUICK_APPROVAL_FOOTER_TEXT;
    }
    this.approveButtonText = APPROVE_BUTTON_TEXT;
    this.showQuickApprovalPopup = !this.showQuickApprovalPopup;
  }

  setApproveButtonText(count: number): void {
    if (count !== 0) {
      this.approveButtonText = `${APPROVE_BUTTON_TEXT} (${count})`;
      this.quickApprovalApproveDisabled = false;
    } else {
      this.approveButtonText = APPROVE_BUTTON_TEXT;
      this.quickApprovalApproveDisabled = true;
    }
  }

  onApproveTasksClick(): void {
    this.quickApprovalComponent.approveTasks();
  }

  refreshTasksGrid(): void {
    this.getGridData();
  }

  onSaveTasksClick(): void {
    this.quickApprovalComponent.saveChanges();
  }

  handleQuickApprovalHasChanges(hasChanges: boolean) {
    this.saveButtonText = hasChanges ? 'Apply' : null;
  }

  onQuickApprovalClose(): void {
    this.showQuickApprovalPopup = !this.showQuickApprovalPopup;
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

  approveOrRejectTask(taskData, action) {
    if (action != 'Approve' && action != 'Reject') {
      return;
    } else if (
      action == 'Approve' &&
      (taskData.ApprovalPredecessors ||
        taskData.ApprovalSubTasks ||
        taskData.UserApprovalStatus.trim() ==
          this.taskUserApprovalStatus.APPROVED ||
        taskData.UserApprovalStatus.trim() ==
          this.taskUserApprovalStatus.COMPLETED ||
        taskData.UserApprovalStatus.trim() ==
          this.taskUserApprovalStatus.NOT_ASSIGNED)
    ) {
      return;
    } else if (
      action == 'Reject' &&
      (taskData.UserApprovalStatus.trim() ==
        this.taskUserApprovalStatus.NOT_ASSIGNED ||
        taskData.UserApprovalStatus.trim() ==
          this.taskUserApprovalStatus.APPROVE)
    ) {
      return;
    }

    let popupHeight = action == 'Approve' ? '340px' : '220px';
    let dialogRef = this.dialog.open(TaskApproveOrRejectComponent, {
      height: popupHeight,
      width: '600px',
      panelClass: 'taskApprovalOrRejectModal',
      data: {
        taskData: taskData,
        action: action,
        dateFormat: this.dateFormat,
        notesRequired: this.isNotesFieldRequired,
      },
      disableClose: true,
    });
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

  getApprovalBtnTitleText(approvalPredecessors, approvalSubTasks) {
    if (approvalPredecessors && approvalSubTasks) {
      return `Tasks ${approvalPredecessors}, ${approvalSubTasks} ${this.approvalBtnTitle}`;
    } else if (approvalPredecessors) {
      return `Predecessor(s) ${approvalPredecessors} ${this.approvalBtnTitle}`;
    } else if (approvalSubTasks) {
      return `Subtask(s) ${approvalSubTasks} ${this.approvalBtnTitle}`;
    } else {
      return '';
    }
  }

  checkUserLevelRequirement(requiredLevels: Array<number>): boolean {
    if (!requiredLevels) {
      return false;
    }
    return requiredLevels.indexOf(this.userAccessLevel) === -1;
  }

  adaAttr() {
    const headerCheckbox = this.projectTasksGrid.instance
      .element()
      .querySelector('.selectTask.dx-cell-focus-disabled');
    if (headerCheckbox) {
      headerCheckbox.removeAttribute('aria-sort');
    }
  }

  adaAttrTreeList(e: any) {
    const dxTreeListithTables = e.component
      .$element()
      .find('.dx-treelist-headers.dx-bordered-top-view');
    if (dxTreeListithTables && dxTreeListithTables.length > 0) {
      for (let i = 0; i < dxTreeListithTables.length; i++) {
        const element = dxTreeListithTables[i];
        if (element) {
          element.setAttribute('role', 'grid');
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
