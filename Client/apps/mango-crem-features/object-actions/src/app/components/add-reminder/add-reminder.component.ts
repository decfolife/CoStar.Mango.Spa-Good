import { CommonModule, DatePipe } from "@angular/common";
import {
  ButtonModule,
  ModalModule,
  DropdownModule,
} from "@mango/ui-shared/lib-ui-elements";
import { SearchModule } from "@mango/ui-shared/cosmos";
import { DxDataGridModule, DxListModule } from "devextreme-angular";
import {
  DxFormModule,
  DxFormComponent,
  DxDropDownBoxModule,
} from "devextreme-angular";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SharedModule } from "../../shared/shared.module";
import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
  ViewChild,
  OnDestroy, ChangeDetectorRef,ViewEncapsulation
} from "@angular/core";
import { faCirclePlus, faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  combineLatest,
  of,
  Subscription,
  BehaviorSubject,
} from "rxjs";
import { RemindersService } from "@reminders-list/shared/services/reminders.service";
import { catchError, filter, map, switchMap, tap, debounceTime } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { MangoDialogService } from "@project-dashboard/services/mango-dialog.service";
import { Reminder } from "libs/data-models/lib-data-models/src/lib/models/Reminder";
import { RemindersRecepient } from "libs/data-models/lib-data-models/src/lib/models/RemindersRecepient";
import { RemindersFilteredRecepient } from "libs/data-models/lib-data-models/src/lib/models/RemindersFilteredRecepient";
import { DxDataGridComponent } from 'devextreme-angular';

@Component({
  selector: "add-reminder",
  standalone: true,
  templateUrl: "./add-reminder.component.html",
  styleUrls: ["./add-reminder.component.scss"],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    DropdownModule,
    ModalModule,
    ButtonModule,
    DxDataGridModule,
    SearchModule,
    SharedModule,
    DxFormModule,
    DxDropDownBoxModule,
    DxListModule,
    FontAwesomeModule
  ],
  providers: [DatePipe, RemindersService],
})
export class AddReminderComponent implements OnInit {
  loading = false;
  removeDisabled: boolean = true;
  faCirclePlus = faCirclePlus;
  faCircleMinus = faCircleMinus;
  dateFormat: string;
  dateTimeFormat: string;
  isDropDownBoxOpened = false;
  recipientsList: any;
  selectedRecipients: any;
  noDataText: string = "No recipients added yet. Please add recipients.";
  maxDate: number = 0;
  selectedMembers: any = [];
  remindersRecepient: RemindersRecepient[];
  remindersInfo: Reminder;
  filteredremindersRecepient: RemindersFilteredRecepient[];
  changesMade: boolean = false;
  public reminderEventDropdown: any = [];
  private subscriptions = new Subscription();
  selectedReminderEventId: any;
  selectedMemberIds: number[];
  otid: number;
  oid: number;
  public modalTitle: string;
  beginDays: string;
  TicklerTypeID: number;
  emailMessage: string;
  defaultSelectedValue: number;
  tickleFrequency: number | null = null;
  ticklerDaysOut: number | null = null;
  userDefinedEvent: string;
  userDefinedDate: Date;
  initLoad: boolean = true;
  ticklerID: number;
  saveBtnClicked: boolean = false;


  membersSearchInput$: BehaviorSubject<string> = new BehaviorSubject<string>(
    ""
  );

  @Output() isLoading = new EventEmitter();
  @ViewChild("addReminderForm") addReminderForm: DxFormComponent;
  @ViewChild("SelectedRecipientsGrid") selectedRecipientsGrid: DxDataGridComponent;

