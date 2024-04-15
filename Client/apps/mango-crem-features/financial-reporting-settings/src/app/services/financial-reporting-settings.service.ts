import { Injectable } from '@angular/core';
import { EndpointService, UtilitiesService } from '@mango/core-shared/lib-core-shared';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { format, parseISO } from 'date-fns';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { IntervalsData, SettingsData } from '../models';
import { FinancialReporting } from '../models/financial-report.modal';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable({ providedIn: 'root' })
export class FinancialReportingSettingsService extends EndpointService {
  reports: string = UtilitiesService.getBaseApiUrl(Api.reports)

  enableFinancialReporting() {
    return this.callHttpPost(`${this.reports}reports/EnableFinancialReporting`, 'enableFinancialReporting', JSON.stringify({}));
  }

  getUserRights() {
    return this.callHttpGet(`${this.reports}reports/GetUserModuleRights`, 'getUserRights');
  }

  getFinancialReportingSettings() {
    return this.callHttpGet(`${this.reports}reports/GetReportingIntervalSettings`, 'getFinancialReportingSettings');
  }

  saveFinancialReportingSettings(request: IntervalsData & SettingsData) {
    const url = `${this.reports}reports/SaveReportingIntervalSettings`;
      return this.callHttpPost(
        url, 'saveReportingIntervalSettings', JSON.stringify(request)
      );
  }

  getCurrencyList() {
    return this.callHttpGet(`${this.reports}reports/GetCurrencyList`, 'getCurrencyList');
  }

  getUserInformation() {
    return this.callHttpGet(`${this.reports}Reports/GetUserPreferences`, 'getUserPreferences');
  }

  refreshFinancialData() {
    return this.callHttpGet(`${this.reports}reports/RefreshFinancialData`, 'refreshFinancialData');
  }

  migrationImpactReport() {
    return this.callHttpGet(`${this.reports}reports/GetFinancialReportingImpactReport`, 'getFinancialReportingImpactReport');
  }

  generateExcel(data: any[], filename: string, dateFormat: string) {
    // Sort By LastRun column 
    data.sort((a, b) => new Date(b.lastRun).getTime() - new Date(a.lastRun).getTime());

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Impact Report Data');

    // Add headers
    const headers = FinancialReporting;
    worksheet.addRow(headers);

    // Add data rows
    if (data.length != 0) {
      const tempHeader = Object.keys(data[0]);
      data.forEach((rowData) => {
        const row = [];
        for (const header of tempHeader) {
          const cellValue = rowData[header];

          // Format date cells
          if ((header === 'lastRun' || header === 'migratedDate') && cellValue) {
            const parsedDate = parseISO(cellValue);
            row.push(format(parsedDate, `${dateFormat} HH:mm`));
          } else {
            row.push(cellValue);
          }
        }
        worksheet.addRow(row);
      });
    }

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, filename);
    });
  }
}
