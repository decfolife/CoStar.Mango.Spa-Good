import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  MemberInfo,
  TeamKeys,
  TeamMemUpdate,
  TeamMember,
  ToastState,
} from '@mango/data-models/lib-data-models';
import { DxDataGridComponent } from 'devextreme-angular';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import CheckBox from 'devextreme/ui/check_box';
import { filter, switchMap, tap } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';
import { MangoDialogService } from 'libs/core-shared/src/lib/services/mango-dialog.service';
import { ToastrService } from 'ngx-toastr';
import { MatMenuTrigger } from '@angular/material/menu';
import dxSelectBox from 'devextreme/ui/select_box';
import { CremToastService } from '@mango/ui-shared/lib-ui-elements';

@Component({
  selector: 'team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss'],
})
export class TeamMembersComponent implements OnInit, OnDestroy, OnChanges {
  @Input() teamMembers: TeamMember[];
  @Input() searchText: string;
  @Input() rights: string;
  @Input() userModuleAddRights: boolean;
  @Input() projectsPrivateSetting: boolean;
  @Input() memberInfo: MemberInfo;
  @Input() teamMemberCount: number;
  @Output() selectedMembersEvent: EventEmitter<any> = new EventEmitter();
  @Output() unSelectedMembersEvent: EventEmitter<any> = new EventEmitter();
  @Output() selectedTeamandMembersEvent: EventEmitter<any> = new EventEmitter();
  @Output() getLatestTeamsDataEvent: EventEmitter<any> = new EventEmitter();
  @Output() saveCompleted: EventEmitter<{ memberId: number; teamId: number }> =
    new EventEmitter();
  @Output() subGridEditClickedEvent: EventEmitter<any> = new EventEmitter();

  public dataRetrieved: boolean = false;
  memberIds: number[];
  memberUpdate: TeamMemUpdate;
  emailNotify: boolean;
  shareValue: boolean;
  accessLevelValue: number;
  memberId: number;
  showShareColumn = false;
  selectedTeamandMembersData: TeamKeys = <TeamKeys>{};
  subs: Subscription[] = [];
  teamMemberInfo: string = `This team member is either no longer active or has Allow Log On set to No. 
														Please consider replacing this team member or updating their User record.`;

  @ViewChild('TeamMembersGrid') teamMembersGrid: DxDataGridComponent;
  @ViewChild('teamActionsMenuTrigger') actionsMenuTrigger: MatMenuTrigger;

