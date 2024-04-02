import { Component, EventEmitter, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CentralAuthFacade } from '../../+state/facades';
import { ContactRecord, UserSite } from '@mango/data-models/lib-data-models';
import { Observable, combineLatest, of } from 'rxjs';
import { DxCheckBoxComponent, DxCheckBoxModule, DxDataGridComponent, DxDataGridModule, DxPopupComponent, DxPopupModule, DxToolbarModule } from 'devextreme-angular';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'mango-contact-records-popup',
  standalone: true,
  imports: [CommonModule, DxToolbarModule, DxPopupModule, DxDataGridModule, DxCheckBoxModule],
  templateUrl: './contact-records-popup.component.html',
  styleUrls: ['./contact-records-popup.component.scss'],
})
export class ContactRecordsPopupComponent {

  @ViewChildren(DxCheckBoxComponent) defaultCheckboxes: QueryList<DxCheckBoxComponent>
  @ViewChild(DxPopupComponent) popupComponent: DxPopupComponent
  @ViewChild(DxDataGridComponent) dataGridComponent: DxDataGridComponent
  @Output() contactsPopupCancelled = new EventEmitter<boolean>();

  visible$: Observable<boolean>

  contactRecords$: Observable<ContactRecord[]>
  selectedClient$: Observable<UserSite>

  selectedContactRecord: ContactRecord
  selectedDefaultContactRecord: ContactRecord
  ongoingDefaultSelectionMutex: boolean = false

  constructor(private centralAuthFacade: CentralAuthFacade) {
    this.onContactRecordSelected = this.onContactRecordSelected.bind(this)
    this.onCancelClick = this.onCancelClick.bind(this)

    this.selectedClient$ = this.centralAuthFacade.selectedClient$
    this.contactRecords$ = this.centralAuthFacade.userContactRecords$
    this.visible$ = combineLatest([
      this.centralAuthFacade.selectedClient$,
      this.centralAuthFacade.userContactRecords$,
      this.centralAuthFacade.selectedContactRecord$,
      this.centralAuthFacade.contactId$,
      this.centralAuthFacade.isSwitchContactRecord$
    ]).pipe(
      map(([selectedClient, contactRecords, selectedContactRecord, selectedContactId, isSwitchContactRecord]) =>
        !!selectedClient && !!contactRecords && (contactRecords.length > 1 || !!isSwitchContactRecord))
    )
  }

  onSelectionChanged(event) {
    const selectedRow = (event.selectedRowsData || [null])[0]
    if (!this.ongoingDefaultSelectionMutex) {
      this.selectedContactRecord = selectedRow
    }
  }

  onContactRecordSelected() {
    this.centralAuthFacade.setSelectedContactId(this.selectedContactRecord.contactID)
  }

  onCancelClick() {
    this.centralAuthFacade.purgeClientSelection()
    this.contactsPopupCancelled.emit(true);
  }

  onDefaultCheckboxValueChanged(event, data) {
    this.contactRecords$.pipe(
      filter(contactRecords => !!contactRecords),
      map(contactRecords => ({ contactRecords, checkboxesList: this.generateParsedCheckboxesList() })),
      tap(({ contactRecords, checkboxesList }) => {
        if (event.value == true) {
          checkboxesList.filter(c => c.name != data.contactID).forEach(checkbox => {
            checkbox.value = false
          })
        }
        const checkedCheckbox = checkboxesList.find(checkbox => checkbox.value === true)
        this.selectedDefaultContactRecord = checkedCheckbox ? contactRecords.find(c => c.contactID === Number.parseInt(checkedCheckbox.name)) : null
      })
    )
  }

  generateParsedCheckboxesList(): DxCheckBoxComponent[] {
    const checkboxesHashMap = {}
    this.defaultCheckboxes.forEach(checkbox => {
      checkboxesHashMap[checkbox.name] = checkbox
    })
    return Object.values(checkboxesHashMap)
  }

  onCellClick(event) {
    const { columnIndex } = event
    this.contactRecords$.pipe(
      filter(contactRecords => !!contactRecords && columnIndex === 4),
      tap(contactRecords => {
        this.ongoingDefaultSelectionMutex = true
        const previouslySelectedRow = this.selectedContactRecord
        event.component.deselectAll()
        event.component.deselectRows([0, ...contactRecords.map(c => c.contactID)]).then(_ => this.ongoingDefaultSelectionMutex = false)
        if (previouslySelectedRow) {
          event.component.selectRows([previouslySelectedRow.contactID], true)
        }
      })
    ).subscribe()
  }
}
