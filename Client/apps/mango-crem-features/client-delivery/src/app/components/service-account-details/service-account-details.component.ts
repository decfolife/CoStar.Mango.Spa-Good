import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { ClientDeliveryService } from '../../services/client-delivery.service';
import {ResetPasswordConfirmationComponent} from '../reset-password-confirmation/reset-password-confirmation.component';

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
    private service: ClientDeliveryService,
    private dialog: MatDialog,
    ) { 

    }

  ngOnInit(): void {
    this.getChangeHistory();
    this.active = this.data.contactActive ? 'Yes' : 'No';
    this.emailAddress = this.data.contactEmailAddress;
  }

  resetPassword(){
      let dialogRef = this.dialog.open(ResetPasswordConfirmationComponent, {
        width: '600px',
        panelClass: 'client-delivery-modal',
        data: this.data.contactEmailAddress,
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.service.resetPassword(this.emailAddress)      
          .subscribe(result => {
            if (result) {
              this.closeDialog();
            }
          });
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

