/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChargeDetails, GLEventInfo } from '../shared/models';

@Component({
  selector: 'payment-details-popup',
  templateUrl: './payment-details-popup.component.html',
  styleUrls: ['./payment-details-popup.component.scss'],
})
export class PaymentDetailsPopupComponent implements OnInit {
  public modalTitle: string = 'Payment Details';
  public closeButton = true;
  public closeOrCancelButtonText = 'Cancel';
  public modalId = 'paymentDetailsModalId';
  paymentDetails: GLEventInfo;
  chargeDetails: ChargeDetails;
  dateFormat: string;
  dateTimeFormat: string;
  vendorOrCustomer: string;
  constructor(
    public dialogRef: MatDialogRef<PaymentDetailsPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.paymentDetails = this.data.paymentDetails;
    this.vendorOrCustomer = this.data.vendorORCustomer;
    this.dateFormat = this.data.dateFormat;
    this.dateTimeFormat = this.dateFormat.concat(' hh:mm:ss a');
    this.chargeDetails = this.paymentDetails.chargeDetails
      ? this.paymentDetails.chargeDetails
      : <ChargeDetails>{};

    if (
      this.paymentDetails.portfolioSegments &&
      this.paymentDetails.portfolioSegments.length &&
      this.paymentDetails.chargeAllocations &&
      this.paymentDetails.chargeAllocations.length
    ) {
      this.paymentDetails.chargeAllocations.forEach((allocation) => {
        this.paymentDetails.portfolioSegments.forEach((segment, index) => {
          let property = 'glAllocationName' + (index + 1);
          if (allocation[property]) {
            allocation[segment.segmentLabel] = allocation[property];
            delete allocation[property];
          }
        });
      });
    }
  }

  public closeDialog() {
    this.dialogRef.close('');
  }
}
