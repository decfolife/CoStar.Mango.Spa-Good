import {
  Component,
  EventEmitter,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CentralAuthFacade } from '../../+state/facades';
import { ContactRecord, UserSite } from '@mango/data-models/lib-data-models';
import { Observable, Subscription, combineLatest, of } from 'rxjs';
import {
  DxCheckBoxComponent,
  DxCheckBoxModule,
  DxDataGridComponent,
  DxDataGridModule,
  DxPopupComponent,
  DxPopupModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { filter, map, tap } from 'rxjs/operators';
import { DefaultContactRecordSelection } from '../../models/default-contact';

@Component({
  selector: 'mango-contact-records-popup',
  standalone: true,
  imports: [
    CommonModule,
    DxToolbarModule,
    DxPopupModule,
    DxDataGridModule,
    DxCheckBoxModule,
  ],
  templateUrl: './contact-records-popup.component.html',
  styleUrls: ['./contact-records-popup.component.scss'],
})
export class ContactRecordsPopupComponent {
  @ViewChildren(DxCheckBoxComponent)
  defaultCheckboxes: QueryList<DxCheckBoxComponent>;
  @ViewChild(DxPopupComponent) popupComponent: DxPopupComponent;
  @ViewChild(DxDataGridComponent) dataGridComponent: DxDataGridComponent;
  @Output() contactsPopupCancelled = new EventEmitter<boolean>();

  visible$: Observable<boolean>;
  contactRecords$: Observable<ContactRecord[]>;
  selectedClient$: Observable<UserSite>;
  selectedContactRecord: ContactRecord;
  selectedDefaultContactRecord: ContactRecord;
  ongoingDefaultSelectionMutex: boolean = false;

  subs: Subscription[] = [];

  constructor(private centralAuthFacade: CentralAuthFacade) {
    this.onContactRecordSelected = this.onContactRecordSelected.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.selectedClient$ = this.centralAuthFacade.selectedClient$;
    this.contactRecords$ = this.centralAuthFacade.userContactRecords$;
  }

  ngOnInit(): void {
    this.subs.push(this.isVisible().subscribe());
    this.subs.push(this.defaultContactHandler().subscribe());
  }

  isVisible(): Observable<any> {
    return combineLatest([
      this.centralAuthFacade.selectedClient$,
      this.centralAuthFacade.userContactRecords$,
      this.centralAuthFacade.isSwitchContactRecord$,
    ]).pipe(
      map(([selectedClient, contactRecords, isSwitchContactRecord]) => {
        if (
          !!selectedClient &&
          !!contactRecords &&
          (contactRecords.length > 1 || !!isSwitchContactRecord)
        ) {
          this.visible$ = of(true);
        } else {
          this.visible$ = of(false);
        }
      })
    );
  }

  // Handles the case when the user has multiple contacts AND one of the contacts is a default login contact
  defaultContactHandler(): Observable<any> {
    return combineLatest([
      this.centralAuthFacade.selectedClient$,
      this.centralAuthFacade.userContactRecords$,
      this.centralAuthFacade.isSwitchContactRecord$,
    ]).pipe(
      filter(([selectedClient, contactRecords, isSwitchContactRecord]) => {
        return (
          !!selectedClient &&
          !!contactRecords &&
          contactRecords.length > 1 &&
          !isSwitchContactRecord
        );
      }),
      filter(([_, contactRecords]) => {
        const defaultContact = contactRecords.find(
          (c) => c.isDefaultLoginContact === true
        );
        const defaultContactId = defaultContact
          ? defaultContact.contactID
          : null;

        // If user has a default contact selected
        return defaultContactId > 0;
      }),
      tap(([_, contactRecords]) => {
        this.visible$ = of(false);
        const defaultContact = contactRecords.find(
          (c) => c.isDefaultLoginContact === true
        );
        this.centralAuthFacade.setSelectedContactId(defaultContact.contactID);
      })
    );
  }

  onSelectionChanged(event) {
    const selectedRow = (event.selectedRowsData || [null])[0];
    if (!this.ongoingDefaultSelectionMutex) {
      this.selectedContactRecord = selectedRow;
    }
  }

  onContactRecordSelected() {
    this.centralAuthFacade.setSelectedContactId(
      this.selectedContactRecord.contactID
    );
  }

  onCancelClick() {
    this.centralAuthFacade.purgeClientSelection();
    this.contactsPopupCancelled.emit(true);
  }

  onDefaultCheckboxValueChanged(event, data) {
    var checkboxesList = this.generateParsedCheckboxesList();

    if (event.value == true) {
      checkboxesList
        .filter((c) => c.name != data.contactID)
        .forEach((checkbox) => {
          checkbox.value = false;
        });

      this.selectedDefaultContactRecord = data;

      var selection: DefaultContactRecordSelection = {
        defaultLoginContactId: this.selectedDefaultContactRecord.contactID,
        isDefaultLoginContact: true,
      };
      this.centralAuthFacade.setSelectedDefaultContactRecord(selection);

      return;
    } else if (event.value == false && event.previousValue == true) {
      const checkedCheckbox = checkboxesList.find(
        (checkbox) => checkbox.value === true
      );
      const defaultContactWasUnselected =
        !checkedCheckbox && data.isDefaultLoginContact ? true : false;

      if (defaultContactWasUnselected) {
        this.selectedDefaultContactRecord = null;
      }

      var selection: DefaultContactRecordSelection = {
        defaultLoginContactId: 0,
        isDefaultLoginContact: defaultContactWasUnselected ? false : null,
      };

      this.centralAuthFacade.setSelectedDefaultContactRecord(selection);
    }
  }

  generateParsedCheckboxesList(): DxCheckBoxComponent[] {
    const checkboxesHashMap = {};
    this.defaultCheckboxes.forEach((checkbox) => {
      checkboxesHashMap[checkbox.name] = checkbox;
    });
    return Object.values(checkboxesHashMap);
  }

  onCellClick(event) {
    const { columnIndex } = event;
    this.contactRecords$
      .pipe(
        filter((contactRecords) => !!contactRecords && columnIndex === 4),
        tap((contactRecords) => {
          this.ongoingDefaultSelectionMutex = true;
          const previouslySelectedRow = this.selectedContactRecord;
          event.component.deselectAll();
          event.component
            .deselectRows([0, ...contactRecords.map((c) => c.contactID)])
            .then((_) => (this.ongoingDefaultSelectionMutex = false));
          if (previouslySelectedRow) {
            event.component.selectRows([previouslySelectedRow.contactID], true);
          }
        })
      )
      .subscribe();
  }
}
