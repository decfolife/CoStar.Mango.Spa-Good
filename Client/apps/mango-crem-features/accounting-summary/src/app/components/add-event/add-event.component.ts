import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { PortfolioSettingsResponse } from '@accounting-summary/models/portfolio-settings-response.modal';
import { classificationSettingResponse } from '@accounting-summary/models/classification-settings-response.modal';
import { AddEditScheduleService } from '@accounting-summary/services/add-edit-schedule.service';
import { Component, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mango-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnDestroy, OnInit {

  classificationId: any;

  componentName = 'add-edit'
  saveDisabled = true;
  pageMode = ""
  eventsGridData: any;
  measureEvent: string;
  queryParams: any;
  commonDropdowns: any;
  amortizationProfiles: any [];
  currencyList: any [];
  schedualId: number;
  classificationSettings: classificationSettingResponse;
  portfolioSettings: PortfolioSettingsResponse;
  accountingEventsData: [];
  eventDateOptions: [];
  userInfo: [];
  scheduleDetailsData: any;
  private subscription = new Subscription;

  @ViewChild('accordion') accordion: any;

  constructor(public accountingSummaryService: AccountingSummaryService, public location: Location, private activatedRoute: ActivatedRoute, private router: Router, public addEditScheduleService: AddEditScheduleService) {
    this.getCommonDropDowns();
    this.getClassificationSettings();
    this.getPortfolioSetting();
    this.getEventDateOptions();
    this.getUserInfo();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(navigatedFrom => {
      this.pageMode = navigatedFrom.breadCrumb.label;
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
    });

    this.eventsGridData = this.router.lastSuccessfulNavigation?.extras.state?.data;

    if(this.pageMode === "Edit Event"){
      this.measureEvent = this.eventsGridData?.measureEvent;
    }
    else{
      this.measureEvent = this.router.lastSuccessfulNavigation?.extras.state?.measureEvent;
    }

    if (this.router.url.includes('addEvent')) {
      this.schedualId = this.eventsGridData;
      this.getAccountingEventsData();
    }
    else {
      this.schedualId = this.eventsGridData.leaseRecognitionScheduleID;
      this.getAccountingEventsData();
    }
  }

  private getCommonDropDowns() {
    this.subscription.add(this.addEditScheduleService.getCommonDropdowns().subscribe((response: any) => {
      if (response === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (response.success) {
        this.commonDropdowns = response.data;
        this.amortizationProfiles = response.data.amortizationProfiles;
        this.currencyList = response.data.currencies;
      } else {
        this.accountingSummaryService.errorNotify(response.clientErrorMessage);
      }
    }));
  }

  private getClassificationSettings() {
    this.subscription.add(this.addEditScheduleService.getClassificationSettings().subscribe((response: any) => {
      if (response === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (response.success) {
        this.classificationSettings = response.data;
      }
      else {
        this.accountingSummaryService.errorNotify(response.clientErrorMessage);
      }
    }));
  }

  private getPortfolioSetting() {
    this.subscription.add(this.accountingSummaryService.getPortfolioSettings().subscribe((response: any) => {
      if (response === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (response.success) {
        this.portfolioSettings = response.data;
      } else {
        this.accountingSummaryService.errorNotify(response.clientErrorMessage);
      }
    }));
  }

  private getAccountingEventsData() {
    this.subscription.add(this.addEditScheduleService.getAccountingEventData(this.schedualId).subscribe((response: any) => {
      if (response === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (response.success) {
        this.accountingEventsData = response.data;
      } else {
        this.accountingSummaryService.errorNotify(response.clientErrorMessage);
      }
    }));
  }

  private getEventDateOptions() {
    this.subscription.add(this.addEditScheduleService.getDateOptions().subscribe((response: any) => {
      if (response === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (response.success) {
        this.eventDateOptions = response.data;
      }
      else {
        this.accountingSummaryService.errorNotify(response.clientErrorMessage);
      }
    }));
  }

  onClassificationChanged(classificationId: number) {
    this.classificationId = classificationId;
    if (this.accordion) {
      this.accordion.isOpen = false;
    }
  }

  scheduleDetailsDataChanged(data: any) {
    this.scheduleDetailsData = data;
  }
  
  getUserInfo() {
    this.subscription.add(this.accountingSummaryService.getUserInformation().subscribe(res => {
      if (res === null) {
        this.accountingSummaryService.displayContactSystemAdminMessage();
      }
      else if (res.success) {
        this.userInfo = res.data
      } else {
        this.accountingSummaryService.errorNotify(res.clientErrorMessage);
      }
    }));
  }
}