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
    this.active = this.data.isActive;
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
      {changeDate: 191, user: 'Li Liu', description: 'Create Account', oldValue: 'Old value', newValue: 'New value'},
      {changeDate: 402, user: 'Li Liu', description: 'Create Account', oldValue: 'Old value', newValue: 'New value'},
      {changeDate: 403, user: 'Li Liu', description: 'Create Account', oldValue: 'Old value', newValue: 'New value'},
      {changeDate: 415, user: 'Li Liu', description: 'Create Account', oldValue: 'Old value', newValue: 'New value'},
      {changeDate: 955, user: 'Li Liu', description: 'Create Account', oldValue: 'Old value', newValue: 'New value'},
      ];
  }

  public closeDialog() {
    this.dialogRef.close('');
  }

}

