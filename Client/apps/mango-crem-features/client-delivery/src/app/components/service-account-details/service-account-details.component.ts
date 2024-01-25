import { Component, Inject, OnDestroy, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { ClientDeliveryService } from '../../services/client-delivery.service';
import {ResetPasswordConfirmationComponent} from '../reset-password-confirmation/reset-password-confirmation.component';
import { Observable, Subscription, of } from 'rxjs';
import { ServiceAccountHistory } from '@mango/data-models/lib-data-models';
import { UserMaintenanceService } from '../../../../../user-maintenance/src/app/components/user-maintenance/user-maintenance.service';

@Component({
  selector: 'mango-service-account-details',
  templateUrl: './service-account-details.component.html',
  styleUrls: ['./service-account-details.component.scss'],
})
export class ServiceAccountDetailsComponent implements OnInit, OnDestroy {
  public modalTitle: string = 'Service Account Details';
  public closeButton = true;
  public closeOrCancelButtonText = 'Cancel';

  public emailAddress: string;
  public active: string;
  public changeHistoryData$:Observable<ServiceAccountHistory[]>;
  public columns: any;

  subs: Subscription[] = [];
  
  constructor(
    private userMaintenanceService: UserMaintenanceService,
    public dialogRef: MatDialogRef<ServiceAccountDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ClientDeliveryService,
    private dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.changeHistoryData$ = this.userMaintenanceService.getServiceAccountChangeHistory(this.data.contactId);
    this.active = this.data.contactActive ? 'Yes' : 'No';
    this.emailAddress = this.data.contactEmailAddress;
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
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
          this.subs.push (
            this.service.resetPassword(this.emailAddress)      
            .subscribe(result => {
              if (result) {
                this.closeDialog();
              }}));
        }});
  }

  public closeDialog() {
    this.dialogRef.close('');
  }

}

