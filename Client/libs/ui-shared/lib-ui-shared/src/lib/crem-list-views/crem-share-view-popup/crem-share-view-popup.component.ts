import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DxDataGridComponent, DxPopupComponent } from 'devextreme-angular';

import { off, on } from 'devextreme/events';
import ArrayStore from "devextreme/data/array_store";
import { ListView } from '@list-pages/components/listpage/shared/models/list-view';
import { SecurityType } from '@list-pages/components/listpage/shared/enums';
import { CremShareViewPopupService } from 'libs/core-shared/src/lib/services/list-page-services/crem-share-view-popup.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'crem-share-view-popup',
  templateUrl: './crem-share-view-popup.component.html',
  styleUrls: ['./crem-share-view-popup.component.scss']
})
export class CremShareViewPopupComponent {
  private _listView: ListView;

  private rowToEditData: any

  @Input() isSuperUser = false;

  @Input()
  set listView(value: ListView) {
    this._listView = value;

    if (value) {
      this.sharingData = [];
      this.usersAndGroups = [];

      this.loadGridData();
    }
  }
  get listView() {
    return this._listView;
  }

  @Output() closing = new EventEmitter<null>();
  @Output() deleteClicked = new EventEmitter<null>();

  @ViewChild('rightsPopup') rightsPopup: DxPopupComponent;
  @ViewChild('rightsGrid') rightsGrid: DxDataGridComponent;

  get title() {
    return this.isDeleteConfirm
      ? `Delete Confirmation - ${this.listView?.name}`
      : `Share List View - ${this.listView?.name}`;
  }

  sharingData: any[];
  usersAndGroups: any[];

  isDeleteConfirm = false;
  hasDuplicates = false;
  popupVisible = false;
  allowEdit = false;
  allowDelete = false;
  hasChanges = false;
  hadChanges = false;

  entityTypeLookup = [
    { value: 0, text: 'User' },
    { value: 1, text: 'Group' },
  ];

  gridNamesLookup = [];

  rightsTypeLookup = [
    { value: SecurityType.View, text: 'View' },
    { value: SecurityType.Edit, text: 'Edit' },
    { value: SecurityType.Delete, text: 'Delete' },
  ];

  unSavedChangesPopupOptions = {
    popupVisible: false,
    popupMessage: 'You have unsaved changes. Are you sure you want to close without saving?',
    popupTitle: 'Unsaved Changes',
    cancelButtonOptions: {
      onClick: () => { this.unsavedChangesPopupOnCancelClicked(); },
      text: "Cancel"
    },
    actionButtonOptions: {
      onClick : () => { this.unsavedChangesPopupOnOKClicked(); },
      text: "OK"
    },
    dragEnabled: false,
    width: '450',
    isFormatted: false,
  };

  // These functions need to be fat-arrow functions to maintain proper "this" context

  cancelButtonClicked = () => {
    this.hadChanges = this.hasChanges;
    this.hasChanges = false;

    this.rightsPopup.instance.hide().then(_ => { this.closing.next(); });
  };

  deleteButtonClicked = () => {
    this.hasChanges = false;

    this.rightsPopup.instance.hide().then(() => {
      this.deleteClicked.next();
    });
  };

  undoButtonClicked = () => {
    this.hasChanges = false;
    this.hasDuplicates = false;

    this.rightsGrid.instance.cancelEditData();
  };

  applyButtonClicked = () => {
    const duplicateRows = this.getDuplicateRowIndexes();
    
    if (duplicateRows.length > 1)
    {
        this.hasDuplicates = true;
  
        setTimeout(() => {
          duplicateRows.forEach(x => {    
            (this.rightsGrid.instance.getRowElement(x)[0] as HTMLTableRowElement).classList.add('highlight');
          }) 
        }, 10);  
    }
    else {
      this.hasChanges = false;
      this.rightsGrid.instance.saveEditData();
    }
  };

