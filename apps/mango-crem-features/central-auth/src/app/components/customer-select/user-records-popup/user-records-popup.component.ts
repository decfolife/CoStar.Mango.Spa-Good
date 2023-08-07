import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ContactRecord, ContactRecordSelection } from '@mango/data-models/lib-data-models';
import { DxCheckBoxComponent, DxDataGridComponent, DxPopupComponent } from 'devextreme-angular';

@Component({
  selector: 'mango-user-records-popup',
  templateUrl: './user-records-popup.component.html',
  styleUrls: ['./user-records-popup.component.scss']
})
export class UserRecordsPopupComponent {
  @Input() selectedClientKey: string = null
  @Input() contactRecords: ContactRecord[] = []
  @Input() defaultContactRecordID: number = null
  @Output() onSubmit: EventEmitter<ContactRecordSelection> = new EventEmitter<ContactRecordSelection>()

  @ViewChildren(DxCheckBoxComponent) defaultCheckboxes: QueryList<DxCheckBoxComponent>
  @ViewChild(DxPopupComponent) popupComponent: DxPopupComponent
  @ViewChild(DxDataGridComponent) dataGridComponent: DxDataGridComponent

  selectedContactRecord: ContactRecord
  selectedDefaultContactRecord: ContactRecord
  ongoingDefaultSelectionMutex: boolean = false

  constructor() {
    this.onContactRecordSubmit = this.onContactRecordSubmit.bind(this)
    this.onCancelClick = this.onCancelClick.bind(this)
  }

  onSelectionChanged(event) {
    const selectedRow = (event.selectedRowsData || [null])[0]
    if (!this.ongoingDefaultSelectionMutex) {
      this.selectedContactRecord = selectedRow
    }
  }

  onDefaultCheckboxValueChanged(event, data) {
    const checkboxesList = this.generateParsedCheckboxesList()
    if (event.value == true) {
      checkboxesList.filter(c => c.name != data.contactID).forEach(checkbox => {
        checkbox.value = false
      })
    }
    const checkedCheckbox = checkboxesList.find(checkbox => checkbox.value === true)
    this.selectedDefaultContactRecord = checkedCheckbox ? this.contactRecords.find(c => c.contactID === Number.parseInt(checkedCheckbox.name)) : null
  }

  onCellClick(event) {
    const { columnIndex } = event
    if (columnIndex === 4) {
      this.ongoingDefaultSelectionMutex = true
      const previouslySelectedRow = this.selectedContactRecord
      event.component.deselectAll()
      event.component.deselectRows([0, ...this.contactRecords.map(c => c.contactID)]).then(_ => this.ongoingDefaultSelectionMutex = false)
      if (previouslySelectedRow) {
        event.component.selectRows([previouslySelectedRow.contactID], true)
      }
    }
  }

  generateParsedCheckboxesList(): DxCheckBoxComponent[] {
    const checkboxesHashMap = {}
    this.defaultCheckboxes.forEach(checkbox => {
      checkboxesHashMap[checkbox.name] = checkbox
    })
    return Object.values(checkboxesHashMap)
  }

  onContactRecordSubmit() {
    const isDefaultChanged = !!this.selectedDefaultContactRecord
    this.onSubmit.emit({ contactRecord: this.selectedContactRecord, defaultSelection: this.selectedDefaultContactRecord, isDefaultChanged })
  }

  onCancelClick() {
    this.popupComponent.instance.hide()
  }

  showPopup() {
    this.popupComponent.instance.show()
  }

  setSelectedContactRecord(defaultContactRecord: ContactRecord): void {
    this.selectedContactRecord = defaultContactRecord
  }
}
