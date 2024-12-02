import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { FormattingService } from '@accounting-summary/services/formatting.service';
import {
  AccordionModule,
  InputComponent,
  InputLabelComponent,
  ToggleSliderComponent,
} from '@mango/ui-shared/lib-ui-elements';
import { CommonModule } from '@angular/common';
import { PreviousAccountingEvent } from '@accounting-summary/models/previous-accounting-event.model';
import { Subscription } from 'rxjs';
import { AddEventFormService } from '@accounting-summary/services/add-event-form.service';
import { ResidualValues } from '@accounting-summary/models/interfaces/residual-values-interfaces';
import { AddEditScheduleService } from '@accounting-summary/services/add-edit-schedule.service';

@Component({
  selector: 'mango-residual-value',
  standalone: true,
  imports: [
    CommonModule,
    AccordionModule,
    InputComponent,
    InputLabelComponent,
    ToggleSliderComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './residual-value.component.html',
  styleUrls: ['./residual-value.component.scss'],
})
export class ResidualValueComponent implements OnInit, OnChanges, OnDestroy {
  componentName = 'residual-value';
  estimatedSubText: string;
  isDisabled = true;
  residualValueForm: FormGroup;
  showResidualValue = false;
  isAccordionOpen = false;
  residualValuesResponse: ResidualValues;
  totalAmount: number;
  rvGuaranteedByLessee: string;
  amountProbableBeingOwedByLessee: string;
  unguaranteedResidualValue: string;
  amountNotReflectedPVPayments: string;
  pvAmountNotReflectedInPayments: string;
  localCurrencyDecimalPrecision: number;
  private subscription: Subscription[] = [];

  @Input() pageMode;
  @Input() accountingEventsData: PreviousAccountingEvent;

  constructor(
    public accountingSummaryService: AccountingSummaryService,
    private fb: FormBuilder,
    private formattingService: FormattingService,
    public addEventFormService: AddEventFormService,
    public addEditScheduleService: AddEditScheduleService
  ) {
    this.InitializeRVForm();
    this.subscription.push(
      addEventFormService.decimalPrecision$.subscribe((precision) => {
        if (precision != this.localCurrencyDecimalPrecision) {
          this.localCurrencyDecimalPrecision = precision;
          this.updateDecimalprecision();
        }
      })
    );
  }

  ngOnChanges(): void {
    if (this.accountingEventsData !== undefined) {
      this.loadSavedData();
    }
  }

  ngOnInit(): void {
    this.handleRVFormChanges();
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  InitializeRVForm() {
    this.residualValueForm = this.fb.group({
      estimatedResidualValue: [
        { value: this.formatCurrency(0), disabled: false },
      ],
      guaranteedAmountReflected: [
        { value: this.formatCurrency(0), disabled: false },
      ],
      rvGuaranteed: [{ value: this.formatCurrency(0), disabled: false }],
      rvGuaranteedBy3rdParty: [
        { value: this.formatCurrency(0), disabled: false },
      ],
      lessorExplicitlyExemptsLessee: [{ value: false, disabled: false }],
    });
  }

  formatCurrency(value: number) {
    return this.formattingService.localFormat(
      value,
      this.localCurrencyDecimalPrecision
    );
  }

  handleRVFormChanges() {
    const debounce = 300;
    this.estimatedSubText =
      'Estimated: ' +
      this.residualValueForm.get('estimatedResidualValue').value;
    this.residualValueForm.get('lessorExplicitlyExemptsLessee').disable();

    this.subscription.push(
      this.residualValueForm
        .get('estimatedResidualValue')
        .valueChanges.pipe(debounceTime(debounce))
        .subscribe(() => {
          const estimatedResidualValue = this.formattingService.localFormat(
            this.residualValueForm.get('estimatedResidualValue')?.value,
            this.accountingEventsData?.localCurrencyDecimalPrecision ?? 2
          );
          this.estimatedSubText = 'Estimated: ' + estimatedResidualValue;
        })
    );

    this.subscription.push(
      this.residualValueForm
        .get('rvGuaranteedBy3rdParty')
        .valueChanges.pipe(debounceTime(debounce))
        .subscribe(() => {
          this.lessorExplicitlyExemptsLessee();
        })
    );

    this.subscription.push(
      this.addEventFormService.paymentAmountsData$.subscribe(
        (paymentAmountsData) => {
          this.totalAmount = +paymentAmountsData?.undiscountedAmount || 0;
        }
      )
    );

    this.subscription.push(
      this.residualValueForm.valueChanges
        .pipe(debounceTime(debounce))
        .subscribe(() => {
          const RVFormData = this.residualValueForm.getRawValue();
          this.addEventFormService.setRVFormData(RVFormData);

          this.residualValueValidation();
        })
    );

    this.subscription.push(
      this.addEventFormService.accountingEventData$.subscribe(
        (currencyDecimalPrecision) => {
          this.localCurrencyDecimalPrecision =
            currencyDecimalPrecision?.localCurrencyDecimalPrecision;
        }
      )
    );

    this.subscription.push(
      this.addEventFormService.calculateValuesResponseData$
        .pipe(debounceTime(debounce))
        .subscribe((calculateValuesResponseData) => {
          this.residualValuesResponse =
            calculateValuesResponseData?.residualValues;
          this.rvGuaranteedByLessee = this.formattingService.localFormat(
            this.residualValuesResponse?.residualValueGuaranteedByLessee,
            this.localCurrencyDecimalPrecision
          );
          this.amountProbableBeingOwedByLessee =
            this.formattingService.localFormat(
              this.residualValuesResponse?.amountProbableOfBeingOwedByLessee,
              this.localCurrencyDecimalPrecision
            );
          this.unguaranteedResidualValue = this.formattingService.localFormat(
            this.residualValuesResponse?.unguaranteedResidualValue,
            this.localCurrencyDecimalPrecision
          );
          this.amountNotReflectedPVPayments =
            this.formattingService.localFormat(
              this.residualValuesResponse?.amtNotReflectedInPVofPayments,
              this.localCurrencyDecimalPrecision
            );
          this.pvAmountNotReflectedInPayments =
            this.formattingService.localFormat(
              this.residualValuesResponse
                ?.presentValueOnAmtNotReflectedInPayments,
              this.localCurrencyDecimalPrecision
            );
        })
    );
  }

  updateDecimalprecision() {
    this.residualValueForm
      .get('estimatedResidualValue')
      .setValue(
        this.formatCurrency(
          this.residualValueForm.get('estimatedResidualValue').value
        )
      );
    this.residualValueForm
      .get('rvGuaranteed')
      .setValue(
        this.formatCurrency(this.residualValueForm.get('rvGuaranteed').value)
      );
    this.residualValueForm
      .get('guaranteedAmountReflected')
      .setValue(
        this.formatCurrency(
          this.residualValueForm.get('guaranteedAmountReflected').value
        )
      );
    this.residualValueForm
      .get('rvGuaranteedBy3rdParty')
      .setValue(
        this.formatCurrency(
          this.residualValueForm.get('rvGuaranteedBy3rdParty').value
        )
      );
    this.rvGuaranteedByLessee = this.rvGuaranteedByLessee
      ? this.formatCurrency(Number(this.rvGuaranteedByLessee))
      : null;
    this.amountProbableBeingOwedByLessee = this.amountProbableBeingOwedByLessee
      ? this.formatCurrency(Number(this.amountProbableBeingOwedByLessee))
      : null;
    this.unguaranteedResidualValue = this.unguaranteedResidualValue
      ? this.formatCurrency(Number(this.unguaranteedResidualValue))
      : null;
    this.amountNotReflectedPVPayments = this.amountNotReflectedPVPayments
      ? this.formatCurrency(Number(this.amountNotReflectedPVPayments))
      : null;
    this.pvAmountNotReflectedInPayments = this.pvAmountNotReflectedInPayments
      ? this.formatCurrency(Number(this.pvAmountNotReflectedInPayments))
      : null;
  }

  residualValueValidation() {
    const estimatedResidualValue = +this.residualValueForm.get(
      'estimatedResidualValue'
    ).value;
    const rvGuaranteed = +this.residualValueForm.get('rvGuaranteed').value;
    const RVGuaranteedBy3rdParty = +this.residualValueForm.get(
      'rvGuaranteedBy3rdParty'
    ).value;
    const guaranteedAmountReflected = +this.residualValueForm.get(
      'guaranteedAmountReflected'
    ).value;

    const totalAmount = Math.round(this.totalAmount * 100) / 100;

    let isValid = true; // Track overall validation status
    if (estimatedResidualValue < 0) {
      this.addEditScheduleService.showToast(
        'Estimated Residual Value',
        `Estimated residual value must be greater than or equal to zero.`
      );
      isValid = false;
    } else {
      this.addEditScheduleService.clearToastBySummary(
        'Estimated Residual Value'
      );
    }

    if (rvGuaranteed < 0) {
      this.addEditScheduleService.showToast(
        'RV guaranteed',
        `RV guaranteed must be greater than or equal to zero.`
      );
      isValid = false;
    } else {
      this.addEditScheduleService.clearToastBySummary('RV guaranteed');
    }

    if (RVGuaranteedBy3rdParty < 0 || RVGuaranteedBy3rdParty > rvGuaranteed) {
      this.addEditScheduleService.showToast(
        'RV Guaranteed by 3rd Party',
        `RV guaranteed by 3rd party must be between zero and RV guaranteed.`
      );
      isValid = false;
    } else {
      this.addEditScheduleService.clearToastBySummary(
        'RV Guaranteed by 3rd Party'
      );
    }

    if (
      guaranteedAmountReflected < 0 ||
      guaranteedAmountReflected > totalAmount
    ) {
      this.addEditScheduleService.showToast(
        'Guaranteed Amount Reflected in Payments',
        `Guaranteed amount reflected in payments must be between zero and the total amount.`
      );
      isValid = false;
    } else {
      this.addEditScheduleService.clearToastBySummary(
        'Guaranteed Amount Reflected in Payments'
      );
    }
    this.addEventFormService.isCalculateValuesDisabled.next(!isValid);
    this.addEventFormService.isSaveDisabled.next(!isValid);
  }

  loadSavedData() {
    if (this.pageMode !== 'Add Event' && this.accountingEventsData) {
      this.estimatedSubText =
        'Estimated: ' +
        this.formattingService.localFormat(
          this.accountingEventsData?.residualValues?.estimatedResidualValue,
          this.accountingEventsData?.localCurrencyDecimalPrecision
        );
      this.residualValueForm
        .get('estimatedResidualValue')
        .setValue(
          (
            this.accountingEventsData.residualValues?.estimatedResidualValue ??
            0
          ).toFixed(this.accountingEventsData.localCurrencyDecimalPrecision)
        );
      this.residualValueForm
        .get('guaranteedAmountReflected')
        .setValue(
          (
            this.accountingEventsData.residualValues
              ?.guaranteedAmtReflectedInPayments ?? 0
          ).toFixed(this.accountingEventsData.localCurrencyDecimalPrecision)
        );
      this.residualValueForm
        .get('rvGuaranteed')
        .setValue(
          (
            this.accountingEventsData.residualValues?.residualValue ?? 0
          ).toFixed(this.accountingEventsData.localCurrencyDecimalPrecision)
        );
      this.residualValueForm
        .get('rvGuaranteedBy3rdParty')
        .setValue(
          (
            this.accountingEventsData.residualValues
              ?.residualValueGuaranteedBy3rdParty ?? 0
          ).toFixed(this.accountingEventsData.localCurrencyDecimalPrecision)
        );
      this.rvGuaranteedByLessee = this.formattingService.localFormat(
        this.accountingEventsData.residualValues
          ?.residualValueGuaranteedByLessee ?? 0,
        this.accountingEventsData.localCurrencyDecimalPrecision
      );
      this.amountProbableBeingOwedByLessee = this.formattingService.localFormat(
        this.accountingEventsData.residualValues
          ?.amountProbableOfBeingOwedByLessee ?? 0,
        this.accountingEventsData.localCurrencyDecimalPrecision
      );
      this.unguaranteedResidualValue = this.formattingService.localFormat(
        this.accountingEventsData.residualValues?.unguaranteedResidualValue ??
          0,
        this.accountingEventsData.localCurrencyDecimalPrecision
      );
      this.amountNotReflectedPVPayments = this.formattingService.localFormat(
        this.accountingEventsData.residualValues
          ?.amtNotReflectedInPVofPayments ?? 0,
        this.accountingEventsData.localCurrencyDecimalPrecision
      );
      this.pvAmountNotReflectedInPayments = this.formattingService.localFormat(
        this.accountingEventsData.residualValues
          ?.presentValueOnAmtNotReflectedInPayments ?? 0,
        this.accountingEventsData.localCurrencyDecimalPrecision
      );
    }
  }

  lessorExplicitlyExemptsLessee() {
    const rvGuaranteedBy3rdParty = this.residualValueForm.get(
      'rvGuaranteedBy3rdParty'
    ).value;
    if (rvGuaranteedBy3rdParty > 0) {
      this.residualValueForm.get('lessorExplicitlyExemptsLessee').enable();
    } else {
      this.residualValueForm.get('lessorExplicitlyExemptsLessee').disable();
    }
  }
}
