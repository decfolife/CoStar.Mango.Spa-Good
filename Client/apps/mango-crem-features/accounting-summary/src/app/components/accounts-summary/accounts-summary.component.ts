import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import CustomStore from 'devextreme/data/custom_store';
import { AccountingSummaryService } from '../../services/accounting-summary.service';
import { Router } from '@angular/router';
import { LeaseInfoResponse } from '../../models/lease-info-response.modal';

@Component({
  selector: 'mango-accounts-summary',
  templateUrl: './accounts-summary.component.html',
  styleUrls: ['./accounts-summary.component.scss'],
})
export class AccountsSummaryComponent implements OnInit {

  componentName: string = 'accounts-summary';
  gridDataSource: any;
  gridBoxValue: number[] = [1];
  isGridBoxOpened: boolean = false;
  isAccountingEventEmpty: boolean = true;
  readonly allowedPageSizes = [5, 'all'];
  isAddButtonDisabled: boolean = false;

  leaseInfoResponse: LeaseInfoResponse;
  isLocked: boolean = false;
  isArchived: boolean = false;
  noUserRights: boolean = false;
  disableBtnReason: string;
  isTooltipVisible: boolean = false;

  constructor(private ref: ChangeDetectorRef, private accountingSummaryService: AccountingSummaryService, public router: Router) { }

  ngOnInit(): void {
    this.getEventsDropDownData();
    this.addButtonSetup();
  }

  getEventsDropDownData() {
    this.accountingSummaryService.getAccountingEvents().subscribe(response => {
      if (response.succeeded && response.data.length != 0) {
        const dropdownEvents = this.getUniqueEvents(response.data);
        this.gridDataSource = this.makeAsyncDataSource(dropdownEvents);
        this.isAccountingEventEmpty = false;
      }
    });
  }

  addButtonSetup() {
    this.accountingSummaryService.getLeaseInfo().subscribe(res => {
      if (res.succeeded) {
        this.leaseInfoResponse = res.data;
        this.isLocked = this.leaseInfoResponse.lockedReason != null;
        this.isArchived = !this.leaseInfoResponse.isActive;
      }
    });

    this.accountingSummaryService.getUserInformation().subscribe(res => {
      if (res.succeeded) {
        this.noUserRights = res.data.leaseRight.objectTypeId < 3 ? true : false;
        this.getDisabledBtnReason();
      }
    });

  }

  getDisabledBtnReason() {
    this.isAddButtonDisabled = (this.isLocked || this.isArchived || this.noUserRights);
    switch (this.isAddButtonDisabled) {
      case this.noUserRights:
        this.disableBtnReason = "Accounting Event cannot be added when user does not have Edit rights."
        break;
      case this.isLocked:
        this.disableBtnReason = "Accounting Event cannot be added when Lease is Locked."
        break;
      case this.isArchived:
        this.disableBtnReason = "Accounting Event cannot be added when Lease is Archived."
        break;
    }
  }

  getUniqueEvents(data: any[]) {
    const uniqueObjectsMap = new Map();

    // Iterate through the original array and add unique objects to the map
    for (const item of data) {
      const masterScheduleID = item.masterScheduleID;
      if (!uniqueObjectsMap.has(masterScheduleID)) {
        uniqueObjectsMap.set(masterScheduleID, item);
      }
    }

    // Convert the map values (unique objects) back to an array
    const uniqueObjectsArray = Array.from(uniqueObjectsMap.values());

    // Return sorted array based on sortOrder
    return uniqueObjectsArray.sort((a, b) => a.sortOrder - b.sortOrder);
  }

  makeAsyncDataSource(data: any[]) {
    return new CustomStore({
      loadMode: 'raw',
      key: 'sortOrder',
      load() {
        return data;
      },
    });
  }

  gridBox_displayExpr(item) {
    return item && `${item.classificationType} (${item.amortizationProfileName})`;
  }

  onGridBoxOptionChanged(e) {
    if (e.name === 'value') {
      this.isGridBoxOpened = false;
      this.ref.detectChanges();
    }
  }

  AddEvent(event) {
    this.router.navigate(['addEvent']);
  }

  onMouseEnter() {
    if (this.isAddButtonDisabled) {
      this.isTooltipVisible = true;
    }
  }

  onMouseLeave() {
    this.isTooltipVisible = false;
  }

  getId(uniqueName: string, elementType: string, componentType?: string) {
    if (componentType != undefined)
      return `${this.componentName}-${componentType}-${uniqueName}-${elementType}`
    else
      return `${this.componentName}-${uniqueName}-${elementType}`
  }

}