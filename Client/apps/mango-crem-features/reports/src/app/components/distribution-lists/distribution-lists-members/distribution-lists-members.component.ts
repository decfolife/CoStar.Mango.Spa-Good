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
  DistributionListKeys,
  DistributionListMember,
} from '@mango/data-models/lib-data-models';
import { DxDataGridComponent } from 'devextreme-angular';
import CheckBox from 'devextreme/ui/check_box';
import { filter, switchMap } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatMenuTrigger } from '@angular/material/menu';
import dxSelectBox from 'devextreme/ui/select_box';
import { DistributionListsService } from '../distribution-lists.service';
import { MangoDialogService } from '@mango/core-shared';

@Component({
  selector: 'distribution-lists-members',
  templateUrl: './distribution-lists-members.component.html',
  styleUrls: ['./distribution-lists-members.component.scss'],
})
export class DistributionListsMembersComponent {
  @Input() members: any[];
  @Input() searchText: string;
  @Input() rights: string;
  @Input() userModuleAddRights: boolean;
  @Input() memberCount: number;
  @Output() selectedMembersEvent: EventEmitter<any> = new EventEmitter();
  @Output() unSelectedMembersEvent: EventEmitter<any> = new EventEmitter();
  @Output() selectedDistributionListAndMembersEvent: EventEmitter<any> =
    new EventEmitter();
  @Output() getLatestDistributionListDataEvent: EventEmitter<any> =
    new EventEmitter();

  public dataRetrieved: boolean = false;
  memberIds: number[];
  emailNotify: boolean;
  shareValue: boolean;
  accessLevelValue: string;
  memberId: number;
  selectedListAndMembersData: DistributionListKeys = <DistributionListKeys>{};
  subs: Subscription[] = [];
  listMemberInfo: string = `This distribution list member is either no longer active or has Allow Log On set to No. 
														Please consider replacing this distribution list member or updating their User record.`;

  @ViewChild('DistributionListsMembersGrid')
  distributionListsMembersGrid: DxDataGridComponent;
  @ViewChild('distributionListMemberActionsMenuTrigger')
  actionsMenuTrigger: MatMenuTrigger;

  constructor(
    private distributionListsService: DistributionListsService,
    public toastr: ToastrService,
    private dialogService: MangoDialogService
  ) {}

  ngOnInit() {}

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

  removeDistributionListsMember(member: DistributionListMember) {
    this.memberIds = [];
    this.memberIds.push(member.memberID);

    if (this.memberCount == 1) {
      let message =
        'Distribution List Member Removal can not be done. At least one distribution list member must be assigned to the distribution list.';
      this.subs.push(
        this.dialogService
          .alert('Distribution List Member Removal', message, 'OK')
          .subscribe()
      );
    } else {
      let confirmText = `Do you want to Remove the member "${member.name}" ?`;
      this.subs.push(
        this.dialogService
          .confirm(
            'Remove Distribution List Member',
            confirmText,
            'Confirm',
            'Cancel'
          )
          .pipe(
            filter((confirmed) => !!confirmed),
            switchMap((_) =>
              this.distributionListsService.deleteMembers(this.memberIds)
            ),
            switchMap((res) => {
              if (res.success) {
                this.memberIds = [];
                this.getLatestDistributionListDataEvent.emit();
              }
              return res.success
                ? of(
                    this.distributionListsService.successNotify(
                      'Selected Member(s) successfully removed.'
                    )
                  )
                : this.dialogService.alert(
                    'Removal unsuccessful!',
                    'Distribution List Member could not be deleted. Please review and try again later.',
                    'OK'
                  );
            })
          )
          .subscribe()
      );
    }
  }

  onSelectionChanged(e: any) {
    if (e.currentSelectedRowKeys.length) {
      this.selectedMembersEvent.emit(e.currentSelectedRowKeys);
      if (this.selectedListAndMembersData.groupID) {
        this.selectedListAndMembersData.memberIds =
          this.selectedListAndMembersData.memberIds.concat(
            e.currentSelectedRowKeys
          );
      } else {
        this.selectedListAndMembersData.groupID = e.selectedRowsData[0].groupID;
        this.selectedListAndMembersData.memberIds = e.currentSelectedRowKeys;
      }
    }

    if (e.currentDeselectedRowKeys.length) {
      this.unSelectedMembersEvent.emit(e.currentDeselectedRowKeys);
      this.selectedListAndMembersData.memberIds =
        this.selectedListAndMembersData.memberIds.filter(
          (item) => !e.currentDeselectedRowKeys.includes(item)
        );
    }
    this.selectedDistributionListAndMembersEvent.emit(
      this.selectedListAndMembersData
    );
  }

  setRoleValue(newData, value: string, currentRowData) {
    (this as any).defaultSetCellValue(newData, value);
  }

  setLevelValue(newData, value: string, currentRowData) {
    newData.level = value;
  }

  onKeyDown(event) {
    if (event.event.keyCode == 13 || event.event.keyCode == 32)
      event.handled = true;

    if (event.event.key === 'Enter' || event.event.key === ' ') {
      const gridInstance = this.distributionListsMembersGrid.instance;
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
            }
          }
          event.event.preventDefault();
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