  getDuplicateRowIndexes = () => {
    const deletedRowsHtmlElements : any =  Array.from(document.getElementsByClassName('dx-row-removed'));

    // Compare all the visible rows except rows marked as deleted to find duplicate rows based on sharedWithEntityType and sharedWithEntityId
    var comparedRows  = this.rightsGrid.instance.getVisibleRows().filter(function(v){
      return deletedRowsHtmlElements.filter(function(d){
          return (d as HTMLTableRowElement).rowIndex === v.rowIndex;
      }).length == 0
    });

    const complaredRows = comparedRows.map((x) => {return { rowIndex: x.rowIndex, compareString: JSON.stringify({sharedWithEntityType: x.data.sharedWithEntityType ?? '', sharedWithEntityId: x.data.sharedWithEntityId ?? ''})}});

    const compareStrings = complaredRows
      .map(x => x['compareString'])
      .map((x, i, final) => final.indexOf(x) !== i && i)
      .filter(y => complaredRows[y])
      .map(x => complaredRows[x]["compareString"]);

    return complaredRows.filter(x => compareStrings.includes(x.compareString)).map(y => y.rowIndex);
  };

  saveButtonClicked = (e: Event) => {
    this.applyButtonClicked();
    this.cancelButtonClicked();
  };

  editCanceled = () => {
    this.resetEditing();
  };

  getUsersOrGroups = (options: any) => {
    return {
      store: new ArrayStore({
        data: this.usersAndGroups,
        key: "sharedWithEntityId"
      }),
      filter: (item: any) => {
        if (item.sharedWithEntityType === options?.data.sharedWithEntityType) {
          const found = this.sharingData
            .find(x => x.sharedWithEntityId === item.sharedWithEntityId)

          if (found && !options?.isEditing) {
            return false;
          }

          return true;
        }

        return false;
      },
      paginate: true,
      pageSize: 100
    };
  };

  getRightsTypes = () => {
    return {
      store: this.rightsTypeLookup,

      filter: (item: any) => {
        const canAssignDelete = this.allowDelete &&
          this.listView.securityType >= SecurityType.Delete;

        if (item.text === 'Delete' && !canAssignDelete) {
          return false;
        }

        return true;
      },
    }
  };

  allowDeleting = (event: any) => {
    if (!this.allowDelete || this.isDeleteConfirm) {
      return false;
    }

    if (event.row.data.securityType > this.listView.securityType) {
      return false;
    }

    return !event.row.data.isOwner;
  };

  // *****

  constructor(private service: CremShareViewPopupService) {
    this.sharingData = [];
    this.usersAndGroups = [];
    this.onEditDropdownInitialized = this.onEditDropdownInitialized.bind(this)
  }

  toolbarPreparing(event: any) {
    event.toolbarOptions.items = this.allowEdit
      ? [{
        location: 'after',
        name: 'addButton',
        cssClass: 'custom-add',
        options: {
          text: 'Add',
          onClick: () => { this.rightsGrid.instance.addRow(); }         
        },
        widget: 'dxButton'
      }]
      : [];
  }

  cellPrepared(event: any) {
    if (event.rowType !== 'data' || event.column.command !== 'edit') {
      return;
    }
    
    const deleteLink =  typeof event.cellElement.querySelector !== "undefined" 
      ? event.cellElement.querySelector('.dx-link-delete')
      : (event.cellElement.find('.dx-link-delete') || [null])[0]
    
    if (deleteLink) {
      deleteLink.addEventListener("click", (event: any) => {
        this.hasChanges = true;

        const duplicateRows = this.getDuplicateRowIndexes().filter(x => x !== event.srcElement.closest("tr").rowIndex);
        
        if (duplicateRows.length > 1)
        {
          this.hasDuplicates = true;
          duplicateRows.forEach(x => {    
            (this.rightsGrid.instance.getRowElement(x)[0] as HTMLTableRowElement).classList.add('highlight');
          })      
        }
        else {
          this.hasDuplicates = false;
          duplicateRows.forEach(x => {    
            (this.rightsGrid.instance.getRowElement(x)[0] as HTMLTableRowElement).classList.remove('highlight');
          }) 
        }
      })
    }
  }

  editingStart(event: any) {
    this.hasChanges = true;
    
    this.rowToEditData = event.data

    if (event.data.isOwner) {
      event.cancel = true;
    }

    if (event.data.securityType > this.listView.securityType) {
      event.cancel = true;
    }
  }

  editorPreparing(event: any) {
    if (event.caption === 'Type') {
      return;
    }

    const typeValue = event.component.cellValue(event.row.rowIndex, 'Type');

    event.editorOptions.disabled = typeValue === undefined;
  }

  setTypeValue(rowData: any, value: any) {
    rowData.sharedWithName = null;
    rowData.sharedWithEntityId = null;
    rowData.securityType = null;
    rowData.rightsDisplayName = null;

    (this as any).defaultSetCellValue(rowData, value);
  }

