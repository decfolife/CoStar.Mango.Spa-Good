import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { addDays, addYears, endOfMonth, endOfYear, format } from 'date-fns';

import { Currency, IntervalsData, SettingsData } from '../../models';

@Component({
  selector: 'mango-intervals-card',
  templateUrl: './intervals-card.component.html',
  styleUrls: ['./intervals-card.component.scss']
})
export class IntervalsCardComponent implements OnInit {
  _intervalsData: IntervalsData;

  get intervalsData(): IntervalsData {
    return this._intervalsData;
  }

  @Input()
  set intervalsData(data: IntervalsData) {
    this._intervalsData = data;

    if (this._intervalsData) {
      this.updateFYText();
    }
  }

  @Input()
  settingsData: SettingsData;

  @Input()
  currencies: Currency[];

  @Input()
  isViewOnly = true;

  @Output()
  changed = new EventEmitter();

  get formattedIntervalsUpdate() {
    return format(this.intervalsData.lastSuccessfulIntervalUpdate, 'd MMMM yyyy h:mm a');
  }

  monthlyFieldInterval: string;
  annualFieldInterval: string;
  fiscalAnnualFieldInterval: string;

  fiscalYearText = '';
  currentYear = new Date().getFullYear();
  currentFiscalYear = this.currentYear;

  endMonthOptions = [
    { key: 'January', value: 1 },
    { key: 'February', value: 2 },
    { key: 'March', value: 3 },
    { key: 'April', value: 4 },
    { key: 'May', value: 5 },
    { key: 'June', value: 6 },
    { key: 'July', value: 7 },
    { key: 'August', value: 8 },
    { key: 'September', value: 9 },
    { key: 'October', value: 10 },
    { key: 'November', value: 11 },
    { key: 'December', value: 12 },
  ];

  fiscalYearDefinitionOptions = [
    { key: 'Begin Month', value: false },
    { key: 'End Month', value: true },
  ];

  ngOnInit(): void {
    this.updateFYText();
  }

  updateFYText() {
    if (!this.settingsData || !this.intervalsData) {
      return;
    }

    if (this.settingsData.fiscalYearEndMonth === 12 && !this.settingsData.fiscalYearAsEndMonth) {
      this.settingsData.fiscalYearAsEndMonth = true;
    }

    const calendarYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    
    this.currentFiscalYear = this.settingsData.fiscalYearEndMonth - 1 < currentMonth ? calendarYear + 1 : calendarYear;

    const dateFormat = 'd MMMM yyyy';

    let endMonth = new Date(this.currentFiscalYear, this.settingsData.fiscalYearEndMonth - 1);
    endMonth = endOfMonth(endMonth);

    let beginMonth = addYears(endMonth, -1);
    beginMonth = addDays(beginMonth, 1);

    if (!this.settingsData.fiscalYearAsEndMonth) {
      this.currentFiscalYear = this.currentFiscalYear - 1;

      endMonth = new Date(this.currentFiscalYear + 1, this.settingsData.fiscalYearEndMonth - 1);
      endMonth = endOfMonth(endMonth);

      beginMonth = addYears(endMonth, -1);
      beginMonth = addDays(beginMonth, 1);
    }

    this.fiscalYearText =
      `${format(beginMonth, dateFormat)} to ${format(endMonth, dateFormat)}`;

    const firstOfYear = new Date(calendarYear, 0, 1);
    const lastOfYear = new Date(calendarYear, 11, 31);

    const monthlyFrom = addYears(firstOfYear, this.intervalsData.monthlyFieldsYearsBack);
    const monthlyTo = addYears(lastOfYear, this.intervalsData.monthlyFieldsYearsForward);

    const calFrom = addYears(firstOfYear, this.intervalsData.annualFieldsYearsBack);
    const calTo = addYears(lastOfYear, this.intervalsData.annualFieldsYearsForward);

    const fiscFrom = addYears(beginMonth, this.intervalsData.annualFieldsYearsBack);
    const fiscTo = addYears(endMonth, this.intervalsData.annualFieldsYearsForward);

    this.monthlyFieldInterval =
      `${format(monthlyFrom, dateFormat)} to ${format(monthlyTo, dateFormat)}`;

    this.annualFieldInterval =
      `${format(calFrom, dateFormat)} to ${format(calTo, dateFormat)}`;

    this.fiscalAnnualFieldInterval =
      `${format(fiscFrom, dateFormat)} to ${format(fiscTo, dateFormat)}`;
  }
}