  constructor(
    private remindersService: RemindersService,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    public dialogRef: MatDialogRef<AddReminderComponent>,
    private dialogService: MangoDialogService, private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.onPlGroupValueChanged = this.onPlGroupValueChanged.bind(this);
    this.otid = Number(this.route.snapshot.queryParamMap.get("otid"));
    this.oid = Number(this.route.snapshot.queryParamMap.get("oid"));
  }
  ngOnInit(): void {
    this.getDropdownData();
    this.remindersInfo = <Reminder>{};
    this.remindersInfo.remindersRecepient = [];
    if (this.data.teamFunction == "add") {
      this.modalTitle = "Add Reminder"
    } else {
      const { data: { data: gridData } } = this.data
      this.modalTitle = "Edit Reminder";
      this.emailMessage = gridData.TicklerMessage;
      this.defaultSelectedValue = gridData.TicklerTypeID;
      this.tickleFrequency = gridData.TicklerFrequency;
      this.ticklerDaysOut = gridData.TicklerDaysOut;
      this.userDefinedEvent = gridData.UserDefinedEvent;
      this.userDefinedDate = gridData.UserDefinedDate?.split('T')[0];
      this.ticklerID = gridData.TicklerID;
      const newRecipient: RemindersRecepient = {
        contactId: gridData.ContactID,
        contactNameEmail: gridData.DisplayName,
        companyName: gridData.CompanyName,
        contactEmailAddress: gridData.contactEmailAddress
      };
      this.remindersInfo.remindersRecepient.push(newRecipient);

    }
    this.membersSearchInput$.pipe(
      debounceTime(250),
      switchMap(inputValue => {
        if (inputValue.length !== 1) {
          return this.remindersService.getRecipientsContactsList(this.oid, this.otid).pipe(
            map(filteredremindersRecepient => {
              return filteredremindersRecepient.data.filter(ci => {
                return !inputValue || 
                  ci.CompanyName.toLowerCase().includes(inputValue.toLowerCase()) ||
                  ci.TeamMember.toLowerCase().includes(inputValue.toLowerCase()) ||
                  ci.contactEmailAddress.toLowerCase().includes(inputValue.toLowerCase());
              }).map(recipient => ({
                contactId: recipient.ContactID,
                contactNameEmail: recipient.ContactNameEmail ? recipient.ContactNameEmail : recipient.TeamMember || null,
                companyName: recipient.CompanyName,
                contactEmailAddress: recipient.contactEmailAddress
              }));
            })
          );
        } else {
          return of([]);
        }
      })
    ).subscribe(filteredData => {
      this.filteredremindersRecepient = filteredData;
    });
  }

  public getDropdownData() {
    this.subscriptions.add(
      combineLatest([
        this.remindersService.getReminderEvents(this.oid, this.otid),
        this.remindersService.getRecipientsContactsList(this.oid, this.otid),
      ])
        .pipe(
          filter(
            ([reminderEventDropdown, recipientsContactsList]) =>
              !!reminderEventDropdown && !!recipientsContactsList
          ),
          tap(([reminderEventDropdown, recipientsContactsList]) => {
            this.reminderEventDropdown = reminderEventDropdown?.data;
            this.filteredremindersRecepient = recipientsContactsList.data.map(
              (recipient) => ({
                contactId: recipient.ContactID,
                contactNameEmail: recipient.ContactNameEmail ? recipient.ContactNameEmail : recipient.TeamMember || null,
                companyName: recipient.CompanyName,
                contactEmailAddress: recipient.contactEmailAddress
              })
            )
            this.loading = false;
          })
        )
        .subscribe()
    );

  }

  saveReminder(e) {
    const reminderData = this.getSaveReminderData();
    this.loading = true;  
    this.saveBtnClicked = true;
    if(this.remindersInfo.remindersRecepient.length == 0 ){
      this.dialogService.alert('Recipient Name', 'Recipient field is a required field.', 'OK').subscribe();
      this.saveBtnClicked = false;
      return;
    }
    for (const recipient of this.remindersInfo.remindersRecepient) {
      reminderData.ContactID = recipient.contactId;
      if(reminderData.TickleTypeId !=1){
        reminderData.UserDefinedDate =null; 
        reminderData.UserDefinedEvent =null;
      }
      this.remindersService.saveReminder(reminderData).pipe(
        switchMap(res => {
          if (res.success) {
            this.dialogRef.close('true');
          }
          return res.success ? of(this.toastr.info("Reminder Saved Successfully", "",
            { positionClass: 'toast-bottom-right', timeOut: 3000, closeButton: false, progressBar: false })) : this.dialogService.alert('Save unsuccessful!', 'There was an issue with saving this reminder. Please review and try again later', 'OK');
        }),
        catchError(_ => this.dialogService.alert('Save Not Successful!', 'There was an issue with saving this team. Please review and try again later', 'OK'))
      ).subscribe();
    }
  }

  onCellClick(event) {
    if (event.rowType == 'header') {
      let headerCheckboxContainer = event.component.$element().find('.dx-header-row .dx-checkbox-container');
      let headerCheckboxAttr = event.component.$element().find('.dx-widget.dx-checkbox.dx-select-checkbox.dx-datagrid-checkbox-size').attr('aria-checked');
      if (headerCheckboxAttr === 'true') {
        headerCheckboxContainer.attr('aria-live', 'polite');
        headerCheckboxContainer.attr('aria-label', 'All checkboxes are checked ');
      } else {
        headerCheckboxContainer.attr('aria-live', 'polite');
        headerCheckboxContainer.attr('aria-label', 'All checkboxes are un-checked');
      }
    }
  }

  searchRecipient(val: string) {
    this.membersSearchInput$.next(val);
  }

  focusOnDropDownInput(e) {
    this.isDropDownBoxOpened = false;
    setTimeout(function () {
      e.component.focus();
    });
    this.isDropDownBoxOpened = true;
  }

