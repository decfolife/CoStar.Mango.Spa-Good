import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { AddEditScheduleService } from '@accounting-summary/services/add-edit-schedule.service';
import { AddEventFormService } from '@accounting-summary/services/add-event-form.service';
import { UserInfoResponse } from '@accounting-summary/models/user-info-response.modal';
import { DatePipe } from '@angular/common';
import { combineLatest, Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { classificationSettingResponse } from '@accounting-summary/models/classification-settings-response.modal';
import { previousAccountingEvent } from '@accounting-summary/models/previous-accounting-event.model';
import { EventDateOptions } from '@accounting-summary/models/interfaces/event-date-options.interfaces';
import { PortfolioSettingsResponse } from '@accounting-summary/models/portfolio-settings-response.modal';

@Component({
  selector: 'mango-schedule-details',
  templateUrl: './schedule-details.component.html',
  styleUrls: ['./schedule-details.component.scss'],
})
export class ScheduleDetailsComponent implements OnInit, OnChanges, OnDestroy {
  @Input() eventsGridData: any;
  @Input() commonDropdowns: any;
  @Input() measureEvent: string;
  @Input() pageMode: string;
  @Input() eventDateOptions: EventDateOptions[];
  @Input() classificationSettings: classificationSettingResponse[];
  @Input() accountingEventsData: previousAccountingEvent;
  @Input() userInfo: UserInfoResponse;
  @Output() classificationChanged: EventEmitter<any> = new EventEmitter();
  @Output() scheduleDetailsData: EventEmitter<any> = new EventEmitter();

  title = 'Accounting Event Details ';
  subtitle = '';
  componentName = 'details';
  isEuroDateFormat = false;
  dateFormat = 'MM/dd/yyyy';
  classificationTypeList: any[];
  journalEntryProfileList: any[];
  defaultClassificationConfigurations: any;
  isClassificationDisabled = false;
  selectedClassificationID: number;
  selectedjournalEntryProfileID: number;
  journalEntryProfileRequired: boolean;
  isTermEndDateEnabled: boolean;
  isTermBeginDateEnabled: boolean;
  termEndDate: Date;
  termBeginDate: Date;
  selectedBeginDateID: number;
  selectedEndDateID: number;
  beginDateOptionsForEvents: any[];
  endDateOptionsForEvents: any[];
  termsValidationFailed = false;
  termCalculations: any;
  scheduleDetailsForm: FormGroup;
  reportingExceptionsList: any[];
  selectedExceptionId = 0;
  showReportExceptionComment = false;
  myOtherOptionData: string;
  isImpairedDisabled = false;
  isImpaired: boolean;
  termString: string;
  termInPeriods: number;
  termInMonths: number;
  termInDays: number;
  termInYear: number;
  loading: boolean;
  isTermBeginNot1stDayOfTheMonth = false;
  defaultClassificationFilterByMeasureEvent: any;
  setMeasureEvent: string;
  isTermBeginDirectEntry = false;
  isTermEnDirectEntry = false;
  termBeginDateObj: any;
  termEndDateObj: any;
  portfolioSettings: PortfolioSettingsResponse;
  scheduleDetailsformData: any;
  private subscription = new Subscription();
  private formSubscription$ = new Subject<void>();
  reportExceptionValidationPopup = false;
  openRemeasuringFromDay1Popup = false;

  constructor(
    public accountingSummaryService: AccountingSummaryService,
    public addEditScheduleService: AddEditScheduleService,
    public addEventFormService: AddEventFormService,
    private router: Router,
    private fb: FormBuilder,
    public datePipe: DatePipe
  ) {}
  ngOnChanges(changes: SimpleChanges) {
    if (
      (this.commonDropdowns !== undefined || this.commonDropdowns === null) &&
      (this.classificationSettings !== undefined ||
        this.classificationSettings === null) &&
      (this.accountingEventsData !== undefined ||
        this.accountingEventsData === null ||
        this.router.url.includes('addEvent'))
    ) {
      //This should only occur when the event options is changed from the chargeMinAndMaxDateOptionPopulated subject executing in the add-event component
      // if(!!changes.eventDateOptions && !changes.eventDateOptions.firstChange) {
      if (
        !!changes.eventDateOptions &&
        !!changes.eventDateOptions.previousValue &&
        changes.eventDateOptions.previousValue !==
          changes.eventDateOptions.currentValue
      ) {
        if (this.selectedBeginDateID === 9 || this.selectedEndDateID === 13) {
          this.onClassificationValueChanged([
            { classificationID: this.accountingEventsData?.classificationID },
          ]);
        } else {
          this.beginDateOptionsForEvents = this.getTermBeginDate(
            this.eventDateOptions
          );
          this.endDateOptionsForEvents = this.getTermEndDate(
            this.eventDateOptions
          );
        }

        return;
      } else {
        this.classificationTypeList =
          this.commonDropdowns?.classificationTypes.filter(
            (ClassificationType) => ClassificationType.isActive
          );
        this.beginDateOptionsForEvents = this.getTermBeginDate(
          this.eventDateOptions
        );
        this.endDateOptionsForEvents = this.getTermEndDate(
          this.eventDateOptions
        );
      }
      this.reportingExceptionsList = this.addNoExceptionEntry(
        this.commonDropdowns.reportingExceptions
      );

      if (this.router.url.includes('addEvent')) {
        this.subtitle = 'Add Event: Initial';
        this.scheduleDetailsForm.controls[
          'accountingEventBeginDate'
        ]?.disable();
        this.scheduleDetailsForm.controls['accountingEventEndDate']?.disable();
      } else if (this.router.url.includes('editEvent')) {
        this.loadScheduleDataforEdit();
      } else if (this.router.url.includes('remeasureEvent')) {
        this.loadScheduleDataforRemeasure();
      }
    }
  }

  loadScheduleDataforEdit() {
    this.subtitle = 'Edit Event: ' + this.accountingEventsData?.measureEvent;
    this.scheduleDetailsForm.controls['classificationId']?.disable();
    this.selectedClassificationID = this.accountingEventsData?.classificationID;
    this.selectedjournalEntryProfileID =
      this.accountingEventsData?.journalEntryProfileID;
    this.isImpaired = this.accountingEventsData.isImpaired;
    this.selectedExceptionId = this.accountingEventsData?.exceptionReason;
    this.isTermBeginNot1stDayOfTheMonth =
      this.accountingEventsData.includeFromFirst;
    this.scheduleDetailsForm
      .get('reportingExceptionReason')
      .setValue(this.accountingEventsData.exceptionOtherReason);
    this.scheduleDetailsForm
      .get('detailsSectionComments')
      .setValue(this.accountingEventsData.comments);

    if (this.accountingEventsData?.measureEvent === 'Initial') {
      this.isImpairedDisabled = false;
    } else {
      this.isImpairedDisabled = true;
    }
  }

  loadScheduleDataforRemeasure() {
    this.subtitle = 'Measure Event: ' + this.measureEvent;
    this.scheduleDetailsForm.controls['classificationId']?.disable();
    this.selectedClassificationID = this.accountingEventsData?.classificationID;
    this.selectedExceptionId = this.accountingEventsData.exceptionReason;
    this.scheduleDetailsForm
      .get('reportingExceptionReason')
      .setValue(this.accountingEventsData.exceptionOtherReason);
    this.isImpaired = this.eventsGridData.isImpaired;
    this.isImpairedDisabled = true;
    if (this.measureEvent === 'Impairment') {
      this.isImpaired = true;
    }
  }

  ngOnInit(): void {
    this.portfolioSettings = JSON.parse(
      localStorage.getItem('portfolioSettings') || '{}'
    );
    this.journalEntryProfileRequired =
      this.portfolioSettings?.journalEntryProfileRequired;

    this.initialscheduleForm();
    this.handleFormValueChanges();
    this.subtitle = 'Add Event: Initial';
  }

  initialscheduleForm() {
    this.scheduleDetailsForm = this.fb.group({
      classificationId: ['', Validators.required],
      journalEntryProfile: ['', Validators.required],
      accountingEventBeginDateDropdown: ['', Validators.required],
      accountingEventBeginDate: ['', Validators.required],
      accountingEventEndDateDropdown: ['', Validators.required],
      accountingEventEndDate: ['', Validators.required],
      notFirstDayOfTheMonth: [false, Validators.required],
      reportingExceptions: [''],
      reportingExceptionReason: [''],
      isImpaired: [false],
      detailsSectionComments: [''],
      includeCharges: [false],
    });
  }

  handleFormValueChanges() {
    const debounce = 300;
    combineLatest([
      this.scheduleDetailsForm
        .get('accountingEventBeginDate')
        ?.valueChanges.pipe(debounceTime(debounce)),
      this.scheduleDetailsForm
        .get('accountingEventEndDate')
        ?.valueChanges.pipe(debounceTime(debounce)),
    ])
      .pipe(takeUntil(this.formSubscription$))
      .subscribe(([accountingEventBeginDate, accountingEventEndDate]) => {
        const termBeginDate = this.addEditScheduleService.toShortDateString(
          accountingEventBeginDate
        );
        const termEndDate = this.addEditScheduleService.toShortDateString(
          accountingEventEndDate
        );

        if (termBeginDate && termEndDate) {
          if (termBeginDate > termEndDate) {
            this.setTermCalculationToDefault();
          } else {
            this.getEventsDateOptions(termBeginDate, termEndDate);
          }
        }
      });

    this.scheduleDetailsForm.valueChanges
      .pipe(
        debounceTime(debounce),
        distinctUntilChanged(),
        takeUntil(this.formSubscription$)
      )
      .subscribe(() => {
        const scheduleDetailsformData = this.scheduleDetailsForm.getRawValue();
        this.addEventFormService.setScheduleDetailsFormData(
          scheduleDetailsformData,
          this.termBeginDateObj,
          this.termEndDateObj
        );
      });

    this.scheduleDetailsForm
      .get('classificationId')
      ?.valueChanges.pipe(
        debounceTime(debounce),
        distinctUntilChanged(),
        takeUntil(this.formSubscription$)
      )
      .subscribe((classificationValue) => {
        this.classificationChanged.emit(classificationValue[0]);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.formSubscription$.next();
    this.formSubscription$.complete();
  }

  emitScheduleDetailsData() {
    const scheduleData = {
      termBegin: this.termBeginDate ? new Date(this.termBeginDate) : null,
      termEnd: this.termEndDate ? new Date(this.termEndDate) : null,
      termsInMonth: +this.termInMonths || 0,
    };
    this.scheduleDetailsData.emit(scheduleData);
  }

  onClassificationValueChanged(event: any) {
    if (event) {
      this.isTermBeginDirectEntry = true;
      this.isTermEnDirectEntry = true;
      this.journalEntryProfileList =
        this.commonDropdowns?.journalEntryProfiles.filter(
          (profile) =>
            profile.classificationID === event[0].classificationID &&
            profile.isActive
        );
      this.defaultClassificationConfigurations =
        this.classificationSettings.filter(
          (item) => item.classificationID === event[0].classificationID
        );

      this.setMeasureEvent = this.measureEvent || 'Initial';
      this.defaultClassificationFilterByMeasureEvent =
        this.defaultClassificationConfigurations.find(
          (item) => item.remeasureTypeName === this.setMeasureEvent
        );
      this.beginDateOptionsForEvents = this.getTermBeginDate(
        this.eventDateOptions
      );
      this.endDateOptionsForEvents = this.getTermEndDate(this.eventDateOptions);

      this.selectedBeginDateID =
        this.defaultClassificationFilterByMeasureEvent?.beginDateOptionID === 1
          ? this.defaultClassificationFilterByMeasureEvent?.beginDateFormItemID
          : this.defaultClassificationFilterByMeasureEvent?.beginDateOptionID;
      this.selectedEndDateID =
        this.defaultClassificationFilterByMeasureEvent?.endDateOptionID === 1
          ? this.defaultClassificationFilterByMeasureEvent?.endDateFormItemID
          : this.defaultClassificationFilterByMeasureEvent?.endDateOptionID;

      if (this.pageMode !== 'Add Event')
        if (this.selectedBeginDateID === 2) {
          this.termBeginDate = this.accountingEventsData.beginDate;
        }

      if (this.selectedEndDateID === 2) {
        this.termEndDate = this.accountingEventsData.endDate;
      }

      if (this.pageMode === 'Edit Event') {
        const selectedBeginDateID = this.accountingEventsData?.fromDateOptionID;
        const selectedEndDateID = this.accountingEventsData?.toDateOptionID;

        if (selectedBeginDateID === 2 || selectedBeginDateID !== 1) {
          this.selectedBeginDateID =
            this.accountingEventsData?.fromDateOptionID;
          this.scheduleDetailsForm
            .get('accountingEventBeginDate')
            .setValue(this.accountingEventsData?.beginDate);
        } else {
          this.selectedBeginDateID =
            this.defaultClassificationFilterByMeasureEvent.beginDateFormItemID;
        }

        if (selectedEndDateID === 2 || selectedEndDateID !== 1) {
          this.selectedEndDateID = this.accountingEventsData?.toDateOptionID;
          this.scheduleDetailsForm
            .get('accountingEventEndDate')
            .setValue(this.accountingEventsData?.endDate);
        } else {
          this.selectedEndDateID =
            this.defaultClassificationFilterByMeasureEvent.endDateFormItemID;
        }
      }

      if (this.defaultClassificationFilterByMeasureEvent) {
        if (
          this.defaultClassificationFilterByMeasureEvent.journalEntryOption ===
          'Direct Entry'
        ) {
          return;
        } else if (
          this.defaultClassificationFilterByMeasureEvent.journalEntryOption ===
          'Prior Value'
        ) {
          this.selectedjournalEntryProfileID =
            this.accountingEventsData?.journalEntryProfileID;
        } else {
          this.selectedjournalEntryProfileID =
            this.defaultClassificationFilterByMeasureEvent.journalEntryProfileID;
        }

        if (
          this.defaultClassificationFilterByMeasureEvent.commentsOption ===
          'Prior Comments'
        ) {
          this.scheduleDetailsForm
            .get('detailsSectionComments')
            .setValue(this.accountingEventsData?.comments);
        }
      }
    }
  }

  addNoExceptionEntry(originalArray: any[]): any[] {
    const updateReportingException = [...originalArray];
    updateReportingException.unshift({
      id: 0,
      name: 'No Exception',
      isActive: true,
    });
    return updateReportingException;
  }

  onReportingExceptionValueChanged(event: any) {
    if (
      event &&
      Array.isArray(event) &&
      event.some((item: any) => item.name === 'Other Reason')
    ) {
      this.showReportExceptionComment = true;
    } else {
      this.showReportExceptionComment = false;
    }
  }

  getTermBeginDate(eventDateOptions: any[]): any[] {
    this.isEuroDateFormat = this.userInfo?.useDateEU;
    this.dateFormat = this.isEuroDateFormat ? 'dd.MM.yyyy' : 'MM/dd/yyyy';

    return eventDateOptions
      ?.map((option) => {
        // Check if isFormItem is true and optionID is 1, then set optionID to formItemID
        if (option.isFormItem === true && option.optionID === 1) {
          option.optionID = option.formItemID;
        }

        if (
          option.optionID === 15 &&
          (option.optionDate === null ||
            isNaN(new Date(option.optionDate).getTime()))
        ) {
          option.optionDate = this.accountingEventsData?.beginDate
            ? new Date(this.accountingEventsData?.beginDate)
            : null;
        } else if (
          option.optionID === 17 &&
          (option.optionDate === null ||
            isNaN(new Date(option.optionDate).getTime()))
        ) {
          const endDate = this.accountingEventsData?.endDate
            ? new Date(this.accountingEventsData?.endDate)
            : new Date();
          endDate.setDate(endDate.getDate() + 1);
          option.optionDate = endDate;
        }
        return {
          ...option,
          accountingEventBeginDateDisplay: option.optionDate
            ? `${option.optionName} (${this.datePipe.transform(
                option.optionDate,
                this.dateFormat
              )})`
            : option.optionName,
        };
      })
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .filter(
        (option) =>
          option.isBeginDateOption === true &&
          (this.pageMode === 'Remeasure Event' || !option.isInitialExempt)
      );
  }

  getTermEndDate(eventDateOptions: any[]): any[] {
    this.isEuroDateFormat = this.userInfo?.useDateEU;
    this.dateFormat = this.isEuroDateFormat ? 'dd.MM.yyyy' : 'MM/dd/yyyy';

    return eventDateOptions
      ?.map((option) => {
        // Check if isFormItem is true and optionID is 1, then set optionID to formItemID
        if (option.isFormItem === true && option.optionID === 1) {
          option.optionID = option.formItemID;
        }

        if (
          option.optionID === 16 &&
          (option.optionDate === null ||
            isNaN(new Date(option.optionDate).getTime()))
        ) {
          option.optionDate = this.accountingEventsData?.endDate
            ? new Date(this.accountingEventsData?.endDate)
            : null;
        }
        return {
          ...option,
          accountingEventEndDateDisplay: option.optionDate
            ? `${option.optionName} (${this.datePipe.transform(
                option.optionDate,
                this.dateFormat
              )})`
            : option.optionName,
        };
      })
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .filter(
        (option) =>
          option.isEndDateOption === true &&
          (this.pageMode === 'Remeasure Event' || !option.isInitialExempt)
      );
  }

  setTermBeginDate(event: any) {
    if (event.length === 0) {
      this.termBeginDate = null;
      this.setTermCalculationToDefault();
    } else {
      this.termBeginDateObj = event[0];
      if (event[0].optionDate) {
        this.isTermBeginDirectEntry = false;
        this.termBeginDate = new Date(event[0].optionDate);
        this.scheduleDetailsForm.controls[
          'accountingEventBeginDate'
        ]?.disable();
      } else if (
        event[0].optionName === 'Direct Entry' &&
        !this.isTermBeginDirectEntry
      ) {
        this.termBeginDate = null;
        this.scheduleDetailsForm.controls['accountingEventBeginDate']?.enable();
      } else if (
        event[0].optionName === 'Direct Entry' &&
        this.isTermBeginDirectEntry
      ) {
        this.scheduleDetailsForm.controls['accountingEventBeginDate']?.enable();
      } else {
        this.isTermBeginDirectEntry = false;
        this.termBeginDate = null;
        this.scheduleDetailsForm.controls[
          'accountingEventBeginDate'
        ]?.disable();
      }
    }
    this.emitScheduleDetailsData();
  }

  setTermEndDate(event: any) {
    if (event.length === 0) {
      this.termEndDate = null;
      this.setTermCalculationToDefault();
    } else {
      this.termEndDateObj = event[0];
      if (event[0].optionDate) {
        this.isTermEnDirectEntry = false;
        this.termEndDate = new Date(event[0].optionDate);
        this.scheduleDetailsForm.controls['accountingEventEndDate']?.disable();
      } else if (
        event[0].optionName === 'Direct Entry' &&
        !this.isTermEnDirectEntry
      ) {
        this.termEndDate = null;
        this.scheduleDetailsForm.controls['accountingEventEndDate']?.enable();
      } else if (
        event[0].optionName === 'Direct Entry' &&
        this.isTermEnDirectEntry
      ) {
        this.scheduleDetailsForm.controls['accountingEventEndDate']?.enable();
      } else {
        this.isTermEnDirectEntry = false;
        this.termEndDate = null;
        this.scheduleDetailsForm.controls['accountingEventEndDate']?.disable();
      }
    }
    this.emitScheduleDetailsData();
  }

  onTermBeginDateChange(event: any) {
    this.termBeginDate = event.value ? new Date(event.value) : null;
    this.validateDates();
  }

  onTermEndDateChange(event: any) {
    this.termEndDate = event.value ? new Date(event.value) : null;
    if (this.measureEvent === 'Full Termination') {
      this.termBeginDate = this.termEndDate;
      this.scheduleDetailsForm.controls['accountingEventBeginDate']?.disable();
      this.scheduleDetailsForm.controls[
        'accountingEventBeginDateDropdown'
      ]?.disable();
      this.setTermCalculationToDefault();
    }
  }

  validateDates() {
    const remeasureEvent = this.accountingEventsData?.measureEvent;
    if (
      (this.termBeginDate && this.pageMode === 'Add Event') ||
      (this.pageMode === 'Edit Event' && remeasureEvent === 'Initial')
    ) {
      this.termsValidationFailed =
        new Date(this.termBeginDate).getDate() > 1 ? true : false;
    }
  }

  setTermCalculationToDefault() {
    this.termString = '';
    this.termInPeriods = 0;
    this.termInMonths = 0;
    this.termInDays = 0;
    this.termInYear = 0;
  }

  updateServiceTermValues() {
    this.addEventFormService.setTermValues(
      this.termString,
      this.termInPeriods,
      this.termInMonths,
      this.termInDays,
      this.termInYear
    );
  }

  private getEventsDateOptions(termBeginDate: string, termEndDate: string) {
    this.subscription.add(
      this.addEditScheduleService
        .getTermCalculations(termBeginDate, termEndDate)
        .subscribe((response: any) => {
          if (response === null) {
            this.accountingSummaryService.displayContactSystemAdminMessage();
          } else if (response.success) {
            this.termCalculations = response.data;
            this.termString = response.data.termString;
            this.termInPeriods = response.data.termInPeriods;
            this.termInMonths = response.data.termInMonths.toFixed(2);
            this.termInDays = response.data.termInDays;
            this.termInYear = response.data.termInYears;
            this.emitScheduleDetailsData();
            this.updateServiceTermValues();
          } else {
            this.accountingSummaryService.errorNotify(
              response.clientErrorMessage
            );
          }
        })
    );
  }
}
