import { Component } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonModule, ModalModule, DropdownModule } from '@mango/ui-shared/lib-ui-elements';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { DxDataGridModule, DxListModule } from 'devextreme-angular';
import { DxFormModule, DxFormComponent, DxDropDownBoxModule } from 'devextreme-angular';
import { SharedModule } from '../../shared/shared.module';
import { faCirclePlus, faCircleMinus } from '@fortawesome/free-solid-svg-icons';

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
    DatePipe
  ]
})
export class AddReminderComponent {

  loading = false;
  removeDisabled: boolean = true;
  faCirclePlus = faCirclePlus;
  faCircleMinus = faCircleMinus;
  
  isDropDownBoxOpened = false;
  recipients: any;
  selectedRecipients: any;
  noDataText: string = "No recipients added yet. Please add recipients.";

  saveReminder(e) {

  }

  close() {

  }

  searchTeamMembers(val: string) {
    
  }

  toggleList() {
    
  }

  focusOnDropDownInput(e) {

  }

  onItemRendered(e) {

  }

  onItemClicked(e) {

  }

  removeRecipient() {

  }

  editorPreparing(e) {

  }

  onMemberSelectionChanged(e) {

  }

  setAttributes(e) {

  }
}
