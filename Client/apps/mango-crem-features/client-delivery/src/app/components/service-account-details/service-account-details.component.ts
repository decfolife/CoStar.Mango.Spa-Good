import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClientDeliveryService } from '../../services/client-delivery.service';

@Component({
  selector: 'mango-service-account-details',
  templateUrl: './service-account-details.component.html',
  styleUrls: ['./service-account-details.component.scss'],
})
export class ServiceAccountDetailsComponent implements OnInit {
  public modalTitle: string = 'Service Account Details';
  public closeButton = true;
  public closeOrCancelButtonText = 'Cancel';

  public emailAddress: string;
  public active: string;
  public changeHistoryData:any;
  public columns: any;
  
  constructor(
    public dialogRef: MatDialogRef<ServiceAccountDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ClientDeliveryService
    ) { 

    }

  ngOnInit(): void {
    this.getChangeHistory();
    this.active = this.data.contactActive ? 'Yes' : 'No';
    this.emailAddress = this.data.contactEmailAddress;
  }

  resetPassword(){
      this.service.resetPassword(this.emailAddress)      
      .subscribe(result => {
        if (result) {
          console.log(result);
        }
      });
  }

  private getChangeHistory() {
      //Temp data before client delivery API integration
      this.changeHistoryData = [
      {changeDate: 191, user: 'Li Liu 1', description: 'Create Account 1', oldValue: 'Old value', newValue: 'New value'},
      {changeDate: 402, user: 'Li Liu 2', description: 'Create Account 2', oldValue: 'Old value', newValue: 'New value'},
      {changeDate: 403, user: 'Li Liu 3', description: 'Create Account 3', oldValue: 'Old value', newValue: 'New value'},
      {changeDate: 415, user: 'Li Liu 4', description: 'Create Account 4', oldValue: 'Old value', newValue: 'New value'},
      {changeDate: 955, user: 'Li Liu 4', description: 'Create Account 5', oldValue: 'Old value', newValue: 'New value'},
      ];
  }

  public closeDialog() {
    this.dialogRef.close('');
  }

}

