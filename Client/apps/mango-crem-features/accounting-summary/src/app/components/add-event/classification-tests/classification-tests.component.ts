import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule, ToggleSliderComponent, InputComponent } from '@mango/ui-shared/lib-ui-elements';
import { FormattingService } from '@accounting-summary/services/formatting.service';
import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'mango-classification-tests',
  standalone: true,
  imports: [CommonModule, AccordionModule, ToggleSliderComponent, InputComponent, FormsModule, ReactiveFormsModule],
  providers: [FormattingService],
  templateUrl: './classification-tests.component.html',
  styleUrls: ['./classification-tests.component.scss'],
})
export class ClassificationTestsComponent implements OnChanges, OnInit {
  componentName: string = 'classification-tests'
  result: number = 0
  isTrue: boolean = false
  size: string;
  classificationTestForm: FormGroup;
  isfairMarketHasValue: boolean = false;
  implicitInterestRate: string;
  subtitle = 'Test 2 Complete | Test 3 Incomplete';
  @Input() accountingEventsData: any;
  @Input() classificationId: any;
  @Input() pageMode;
  
  test1: boolean;
  test2: boolean;
  test3: any;
  test4: number;
  test5: boolean;

  testLessor1: boolean;
  testLessor2: boolean;
  testLessor3: boolean;
  testLessor4: boolean;
  testLessor5: boolean;
  testLessor6: boolean;
  testLessor7: boolean;

  economicLifeYears: number;
  remainingTermYears: number;
  fairMarketValue: any;
  presentValue: any = 0.00;
  rvGuaranteedByLessee: any = 0.00;

  constructor(
    private formatService: FormattingService,
    public accountingSummaryService: AccountingSummaryService,
    private fb: FormBuilder
  ) { }
  
  ngOnInit(): void {
    this.initializeClassificationForm();
    this.handleFormValueChanges();
  }

  ngOnChanges(): void {

    if (this.accountingEventsData !== undefined || this.accountingEventsData === null || this.classificationId === null && this.classificationId !== undefined) {

      this.classificationTestForm.get('implicitInterestRate').disable();
      this.classificationTestForm.get('implicitInterestRate').setValue(' ');

      if (this.pageMode === 'Edit Event') {
        this.test1 = this.accountingEventsData.test1;
        this.test2 = this.accountingEventsData.test2;
        this.test3 = (this.accountingEventsData.test3 ?? 0).toFixed(2);
        this.test4 = +this.formatService.localFormat(this.accountingEventsData.test4, 2);
        this.classificationTestForm.get('remainingEconomicLife').setValue(this.accountingEventsData.economicLifeYears);
        this.classificationTestForm.get('fairMarketValue').setValue(this.accountingEventsData.fmv);
        this.classificationTestForm.get('implicitInterestRate').setValue(this.accountingEventsData.implicitRate * 100 + '%') ;
        this.test5 = this.accountingEventsData.test5;
        this.testLessor1 = this.accountingEventsData.testLessor1;
        this.testLessor2 = this.accountingEventsData.testLessor2;
        this.testLessor3 = this.accountingEventsData.testLessor3;
        this.testLessor4 = this.accountingEventsData.testLessor4;
        this.testLessor5 = this.accountingEventsData.testLessor5;
        this.testLessor6 = this.accountingEventsData.testLessor6;
        this.testLessor7 = this.accountingEventsData.testLessor7;
        this.presentValue = this.formatService.localFormat(this.accountingEventsData.presentValue, 2) ?? this.formatService.localFormat(this.presentValue, 2);;
        this.rvGuaranteedByLessee = this.formatService.localFormat(this.accountingEventsData.rvGuaranteedByLessee, 2) ?? this.formatService.localFormat(this.rvGuaranteedByLessee, 2);
        this.economicLifeYears = +this.accountingEventsData.economicLifeYears;
        this.economicLifePercent();
      }
    }
  }

  initializeClassificationForm (){
    this.classificationTestForm = this.fb.group({
      remainingEconomicLife: [],
      fairMarketValue: [],
      implicitInterestRate: []
    });
  }

  handleFormValueChanges(){
    this.classificationTestForm.valueChanges.pipe(
    ).subscribe((value) => {
      this.fairMarketValue = this.formatService.localFormat(this.classificationTestForm.get('fairMarketValue').value, 2);
      this.economicLifeYears = +this.classificationTestForm.get('remainingEconomicLife').value;
     if (this.fairMarketValue && this.fairMarketValue != 0) {
        this.isfairMarketHasValue = true;
      }
      else {
        this.isfairMarketHasValue = false;
      }
    });
  }

  economicLifePercent() {
    this.economicLifeYears = +this.accountingEventsData.economicLifeYears;
    this.remainingTermYears = +this.accountingEventsData.termInYears;
    if (this.economicLifeYears !== 0) {
      this.result = (this.remainingTermYears / this.economicLifeYears) * 100;
    }
    if (isNaN(this.result) || this.result === Infinity) {
      this.result = 0;
    }
    this.isTrue = this.test3 >= 75
  }
}