import { Component, Input, OnInit } from '@angular/core';
import { AccountingSummaryService } from '../../services/accounting-summary.service';
import { LeaseInfoResponse } from '../../models/lease-info-response.modal';

@Component({
  selector: 'mango-accounts-summary-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {

  leaseInfoResponse: LeaseInfoResponse;
  leaseName: String;
  componentName = 'title';
  showTooltip: boolean = false;
  isLocked: boolean = false;
  lockedReason: string;

  constructor(private accountingSummaryService: AccountingSummaryService) { }

  ngOnInit(): void {
    this.accountingSummaryService.getLeaseInfo().subscribe(res => {
      if (res.succeeded) {
        this.leaseInfoResponse = res.data;
        this.leaseName = this.leaseInfoResponse.name;
        this.isLocked = this.leaseInfoResponse.lockedReason != null;
        this.lockedReason=this.leaseInfoResponse.lockedReason;
      }
    });
  }

  showObjectInfoPopup() {
    alert("will open object information");
  }

  getId(uniqueName: string, elementType: string, componentType?: string) {
    if (componentType != undefined)
      return `${this.componentName}-${componentType}-${uniqueName}-${elementType}`
    else
      return `${this.componentName}-${uniqueName}-${elementType}`
  }
}
