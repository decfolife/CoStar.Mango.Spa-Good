import { CommonModule, DatePipe } from '@angular/common';
import { ButtonModule, ModalModule, DropdownModule } from '@mango/ui-shared/lib-ui-elements';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { DxDataGridModule, DxListModule } from 'devextreme-angular';
import { DxFormModule, DxFormComponent, DxDropDownBoxModule } from 'devextreme-angular';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import { combineLatest, forkJoin, of, Subscription, BehaviorSubject} from 'rxjs';
import { RemindersService } from '@reminders-list/shared/services/reminders.service';
import { filter, map, switchMap, tap, debounceTime } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FaIconComponent, AnimationProp } from '@fortawesome/angular-fontawesome';
import { ToastrService } from 'ngx-toastr';
import { MangoDialogService } from '@project-dashboard/services/mango-dialog.service';
import { Reminder } from '../../../../../../../libs/data-models/lib-data-models/src/lib/models/Reminder';
import { RemindersRecepient } from './../../../../../../../libs/data-models/lib-data-models/src/lib/models/RemindersRecepient';
import { RemindersFilteredRecepient } from './../../../../../../../libs/data-models/lib-data-models/src/lib/models/RemindersFilteredRecepient';


@Component({
  selector: 'add-reminder',
  standalone: true,
  templateUrl: './add-reminder.component.html',
  styleUrls: ['./add-reminder.component.scss'],
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
    DxListModule
  ],
  providers: [
    DatePipe, RemindersService
  ]
})
export class AddReminderComponent implements OnInit{

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
  otid : number;
  oid : number;

  membersSearchInput$: BehaviorSubject<string> = new BehaviorSubject<string>('')

  @Output() isLoading = new EventEmitter();
  @ViewChild('addReminderForm') addReminderForm: DxFormComponent;

  constructor( private remindersService: RemindersService, private route: ActivatedRoute, public toastr: ToastrService,   public dialogRef: MatDialogRef<AddReminderComponent>,private dialogService: MangoDialogService){
    this.onPlGroupValueChanged = this.onPlGroupValueChanged.bind(this);
     this.otid = Number(this.route.snapshot.queryParamMap.get('otid'));
      this.oid = Number(this.route.snapshot.queryParamMap.get('oid'));


  }

  ngOnInit(): void {
    let allMembers =  false;
    let pageSize = 10;
    let pageNumber = 1;

    this.getDropdownData();
    this.remindersInfo = <Reminder>{};
    this.remindersInfo.remindersRecepient = [];
  }

  public getDropdownData() {

    this.subscriptions.add(
      combineLatest([
        this.remindersService.getReminderEvents(this.oid, this.otid),
        this.remindersService.getRecipientsContactsList(this.oid, this.otid),
      ]).pipe(
        filter(([
          reminderEventDropdown,
          recipientsContactsList
        ]) => !!reminderEventDropdown && !!recipientsContactsList),
        tap(([
          reminderEventDropdown, 
          recipientsContactsList
        ]) => {
          this.reminderEventDropdown = reminderEventDropdown.data;
          this. filteredremindersRecepient= recipientsContactsList.data
          this.loading = false;
        })
      ).subscribe())
  }

  saveReminder(e) {
    const isFormValid = this.addReminderForm.instance.validate();
      const reminderData = this.getSaveReminderData();
      this.loading = true;
      for (const recipient of this.remindersInfo.remindersRecepient) {
        reminderData.ContactID = recipient.ContactId;
        this.subscriptions.add(this.remindersService.SaveReminder(reminderData).subscribe((result) => {
          this.dialogRef.close('true');
        }));
      }
    
    
  }

  searchTeamMembers(val: string) {
    this.membersSearchInput$.next(val)
  }

  focusOnDropDownInput(e) { 
    this.isDropDownBoxOpened = false; 
    setTimeout(function() {  
        e.component.focus();  
    });  
    this.isDropDownBoxOpened = true;
  } 

