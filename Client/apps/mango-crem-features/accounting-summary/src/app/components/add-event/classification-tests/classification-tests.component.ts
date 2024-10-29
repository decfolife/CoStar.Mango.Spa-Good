import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AccordionModule,
  ToggleSliderComponent,
  InputComponent,
  DropdownModule,
  IconModule,
  ButtonModule,
} from '@mango/ui-shared/lib-ui-elements';
import { FormattingService } from '@accounting-summary/services/formatting.service';
import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { Subscription } from 'rxjs';
import { AddEditScheduleService } from '@accounting-summary/services/add-edit-schedule.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AddEventFormService } from '@accounting-summary/services/add-event-form.service';

@Component({
  selector: 'mango-classification-tests',
  standalone: true,
  imports: [
    CommonModule,
    AccordionModule,
    ToggleSliderComponent,
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    IconModule,
    ButtonModule,
  ],
  providers: [FormattingService],
  templateUrl: './classification-tests.component.html',
  styleUrls: ['./classification-tests.component.scss'],
})
export class ClassificationTestsComponent
  implements OnChanges, OnInit, OnDestroy
{
  componentName: string = 'classification-tests';
  leaseTermIsTrue: boolean = null;
  size: string;
  classificationTestForm: FormGroup;
  isfairMarketHasValue: boolean = false;
  implicitInterestRate: string;
  subtitle: string;
  @Input() accountingEventsData: any;
  @Input() classificationId: any;
  @Input() pageMode;

  test1: boolean;
  test2: boolean;
  test3: number;
  test4: number;
  test5: boolean;

  test3BoolValue: boolean;
  test4BoolValue: boolean;

  testDropdownValues: any[];

  isResultsIncomplete: boolean = true;
  isClassificationMatched: boolean = null;
  classificationResult: string = null;
  classificationResultReason: string = null;

  economicLifeYears: number = 0.0;
  remainingTermYears: number = 0.0;
  fairMarketValue: number = 0.0;
  presentValue: number = 0.0;
  pVofAmtNotReflectedInPayments: number = 0.0;
  private subscriptions: Subscription[] = [];

  constructor(
    public formatService: FormattingService,
    public accountingSummaryService: AccountingSummaryService,
    private fb: FormBuilder,
    private addEditScheduleService: AddEditScheduleService,
    public addEventFormService: AddEventFormService
  ) {
    this.initializeClassificationForm();
  }

  ngOnInit(): void {
    this.handleFormValueChanges();
    this.setupTestDropdowns();
  }

  handleFormValueChanges() {
    const debounce = 300;
    this.subscriptions.push(
      this.classificationTestForm.valueChanges
        .pipe(debounceTime(debounce), distinctUntilChanged())
        .subscribe(() => {
          const classificationTestData = {
            classificationFormData: this.classificationTestForm.getRawValue(),
            implicitRate: this.implicitInterestRate,
            classificationTestResult: this.classificationResult,
            classificationTestResultReason: this.classificationResultReason,
            isClassificationTestResultMatched: this.isClassificationMatched,
            test3: this.test3,
            test4: this.test4,
          };
          setTimeout(() => {
            this.addEventFormService.setClassificationFormData(
              classificationTestData
            );
          });
        })
    );

    this.subscriptions.push(
      this.classificationTestForm
        .get('fairMarketValue')
        .valueChanges.pipe(debounceTime(debounce), distinctUntilChanged())
        .subscribe((fairMarketValue) => {
          if (fairMarketValue && fairMarketValue != 0) {
            this.isfairMarketHasValue = true;
          } else {
            this.isfairMarketHasValue = false;
          }
        })
    );

    this.subscriptions.push(
      this.addEventFormService.calculateValuesResponseData$
        .pipe(debounceTime(debounce))
        .subscribe((calculateValuesResponseData) => {
          this.implicitInterestRate =
            calculateValuesResponseData.implicitRate * 100 + '%';
          this.presentValue = calculateValuesResponseData.presentValue;
        })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnChanges(): void {
    if (this.accountingEventsData && this.classificationId) {
      if (this.pageMode === 'Edit Event') {
        this.loadSavedData();
      }
      this.getClassificationTestResults();
    }
  }

  loadSavedData() {
    this.test1 = this.accountingEventsData.test1;
    this.test2 = this.accountingEventsData.test2;
    this.test3 = this.accountingEventsData.test3;
    this.test4 = this.accountingEventsData.test4;
    this.test5 = this.accountingEventsData.test5;
    this.classificationTestForm
      .get('remainingEconomicLife')
      .setValue(this.accountingEventsData.economicLifeYears);
    this.classificationTestForm
      .get('fairMarketValue')
      .setValue(this.accountingEventsData.fmv);
    this.economicLifeYears = this.accountingEventsData.economicLifeYears;
    this.fairMarketValue = this.accountingEventsData.fmv;
    this.implicitInterestRate =
      this.accountingEventsData.implicitRate * 100 + '%';
    this.presentValue =
      this.accountingEventsData.presentValue ?? this.presentValue;
    this.pVofAmtNotReflectedInPayments =
      this.accountingEventsData.pVofAmtNotReflectedInPayments ??
      this.pVofAmtNotReflectedInPayments;
    this.remainingTermYears = this.accountingEventsData.termInYears;
    this.economicLifePercent();
    this.pvPercent();
  }

  initializeClassificationForm() {
    this.classificationTestForm = this.fb.group({
      remainingEconomicLife: new FormControl({ value: null, disabled: false }),
      fairMarketValue: new FormControl({ value: null, disabled: false }),
      implicitInterestRate: new FormControl({ value: null, disabled: true }),
      classificationTest1: new FormControl({}),
      classificationTest2: new FormControl({}),
      classificationTest3: new FormControl({ value: null, disabled: true }),
      classificationTest4: new FormControl({ value: null, disabled: true }),
      classificationTest5: new FormControl({}),
    });
  }

  testDropdownChanged(e, dropdownName: string) {
    let newValue = e[0].tValue === 0 ? false : e[0].tValue === 1 ? true : null;

    switch (dropdownName) {
      case 'test1': {
        this.test1 = newValue;
        this.getClassificationTestResults();
        break;
      }
      case 'test2': {
        this.test2 = newValue;
        this.getClassificationTestResults();
        break;
      }
      case 'test5': {
        this.test5 = newValue;
        this.getClassificationTestResults();
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }

  economicLifeChange() {
    this.economicLifePercent();
    this.getClassificationTestResults();
  }

  fairMarketChange() {
    this.pvPercent();
    this.getClassificationTestResults();
  }

  economicLifePercent() {
    let result: number = 0;
    let relValue: string = this.classificationTestForm.get(
      'remainingEconomicLife'
    ).value;

    if (!!!relValue || relValue === '') {
      this.economicLifeYears = null;
      this.test3 = null;
      this.test3BoolValue = null;

      return;
    } else {
      this.economicLifeYears = Number(relValue);

      if (this.economicLifeYears !== 0) {
        result = (this.remainingTermYears / this.economicLifeYears) * 100;
      }
    }

    if (isNaN(result) || result === Infinity) {
      result = 0;
    }

    this.test3 = Number(
      this.formatService.localFormat(result, 2).replace(/,/g, '')
    );
    this.test3BoolValue = this.test3 >= 75;
  }

  pvPercent() {
    let result: number = 0;
    let fmValue = this.classificationTestForm.get('fairMarketValue').value;

    if (!!!fmValue || fmValue === '') {
      this.fairMarketValue = null;
      this.test4 = null;
      this.test4BoolValue = null;

      return;
    } else {
      this.fairMarketValue = Number(fmValue);

      if (this.fairMarketValue !== 0) {
        result =
          ((this.presentValue + this.pVofAmtNotReflectedInPayments) /
            this.fairMarketValue) *
          100;
      }
    }

    if (isNaN(result) || result === Infinity) {
      result = 0;
    }

    this.test4 = Number(
      this.formatService.localFormat(result, 2).replace(/,/g, '')
    );
    this.test4BoolValue = this.test4 >= 90;
  }

  getTestDropdownValue(value) {
    let returnValue = value == null ? 2 : value ? 1 : 0;

    return returnValue;
  }

  getTest3Value() {
    return this.test3BoolValue === null
      ? ''
      : this.test3BoolValue
      ? 'Yes'
      : 'No';
  }

  getTest4Value() {
    return this.test4BoolValue === null
      ? ''
      : this.test4BoolValue
      ? 'Yes'
      : 'No';
  }

  private setupTestDropdowns() {
    let testDropdownValues = [
      { tValue: 2, tDisplay: '-' },
      { tValue: 1, tDisplay: 'Yes' },
      { tValue: 0, tDisplay: 'No' },
    ];

    this.testDropdownValues = Object.assign([], testDropdownValues);
    this.test1 = null;
    this.test2 = null;
    this.test3 = null;
    this.test4 = null;
    this.test5 = null;
    this.test3BoolValue = null;
    this.test4BoolValue = null;
  }

  private getClassificationTestResults() {
    if (this.classificationId >= 0) {
      this.subscriptions.push(
        this.addEditScheduleService
          .getClassificationTestResults(
            this.classificationId,
            this.test1,
            this.test2,
            this.test3BoolValue,
            this.test4BoolValue,
            this.test5
          )
          .subscribe((res) => {
            if (res === null) {
              this.accountingSummaryService.displayContactSystemAdminMessage();
            } else if (res.success) {
              this.isResultsIncomplete = res?.data?.result
                ?.toLowerCase()
                .includes('incomplete');
              this.isClassificationMatched = res.data.isClassificationMatched;
              this.classificationResult = res.data.result;
              this.classificationResultReason = res.data.resultReason;
              this.subtitle = `Test Result: ${this.classificationResult}`;
            } else {
              this.accountingSummaryService.errorNotify(res.clientErrorMessage);
            }
          })
      );
    }
  }
}