  constructor(
    private dashboardService: DashboardService,
    private toastService: CremToastService,
    private dialogService: MangoDialogService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      !!changes.projectsPrivateSetting &&
      changes.projectsPrivateSetting.currentValue > 0
    ) {
      this.showShareColumn = changes.projectsPrivateSetting.currentValue <= 2;
    }
  }

  matMenuButtonKeyDown(e) {
    if (e.key === 'Tab' || (e.key === 'Tab' && e.shiftKey)) {
      if (e.currentTarget.nextElementSibling !== null) {
        e.stopPropagation();
      } else {
        e.preventDefault();
        this.actionsMenuTrigger.closeMenu();
      }
    }
  }

  onEditorPreparing(e) {
    if (e.parentType === 'dataRow' && e.dataField === 'level') {
      e.editorOptions.dataSource = {
        store: {
          type: 'array',
          data: this.memberInfo.levels,
        },
        postProcess: function (data) {
          let newData = data.map((level) => {
            if (level.value == 99) {
              level.visible = false;
            }

            return level;
          });
          return newData;
        },
      };
    }

    if (e.dataField === 'role') {
      e.editorOptions.onOpened = (args: any) => {
        const overlayWrapper = document.querySelector('.dx-overlay-wrapper');
        if (overlayWrapper) {
          overlayWrapper.classList.add('aetRoleCustomClass');
        }
      };
    }
  }

  editRow(memberData: any) {
    this.emailNotify = memberData.data.emailOn;
    this.shareValue = memberData.data.share;
    this.accessLevelValue = memberData.data.level;
    this.memberId = memberData.data.memberId;
    this.teamMembersGrid.instance.cancelEditData();
    this.resetEditMode();
    this.teamMembersGrid.instance.editRow(memberData.rowIndex);
    memberData.data.editMode = true;

    this.subGridEditClickedEvent.emit({
      memberData,
      membersGrid: this.teamMembersGrid,
      emailNotify: this.emailNotify,
      shareValue: this.shareValue,
      accessLevelValue: this.accessLevelValue,
    });
  }

  saveMemberChanges(e: any, member: TeamMember) {
    this.memberUpdate = {
      teamId: member.teamId,
      contactId: member.contactId,
      emailOn: member.emailOn,
      role: member.role,
      level: member.level,
      share: member.share,
    };

    this.subs.push(
      this.dashboardService
        .updateTeamMember(this.memberUpdate)
        .subscribe((res: any) => {
          if (res.success) {
            this.teamMembersGrid.instance.saveEditData();
          } else {
            let message = `Team Member could not be updated. Please review and try again later.`;
            this.subs.push(
              this.dialogService
                .alert('Update Member', message, 'OK')
                .subscribe()
            );
            this.teamMembersGrid.instance.cancelEditData();
          }
          member.editMode = false;
          this.resetEditMode();

          const { memberId, teamId } = member;
          this.saveCompleted.emit({ memberId, teamId });
        })
    );
  }

  removeTeamMember(member: TeamMember) {
    this.memberIds = [];
    this.memberIds.push(member.memberId);

    if (this.teamMemberCount == 1) {
      let message =
        'Team Member Removal can not be done. At least one team member must be assigned to the team.';
      this.subs.push(
        this.dialogService
          .alert('Team Member Removal', message, 'OK')
          .subscribe()
      );
    } else {
      let confirmText = `Do you want to Remove the member "${member.name}" ?`;
      this.subs.push(
        this.dialogService
          .confirm('Remove Team Member', confirmText, 'Confirm', 'Cancel')
          .pipe(
            filter((confirmed) => !!confirmed),
            switchMap((_) =>
              this.dashboardService.deleteTeamMembers(this.memberIds)
            ),
            tap((res) => {
              if (res && res.success) {
                this.memberIds = [];
                this.getLatestTeamsDataEvent.emit();
                this.toastService.show(
                  'Selected Member(s) successfully removed.',
                  'Success',
                  ToastState.SUCCESS
                );
              } else {
                this.dialogService.alert(
                  'Removal unsuccessful!',
                  'Team Member could not be deleted. Please review and try again later.',
                  'OK'
                );
              }
            })
          )
          .subscribe()
      );
    }
  }

  onSelectionChanged(e: any) {
    if (e.currentSelectedRowKeys.length) {
      this.selectedMembersEvent.emit(e.currentSelectedRowKeys);
      if (this.selectedTeamandMembersData.teamId) {
        this.selectedTeamandMembersData.memberIds =
          this.selectedTeamandMembersData.memberIds.concat(
            e.currentSelectedRowKeys
          );
      } else {
        this.selectedTeamandMembersData.teamId = e.selectedRowsData[0].teamId;
        this.selectedTeamandMembersData.memberIds = e.currentSelectedRowKeys;
      }
    }

    if (e.currentDeselectedRowKeys.length) {
      this.unSelectedMembersEvent.emit(e.currentDeselectedRowKeys);
      this.selectedTeamandMembersData.memberIds =
        this.selectedTeamandMembersData.memberIds.filter(
          (item) => !e.currentDeselectedRowKeys.includes(item)
        );
    }
    this.selectedTeamandMembersEvent.emit(this.selectedTeamandMembersData);
  }

  setRoleValue(newData, value: string, currentRowData) {
    (this as any).defaultSetCellValue(newData, value);
  }

  setLevelValue(newData, value, currentRowData) {
    // user is not allowed to change the level of a team member TO N/A
    if (value === 99) return; // 99 == 'N/A'
    newData.level = value;
  }

  emailtoggle(e, member) {
    member.emailOn = e.checked;
    this.teamMembers.map(
      (teamMember) =>
        (teamMember.emailOn =
          teamMember.memberId == member.memberId
            ? e.checked
            : teamMember.emailOn)
    );
  }

  sharedtoggle(e, member) {
    member.share = e.checked;
    this.teamMembers.map(
      (teamMember) =>
        (teamMember.share =
          teamMember.memberId == member.memberId ? e.checked : teamMember.share)
    );
  }

  cancelChanges(member) {
    member.editMode = false;
    this.teamMembersGrid.instance.cancelEditData();
    this.resetEditMode(true);
  }

  getShareDisplayValue(rowData) {
    return rowData.share ? 'On' : 'Off';
  }

  getEmailonDisplayValue(rowData) {
    return rowData.emailOn ? 'On' : 'Off';
  }

  resetEditMode(isCancel?: boolean) {
    this.teamMembers.forEach((teamMember) => {
      teamMember.editMode = false;
      if (isCancel && teamMember.memberId == this.memberId) {
        teamMember.emailOn = this.emailNotify;
        teamMember.share = this.shareValue;
        teamMember.level = this.accessLevelValue;
      }
    });
  }

  onKeyDown(event) {
    if (event.event.keyCode === 13 || event.event.keyCode === 32)
      event.handled = true;

    if (event.event.key === 'Enter' || event.event.key === ' ') {
      const gridInstance = this.teamMembersGrid.instance;
      const focusedColumn = gridInstance.option('focusedColumnIndex');
      const focusedIndex = gridInstance.option('focusedRowIndex');
      if (focusedColumn !== undefined && focusedIndex !== -1) {
        const datafield =
          gridInstance.getVisibleColumns()[focusedColumn]?.dataField;
        if (datafield === 'role' || datafield === 'level') {
          const srcElement = gridInstance.getCellElement(
            focusedIndex,
            datafield
          );
          if (srcElement) {
            const selectBoxInstance = dxSelectBox.getInstance(
              srcElement.querySelector('.dx-selectbox')
            ) as dxSelectBox;
            if (selectBoxInstance) {
              const isOpened = selectBoxInstance.option('opened');
              isOpened ? selectBoxInstance.close() : selectBoxInstance.open();
              selectBoxInstance.focus();
              event.event.preventDefault();
            }
          }
        }
      }
    }
  }
  gridOnCellPrepared(e) {
    if (
      e.column.command == 'select' &&
      (!this.userModuleAddRights ||
        this.rights.toLocaleLowerCase().trim() == 'view')
    ) {
      let htmlCellElement =
        e.cellElement.length === undefined ? e.cellElement : e.cellElement[0];
      var editor = CheckBox.getInstance(
        htmlCellElement.querySelector('.dx-select-checkbox')
      );
      if (editor) {
        e.rowType == 'header'
          ? editor.option('disabled', true)
          : editor.option('visible', false);
      }
      htmlCellElement.style.pointerEvents = 'none';
    }
  }

  setAttributes(e) {
    setTimeout(() => {
      const inputElements = Array.from(
        document.getElementsByClassName('dx-texteditor-input')
      );
      inputElements?.forEach((ele) => {
        ele.setAttribute('aria-label', 'select option');
        ele.setAttribute('name', 'selectionOption');
      });
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