  onItemClicked(e) {
    let remindersRecepient = <RemindersRecepient>{};
    remindersRecepient.ContactId = e.itemData.ContactID;
    remindersRecepient.ContactNameEmail = e.itemData.ContactNameEmail;
    this.remindersInfo.remindersRecepient.push(remindersRecepient);
    this.changesMade = true;
    this.setListItemAttributes(e);
  }


  onItemRendered(e) {
    if(this.remindersInfo.remindersRecepient && this.remindersInfo.remindersRecepient.length) {
      this.remindersInfo.remindersRecepient.forEach(member => {
        if(member.ContactId == e.itemData.ContactID) {
          this.setListItemAttributes(e);
        }
      })
    }
  }

  setListItemAttributes(e) {
    const listItem = e.itemElement as HTMLElement;
    listItem.style.pointerEvents = 'none';
    listItem.classList.add('aet-itemDisabled');
  }

  private getSaveReminderData() {
    const formData = this.addReminderForm.formData;
    let saveReminderData = {
      UserDefinedEvent: formData.userDefinedEvent,
      UserDefinedDate: formData.userDefinedDate,
      TicklerDaysOut: formData.beginDays,
      TickleFrequency: formData.freqDays,
      TickleMessage: formData.emailMessage,
      ContactID : 0,
      ObjectID : this.oid,
      ObjectTypeID : this.otid,
      TickleTypeId : formData.reminderEvent
    };
    return saveReminderData;
  }

  toggleList(){
    this.isDropDownBoxOpened = !this.isDropDownBoxOpened;
  }


  removeMembers() {
    let confirmText = "Do you want to Remove the members ?\n\n"
    this.selectedMembers.forEach(member => {
      confirmText += member.name + "\n";
    })

    this.dialogService.confirm('Remove Members', confirmText, 'Confirm', 'Cancel').pipe(
      filter(confirmed => !!confirmed),
      switchMap(_ => {
        let removeIndex: number;
        this.selectedMemberIds.forEach(contactId => {
          removeIndex = (this.remindersInfo.remindersRecepient.findIndex(member => contactId == member.ContactId));
          this.remindersInfo.remindersRecepient.splice(removeIndex, 1);
        });
        this.filteredremindersRecepient = [...this.filteredremindersRecepient];
        this.changesMade = true;
        return of();
      })
    ).subscribe();
  }

  editorPreparing(e) {
    if (e.parentType === 'dataRow' && ((e.dataField == 'role') || (e.dataField == 'level')) && e.changesMade) {  
        this.changesMade = true;
    }
  }

  onMemberSelectionChanged(e) {
    this.selectedMemberIds = e.selectedRowKeys;
    this.selectedMembers = e.selectedRowsData;
    if((this.selectedMemberIds.length) > 1 ) 
      this.removeDisabled = false;
    else {
      this.removeDisabled = true;
    }  
  }


  setAttributes(e) {

  }

  public cancelChanges() {
    if(this.changesMade) {
      this.dialogService.confirm('Changes Made!', 'Changes you made have not been saved. Would you like to continue editing or leave ?', 'Continue', 'Leave').pipe(
        switchMap(res => {
          if(!res) {
            this.dialogRef.close('');
          }
          return of();
        }),
      ).subscribe();
    } else {
      this.dialogRef.close('');
    }
  }

  
  removeMember(contactId) {
    this.remindersInfo.remindersRecepient = this.remindersInfo.remindersRecepient.filter( member => member.ContactId !== contactId);
    this.filteredremindersRecepient = [...this.filteredremindersRecepient];
    this.changesMade = true;
  }


  onPlGroupValueChanged(e: any){
    this.selectedReminderEventId = e.component?.option('text');

  }

  shouldShowUserDefinedEvent(): boolean {
    return this.selectedReminderEventId === 'User Defined';
}
}
