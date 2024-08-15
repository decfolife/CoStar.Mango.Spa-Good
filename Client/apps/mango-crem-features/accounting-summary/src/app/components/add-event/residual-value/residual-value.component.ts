import { Component, Input, OnChanges, OnInit} from '@angular/core';
import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { FormattingService } from '@accounting-summary/services/formatting.service';
import { UserInfoResponse } from '@accounting-summary/models/user-info-response.modal';
import { AccordionModule, InputComponent, InputLabelComponent, ToggleSliderComponent } from '@mango/ui-shared/lib-ui-elements';
import { CommonModule } from '@angular/common';
import { previousAccountingEvent } from '@accounting-summary/models/previous-accounting-event.model';

@Component({
  selector: 'mango-residual-value',
  standalone: true,
  imports: [CommonModule, AccordionModule, InputComponent, InputLabelComponent, ToggleSliderComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './residual-value.component.html',
  styleUrls: ['./residual-value.component.scss']
})
export class ResidualValueComponent implements OnInit, OnChanges {
  componentName = 'residual-value'
  estimatedSubText: string;
  isDisabled = true;
  residualValueForm: FormGroup;
  showResidualValue = false;
  isAccordionOpen = false;

  @Input() pageMode;
  @Input() classificationId;
  @Input() accountingEventsData: previousAccountingEvent;
  @Input() userInfo: UserInfoResponse;

  constructor(
    public accountingSummaryService: AccountingSummaryService,
    private fb: FormBuilder,
    private formattingService: FormattingService) { }


  ngOnChanges(): void {
    if (this.accountingEventsData !== undefined || this.accountingEventsData === null && this.pageMode !== undefined || this.pageMode === null 
      || this.classificationId === null && this.classificationId !== undefined || this.userInfo === null || this.userInfo !== undefined) {
      this.isAccordionOpen = this.userInfo?.collapseRVSection;
      if (this.pageMode !== 'Add Event' && this.accountingEventsData) {
        this.estimatedSubText = 'Estimated: ' + this.formattingService.localFormat(this.accountingEventsData?.estimatedResidualValue, this.accountingEventsData?.localCurrencyDecimalPrecision);
        this.residualValueForm.get('estimatedResidualValue').setValue((this.accountingEventsData.estimatedResidualValue ?? 0).toFixed(this.accountingEventsData.localCurrencyDecimalPrecision));
        this.residualValueForm.get('guaranteedAmountReflected').setValue((this.accountingEventsData.guaranteedAmtReflectedInPayments ?? 0).toFixed(this.accountingEventsData.localCurrencyDecimalPrecision));
        this.residualValueForm.get('rvGuaranteed').setValue((this.accountingEventsData.guaranteedResidualValue ?? 0).toFixed(this.accountingEventsData.localCurrencyDecimalPrecision));
        this.residualValueForm.get('rvGuaranteedBy3rdParty').setValue((this.accountingEventsData.rvGuaranteedBy3rdParty ?? 0).toFixed(this.accountingEventsData.localCurrencyDecimalPrecision));
        this.residualValueForm.get('rvGuaranteedByLessee').setValue(this.formattingService.localFormat(this.accountingEventsData.rvGuaranteedByLessee ?? 0, this.accountingEventsData.localCurrencyDecimalPrecision));
        this.residualValueForm.get('amountProbableBeingOwedByLessee').setValue(this.formattingService.localFormat(this.accountingEventsData.amountProbableOfBeingOwedByLessee ?? 0, this.accountingEventsData.localCurrencyDecimalPrecision));
        this.residualValueForm.get('unguaranteedResidualValue').setValue(this.formattingService.localFormat(this.accountingEventsData.unguaranteedResidualValue ?? 0, this.accountingEventsData.localCurrencyDecimalPrecision));
        this.residualValueForm.get('amountNotReflectedPVPayments').setValue(this.formattingService.localFormat(this.accountingEventsData.amtNotReflectedInPVofPayments ?? 0, this.accountingEventsData.localCurrencyDecimalPrecision));
        this.residualValueForm.get('pvAmountNotReflectedInPayments').setValue(this.formattingService.localFormat(this.accountingEventsData.pvOfAmtNotReflectedInPayments ?? 0, this.accountingEventsData.localCurrencyDecimalPrecision));
      }
    }
  }

  ngOnInit(): void {

    this.residualValueForm = this.fb.group({
      estimatedResidualValue: [0],
      guaranteedAmountReflected: [0],
      rvGuaranteed: [0],
      rvGuaranteedBy3rdParty: [0],
      lessorExplicitlyExemptsLessee: [],
      rvGuaranteedByLessee: [{ value: 0, disabled: true }],
      amountProbableBeingOwedByLessee: [{ value: 0, disabled: true }],
      unguaranteedResidualValue: [{ value: 0, disabled: true }],
      amountNotReflectedPVPayments: [{ value: 0, disabled: true }],
      pvAmountNotReflectedInPayments: [{ value: 0, disabled: true }],
    });

    this.estimatedSubText = 'Estimated: ' + this.residualValueForm.get('estimatedResidualValue').value;
    this.residualValueForm.get('lessorExplicitlyExemptsLessee').disable(); 
    this.residualValueForm.valueChanges.pipe(
      debounceTime(100)
    ).subscribe((value) => {
      const estimatedResidualValue = this.formattingService.localFormat(this.residualValueForm.get('estimatedResidualValue').value, this.accountingEventsData.localCurrencyDecimalPrecision);
      this.estimatedSubText = 'Estimated: ' + estimatedResidualValue;
      this.lessorExplicitlyExemptsLessee();
    });
  }

  lessorExplicitlyExemptsLessee() {
    const rvGuaranteedBy3rdParty = this.residualValueForm.get('rvGuaranteedBy3rdParty').value;
    if (rvGuaranteedBy3rdParty > 0) {
      this.residualValueForm.get('lessorExplicitlyExemptsLessee').enable();
    }
    else {
      this.residualValueForm.get('lessorExplicitlyExemptsLessee').disable();
    }
  }
}



