/* eslint-disable rxjs-angular/prefer-composition */
import { Component, OnInit, HostListener } from '@angular/core';

import notify from 'devextreme/ui/notify';

import { Currency, IntervalsData, SettingsData } from '../../models/';
import { FinancialReportingSettingsService } from '../../services/financial-reporting-settings.service';
import { ImpactReportResponse } from '../../models/Impact-report-response.modal';

interface DontTouch {
  intervalSettingsID: number;
  recreateSQLViews: boolean;
}

@Component({
  selector: 'mango-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {
  intervalsData: IntervalsData;
  settingsData: SettingsData;
  currencies: Currency[];

  unchangedFields: DontTouch;

  noChanges = true;
  canRefresh = true;
  isViewOnly = true;
  isSuperUser = false;
  isSaving = false;
  isPopupVisible = false;
  filename = 'Financial Reporting Impact Report.xlsx';
  componentName = 'settings-page';
  isEuroDateFormat = false;
  dateFormat = 'MM/dd/yyyy';

  constructor(private settingsService: FinancialReportingSettingsService) { }

  ngOnInit(): void {
    const suDiv = document.getElementById('IsSuperUser')
    this.isSuperUser = suDiv?.innerText === 'true';

    this.settingsService.getUserRights().subscribe(res => {
      if (!res.succeeded) {
        this.showNotification(res.message, true);

        return;
      }

      this.isViewOnly = !res.data[0].hasAddRights;
    });

    this.loadSettingsAndData();

    this.settingsService.getCurrencyList().subscribe(res => {
      if (!res.succeeded) {
        this.showNotification(res.message, true);

        return;
      }

      this.currencies = res.data;
    });
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event) {
    const confirmationMessage = this.noChanges ? null : 'onbeforeunload';

    if (confirmationMessage) {
      event.preventDefault();

      return (event.returnValue = confirmationMessage);
    }
  }

  cancel() {
    this.isPopupVisible = false;
    this.loadSettingsAndData();
    this.noChanges = true;
  }

  learnMore() {
    window.open("https://costarmanager.my.site.com/help/s/article/Financial-Reporting");
    this.isPopupVisible = false;
  }

  migrationImpactReport() {
    const isEuroElement = document.getElementById('isEuropeanDateFormat');
    this.isEuroDateFormat = isEuroElement?.innerHTML.toLowerCase() === 'true';
    if (this.isEuroDateFormat) {
      this.dateFormat = 'dd.MM.yyyy';
    }
    this.settingsService.migrationImpactReport().subscribe(result => {
      const data: ImpactReportResponse[] = result.data;
      if (result.succeeded) {
        this.settingsService.generateExcel(data, this.filename, this.dateFormat);
        this.showNotification(result.message, !result.succeeded);
      } else {
        this.showNotification(result.message, !result.succeeded);
      }
    });
  }


  refreshFinancialData() {
    this.canRefresh = false;

    this.settingsService.refreshFinancialData().subscribe(res => {
      this.canRefresh = true;

      this.loadSettingsAndData();
      this.showNotification(res.message, !res.succeeded);
    });
  }

  saveChanges() {
    this.noChanges = true;
    this.isSaving = true;
    this.isPopupVisible = false;

    const saveData = {
      ...this.intervalsData,
      ...this.settingsData,
      ...this.unchangedFields,
    };

    this.settingsService.saveFinancialReportingSettings(saveData).subscribe(res => {
      if (!res.succeeded) {
        this.isSaving = false;
        this.showNotification(res.message, true);

        return;
      }

      this.showNotification(res.message);

      this.intervalsData.lastSuccessfulIntervalUpdate =
        res.data.lastSuccessfulIntervalUpdate === null
          ? null
          : new Date(res.data.lastSuccessfulIntervalUpdate);

      this.loadObjectFromData(this.settingsData, res.data);
      this.loadObjectFromData(this.intervalsData, res.data);

      this.isSaving = false;
    });
  }

  private loadSettingsAndData() {
    this.settingsService.getFinancialReportingSettings().subscribe(res => {
      if (!res.succeeded) {
        this.showNotification(res.message, true);

        return;
      }

      this.intervalsData = new IntervalsData();
      this.settingsData = new SettingsData();

      this.unchangedFields = {
        intervalSettingsID: res.data.intervalSettingsID,
        recreateSQLViews: res.data.recreateSQLViews,
      };

      this.intervalsData.lastSuccessfulIntervalUpdate =
        res.data.lastSuccessfulIntervalUpdate === null
          ? null
          : new Date(res.data.lastSuccessfulIntervalUpdate);

      this.loadObjectFromData(this.intervalsData, res.data);
      this.loadObjectFromData(this.settingsData, res.data);
    });
  }

  private showNotification(message: string, isError = false) {
    notify({
      message,
      type: isError ? 'error' : 'success',
      displayTime: 3000,
      position: { at: 'bottom right', my: 'bottom right', offset: '-16 -16' },
      maxWidth: '400px',
      closeOnClick: true,
    });
  }

  private loadObjectFromData(obj, data) {
    Object.keys(obj).forEach(key => {
      if (key !== 'lastSuccessfulIntervalUpdate') {
        obj[key] = data[key];
      }
    });
  }

  getId(uniqueName: string, elementType: string, componentType?: string) {
    if (componentType != undefined)
      return `${this.componentName}-${componentType}-${uniqueName}-${elementType}`
    else
      return `${this.componentName}-${uniqueName}-${elementType}`
  }
}