  onItemClicked(e) {
    const listItem = e.itemElement as HTMLElement;
    if (e.event.code === 'Enter' && listItem.classList.contains('aet-itemDisabled')) {
        return false;
    } else {
        const remindersRecepient = {
            contactId: e.itemData.contactId,
            contactNameEmail: e.itemData.contactNameEmail,
            companyName: e.itemData.companyName,
            contactEmailAddress: e.itemData.contactEmailAddress
        };
        this.remindersInfo.remindersRecepient.push(remindersRecepient);
        this.changesMade = true;
        this.setListItemAttributes(e);
    }
}

  onItemRendered(e) {
    if (
      this.remindersInfo.remindersRecepient &&
      this.remindersInfo.remindersRecepient.length
    ) {
      this.remindersInfo.remindersRecepient.forEach((member) => {
        if (member.contactId === e.itemData.contactId) {
          this.setListItemAttributes(e);
        }
      });
    }
  }

  setListItemAttributes(e) {
    const listItem = e.itemElement as HTMLElement;
    listItem.style.pointerEvents = "none";
    listItem.classList.add("aet-itemDisabled");
  }

  private getSaveReminderData() {
    const formData = this.addReminderForm.formData;
    if( this.addReminderForm.instance.validate()){
    let saveReminderData = {
      UserDefinedEvent: formData.userDefinedEvent,
      UserDefinedDate: formData.userDefinedDate,
      TickleDaysOut: formData.beginDays,
      TickleFrequency: formData.freqDays,
      TickleMessage: formData.emailMessage,
      ContactID: 0,
      ObjectID: this.oid,
      ObjectTypeID: this.otid,
      TickleTypeId: formData.reminderEvent,
      TicklerID : this.ticklerID 
    };
    return saveReminderData;
  }
  }

  toggleList() {
    this.isDropDownBoxOpened = !this.isDropDownBoxOpened;
  }

  removeMembers() {
    let confirmText = "Do you want to Remove the members ?\n\n";
    this.selectedMembers.forEach((member) => {
      confirmText += member.contactNameEmail + "\n";
    });

    this.dialogService
      .confirm("Remove Members", confirmText, "Confirm", "Cancel")
      .pipe(
        filter((confirmed) => !!confirmed),
        switchMap((_) => {
          let removeIndex: number;
          this.selectedMemberIds.forEach((contactId) => {
            removeIndex = this.remindersInfo.remindersRecepient.findIndex(
              (member) => contactId == member.contactId
            );
            this.remindersInfo.remindersRecepient.splice(removeIndex, 1);
          });
          this.filteredremindersRecepient = [
            ...this.filteredremindersRecepient,
          ];
          this.changesMade = true;
          return of();
        })
      )
      .subscribe();
  }

  editorPreparing(e) {
    if (e.parentType === 'dataRow' && ((e.dataField == 'role') || (e.dataField == 'level')) && e.changesMade) {
      this.changesMade = true;
    }
  }

  onMemberSelectionChanged(e) {
    this.selectedMemberIds = e.selectedRowKeys;
    this.selectedMembers = e.selectedRowsData;
    if (this.selectedMemberIds.length > 1) this.removeDisabled = false;
    else {
      this.removeDisabled = true;
    }
  }

  setAttributes(e) {
      if(this.initLoad) {
        this.selectedRecipientsGrid.instance.refresh();
        this.initLoad = false;
    }
  }

  public cancelChanges() {
    if (this.changesMade) {
      this.dialogService
        .confirm(
          "Changes Made!",
          "Changes you made have not been saved. Would you like to continue editing or leave ?",
          "Continue",
          "Leave"
        )
        .pipe(
          switchMap((res) => {
            if (!res) {
              this.dialogRef.close("");
            }
            return of();
          })
        )
        .subscribe();
    } else {
      this.dialogRef.close("");
    }
  }

  removeMember(contactId) {
    this.remindersInfo.remindersRecepient =
      this.remindersInfo.remindersRecepient.filter(
        (member) => member.contactId !== contactId
      );
    this.filteredremindersRecepient = [...this.filteredremindersRecepient];
    this.changesMade = true;
  }

  onPlGroupValueChanged(e: any) {
    this.defaultSelectedValue = e.component?.option("value");
    this.selectedReminderEventId = e.component?.option("text");
  }

  shouldShowUserDefinedEvent(): boolean {
    if(this.selectedReminderEventId === "User Defined"){
      return true;
    }
    if( this.userDefinedEvent !=" " && this.defaultSelectedValue === 1){
      return true;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
      this.membersSearchInput$.unsubscribe();
      this.subscriptions.unsubscribe();
    
  }
}
