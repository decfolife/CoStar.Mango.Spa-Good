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
import { previousAccountingEvent } from '@accounting-summary/models/previous-accounting-event.model';
import { Subscription } from 'rxjs';
import { AddEventFormService } from '@accounting-summary/services/add-event-form.service';

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
  private subscription: Subscription[] = [];

  @Input() pageMode;
  @Input() accountingEventsData: previousAccountingEvent;

  constructor(
    public accountingSummaryService: AccountingSummaryService,
    private fb: FormBuilder,
    private formattingService: FormattingService,
    public addEventFormService: AddEventFormService
  ) {
    this.InitializeRVForm();
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
      estimatedResidualValue: [{ value: 0, disabled: false }],
      guaranteedAmountReflected: [{ value: 0, disabled: false }],
      rvGuaranteed: [{ value: 0, disabled: false }],
      rvGuaranteedBy3rdParty: [{ value: 0, disabled: false }],
      lessorExplicitlyExemptsLessee: [],
      rvGuaranteedByLessee: [{ value: 0, disabled: true }],
      amountProbableBeingOwedByLessee: [{ value: 0, disabled: true }],
      unguaranteedResidualValue: [{ value: 0, disabled: true }],
      amountNotReflectedPVPayments: [{ value: 0, disabled: true }],
      pvAmountNotReflectedInPayments: [{ value: 0, disabled: true }],
    });
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
            this.accountingEventsData.localCurrencyDecimalPrecision
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
      this.residualValueForm.valueChanges
        .pipe(debounceTime(debounce))
        .subscribe(() => {
          const RVFormData = this.residualValueForm.getRawValue();
          this.addEventFormService.setRVFormData(RVFormData);
        })
    );
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
            this.accountingEventsData.residualValues?.guaranteedResidualValue ??
            0
          ).toFixed(this.accountingEventsData.localCurrencyDecimalPrecision)
        );
      this.residualValueForm
        .get('rvGuaranteedBy3rdParty')
        .setValue(
          (
            this.accountingEventsData.residualValues?.rvGuaranteedBy3rdParty ??
            0
          ).toFixed(this.accountingEventsData.localCurrencyDecimalPrecision)
        );
      this.residualValueForm
        .get('rvGuaranteedByLessee')
        .setValue(
          this.formattingService.localFormat(
            this.accountingEventsData.residualValues?.rvGuaranteedByLessee ?? 0,
            this.accountingEventsData.localCurrencyDecimalPrecision
          )
        );
      this.residualValueForm
        .get('lessorExplicitlyExemptsLessee')
        .setValue(
          this.accountingEventsData?.residualValues
            ?.doesLessorExplicitlyExemptLessee ?? false
        );
      this.residualValueForm
        .get('amountProbableBeingOwedByLessee')
        .setValue(
          this.formattingService.localFormat(
            this.accountingEventsData.residualValues
              ?.amountProbableOfBeingOwedByLessee ?? 0,
            this.accountingEventsData.localCurrencyDecimalPrecision
          )
        );
      this.residualValueForm
        .get('unguaranteedResidualValue')
        .setValue(
          this.formattingService.localFormat(
            this.accountingEventsData.residualValues
              ?.unguaranteedResidualValue ?? 0,
            this.accountingEventsData.localCurrencyDecimalPrecision
          )
        );
      this.residualValueForm
        .get('amountNotReflectedPVPayments')
        .setValue(
          this.formattingService.localFormat(
            this.accountingEventsData.residualValues
              ?.amtNotReflectedInPVofPayments ?? 0,
            this.accountingEventsData.localCurrencyDecimalPrecision
          )
        );
      this.residualValueForm
        .get('pvAmountNotReflectedInPayments')
        .setValue(
          this.formattingService.localFormat(
            this.accountingEventsData.residualValues
              ?.pvOfAmtNotReflectedInPayments ?? 0,
            this.accountingEventsData.localCurrencyDecimalPrecision
          )
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
