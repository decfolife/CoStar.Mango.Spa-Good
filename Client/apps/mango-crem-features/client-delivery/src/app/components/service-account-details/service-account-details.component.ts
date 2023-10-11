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
    this.service.getServiceAccountChangeHistory(this.data.contactId)
    .subscribe(result => {        
      if(result){          
        if(result.data){
          this.changeHistoryData =  result.data.items;
        }          
      }
    })
  }

  public closeDialog() {
    this.dialogRef.close('');
  }

}