  addSharing(event: any) {
    const data = this.formatSharingData(event.data);

    this.service.createSharedUserViewRights(data)
      .subscribe(() => { this.reloadGrid(); });
  }

  updateSharing(event: any) {
    const formatted = Object.assign({}, event.oldData);
    const data = Object.assign(formatted, event.newData);

    this.rightsGrid.instance.beginCustomLoading('Loading...');
    this.rightsGrid.disabled = true
    this.service.deleteSharedUserViewRights(event.key).subscribe(() => {
      this.service.createSharedUserViewRights(data)
        .subscribe(() => { this.reloadGrid(); });
    });
  }

  removeSharing(event: any) {
    this.service.deleteSharedUserViewRights(event.data)
      .subscribe(() => { this.reloadGrid(); });
  }

  reloadGrid() {
    this.loadGridData();
    this.resetEditing(); 
  }

  loadGridData() {
    this.rightsGrid.instance.beginCustomLoading('Loading...');
    this.rightsGrid.disabled = true
    this.hasDuplicates = false;
    
    this.service.getSharedUserViewRights(this.listView.id)
      .subscribe(res => {
        this.processViewRights(res)
        this.loadUsersAndGroups();
      });

  }

  loadUsersAndGroups() {
    this.service.getSharedUserViews(this.listView.id)
      .subscribe(response => {
        const sharedUserViews = response.data.sharedUserViews
        this.usersAndGroups = sharedUserViews.sort((a, b) => a?.sharedWithName?.toLowerCase() > b?.sharedWithName?.toLowerCase() ? 1 : -1);

        this.checkRights();
        this.rightsGrid.instance.endCustomLoading();
        this.rightsGrid.disabled = false
      });
  }

  showPopup(isDeleteConfirm = false) {
    this.isDeleteConfirm = isDeleteConfirm;

    this.checkRights();

    this.popupVisible = true;
  }

  hidePopup(event: any) {
    if (!this.rightsGrid.instance.hasEditData()) {
      this.closing.next()
      return;
    }

    event.cancel = true;

    this.unSavedChangesPopupOptions.popupVisible = true;
  }

  unsavedChangesPopupOnCancelClicked(){
    this.hasChanges = this.hadChanges;
    this.unSavedChangesPopupOptions.popupVisible = false;
  }

  unsavedChangesPopupOnOKClicked() {
    this.rightsGrid.instance.cancelEditData();
    this.closing.next();

    this.unSavedChangesPopupOptions.popupVisible = false;
    this.popupVisible = false;
    this.sharingData = [];
  }

  private checkRights() {
    this.allowDelete = !this.isDeleteConfirm &&
      this.listView?.securityType === SecurityType.Delete;

    this.allowEdit = !this.isDeleteConfirm &&
      (this.listView?.securityType === SecurityType.Edit ||
        this.listView?.securityType === SecurityType.Delete);
  }

  private resetEditing() {
    this.service.getSharedUserViewRights(this.listView.id)
      .subscribe(res => this.processViewRights(res));
  }

  private processViewRights(res: any) {
    this.sharingData = res.success
      ? res.data.sharedUserViewRights
      : [];

    this.sharingData.find(x => x.isOwner).sharedWithName += ' (Owner)';

    this.sharingData.forEach(x => {
      x.rightsDisplayName = SecurityType[x.securityType];

      x.typeDisplayName = this.entityTypeLookup
        .find(y => y.value === x.sharedWithEntityType).text;
    });

    this.sharingData.sort((a, b) => {
      return a.isOwner
        ? -1
        : b.isOwner
          ? 1
          : 0;
    });

    this.gridNamesLookup = this.sharingData.map(x => {
      return {
        value: x.sharedWithEntityId,
        text: x.sharedWithName
      };
    });
    this.rightsGrid.instance.repaint()
  }

  private formatSharingData(data: any) {
    let newData = Object.assign({}, data);

    delete newData.__KEY__;

    newData.userListViewId = this.listView.id;

    newData.sharedWithName = this.usersAndGroups
      .find(x => x.sharedWithEntityId === newData.sharedWithEntityId)
      .sharedWithName;

    return newData;
  }

  onEditDropdownInitialized(event) {
    const dataSource = event.component.getDataSource()
    const store = dataSource.store()
    this.sharingData.forEach(item => {
      store.update(item.sharedWithEntityId, {...item, disabled: true}).done(_ => { dataSource.reload()}).fail(console.log)
    })
  }
}
