import { Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserMaintenanceService } from '../../../../../user-maintenance/src/app/components/user-maintenance/user-maintenance.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mango-add-service-account',
  templateUrl: './add-service-account.component.html',
  styleUrls: ['./add-service-account.component.scss'],
})
export class AddServiceAccountComponent {
  modalTitle: 'Service Account Setup';
  serviceAccountForm: FormGroup;
  isEmailValid: boolean = false;
  public errorMsg: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddServiceAccountComponent>,
    private userMaintenanceService: UserMaintenanceService,
    private fb: FormBuilder) { 
      this.serviceAccountForm = this.fb.group({
        emailAddress: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$")]]
      });
  }

  AddServiceAccount(rowFG: any){  
    const emailAddress = this.serviceAccountForm.get('emailAddress').value;
    if (rowFG.valid) {
      let existingEmailAddresses: string[];
      this.userMaintenanceService.getServiceAccounts().subscribe(
        accounts => {
          existingEmailAddresses = accounts.map(account => account.contactEmailAddress);

          if (existingEmailAddresses.includes(emailAddress)) {
            this.errorMsg = "This email address already exists";
          } else {
            this.errorMsg = '';  
            this.dialogRef.close(emailAddress);
          }
        }); 
    }
    else {
      this.errorMsg = (emailAddress.length === 0) 
        ? 'Email address is required'
        : 'Email address in not in correct format';
    } 
  }
}
