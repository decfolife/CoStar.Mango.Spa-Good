import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DxFormModule, DxCheckBoxModule, DxDateBoxModule, DxFormComponent } from 'devextreme-angular';
import { ButtonModule, ModalModule } from '@mango/ui-shared/lib-ui-elements';
import { UserInfo } from "@mango/data-models/lib-data-models";
import { MangoAppFacade } from "@mangoSpa/src/app/+state/app/app.facade";
import { Observable, Subscription } from 'rxjs';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxValidationGroupComponent, DxValidationGroupModule } from 'devextreme-angular/ui/validation-group';
import { DxNumberBoxModule } from 'devextreme-angular';
import { DatePickerModule } from '../../../../../lib-ui-elements/src/lib/date-picker/date-picker.module';

@Component({
  selector: 'mango-date-calculator',
  standalone: true,
  templateUrl: './date-calculator.component.html',
  styleUrls: ['./date-calculator.component.scss'],
  imports: [ModalModule, DxCheckBoxModule, DxFormModule, ButtonModule, DxDateBoxModule, DxValidatorModule, DxValidationGroupModule, DxNumberBoxModule, DatePickerModule]
})
export class DateCalculatorComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription()
  private currentUserInfo$: Observable<UserInfo>;
  @ViewChild('dateCalculatorForm') dateCalculatorForm: DxFormComponent;
  @ViewChild('inputGroup', { static: false }) inputGroup: DxValidationGroupComponent;
  @ViewChild('outputGroup', { static: false }) outputGroup: DxValidationGroupComponent

  inputDate: Date;
  includeInputDate: boolean = false;
  years: number = 0;
  months: number = 0;
  days: number = 0;
  outputDate: any;
  isUserDatesEU: boolean = true;
  weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  dayOfWeek: any;

  constructor(
    public dialogRef: MatDialogRef<DateCalculatorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private facade: MangoAppFacade,
  ) { }

  ngOnInit(): void {

    this.inputDate = new Date()

    this.currentUserInfo$ = this.facade.userInfo$
    this.subscriptions.add(this.currentUserInfo$.subscribe(userInfo => {
      this.isUserDatesEU = userInfo.userPreferences.userDatesEU;
    }));
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }

  public calcOutputDate() {
    const validationResult = this.inputGroup.instance.validate();

    if (validationResult.isValid) {
      let date = new Date(this.inputDate);

      date.setFullYear(date.getFullYear() + this.years);
      date.setMonth(date.getMonth() + this.months);

      if (this.includeInputDate) {
        if (this.days <= 0) {
          date.setDate(date.getDate() + this.days + 1)
        } else {
          date.setDate(date.getDate() + this.days - 1)
        }
      } else {
        date.setDate(date.getDate() + this.days)
      }

      this.outputDate = date;
      this.dayOfWeek = this.weekday[this.outputDate.getDay()];
    }
  }

  public daysDifference(a: number, b: number) {
    return (b - a) / (1000 * 60 * 60 * 24)
  }

  public calcDateDifference() {
    const validationResult = this.outputGroup.instance.validate();
    if (validationResult.isValid) {
      if (this.inputDate && this.outputDate) {
        let inputDateTime = this.inputDate.getTime()
        let outputDateTime = this.outputDate.getTime()
        let difference = this.daysDifference(inputDateTime, outputDateTime)

        if (this.includeInputDate) {
          if (difference > 0) {
            difference += 1;
          } else {
            difference -= 1;
          }
        }

        if (this.dateCalculatorForm && this.dateCalculatorForm.instance) {
          this.months = 0
          this.years = 0
          this.days = Math.ceil(difference);
        }
      }
    }
  }

}