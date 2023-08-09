/* eslint-disable rxjs-angular/prefer-composition */
import { Component, OnInit, ViewChild } from '@angular/core';

import notify from 'devextreme/ui/notify';
import { exportDataGrid } from 'devextreme/excel_exporter';
import 'regenerator-runtime/runtime';
import { Buffer, Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';

import { AlertsRulesGridComponent } from '../alerts-rules-grid/alerts-rules-grid.component';
import { ModuleRight } from '../shared/models';
import { AlertsRulesService } from '../shared/services/alerts-rules.service';

const LEASE_ALERT_RULES_MODULE_ID = 187;
const LEASE_OTID = 4;

@Component({
  selector: 'mango-alerts-rules',
  templateUrl: './alerts-rules.component.html',
  styleUrls: ['./alerts-rules.component.scss']
})
export class AlertsRulesComponent implements OnInit {
  @ViewChild('rulesGrid')
  rulesGrid: AlertsRulesGridComponent;

  searchText: string;
  title = 'Lease Alert Rules';

  disableSave = true;
  isExporting = false;
  isLoadingData = false;

  userHasAddRights = false;
  dismissReasonRequired = false;

  appliedFilterCount = 0;
  showClearFilters = false;

  constructor(private service: AlertsRulesService) { }

  ngOnInit() {
    this.service.getUserModuleRights().subscribe(res => {
      const rights = res.data.find(
        (x: ModuleRight) => x.moduleId === LEASE_ALERT_RULES_MODULE_ID
      ) as ModuleRight;

      if (!rights) {
        this.userHasAddRights = false;
        return;
      }

      this.userHasAddRights = rights.hasAddRights;
    });

    this.service.getIsAlertDismissedReasonRequired(LEASE_OTID).subscribe(res => {
      this.dismissReasonRequired = (res.data as unknown as boolean);
    });
  }

  updateDismissReasonSetting() {
    this.rulesGrid.setIsLoading(true);
    this.service.toggleAlertDismissedReasonIsRequired(LEASE_OTID).subscribe(res => {
      notify({
        message: res.succeeded
          ? 'Dismiss Reason setting saved.'
          : 'Error saving setting.',
        type: res.succeeded ? 'success' : 'error',
        displayTime: 3000,
        position: { my: 'bottom right', at: 'bottom right', offset: '-16 -16' },
        maxWidth: '400px',
        closeOnClick: true,
      });
      this.rulesGrid.setIsLoading(false);
    }, () => {
      notify({
        message: 'There was an error processing your change.',
        type: 'error',
        displayTime: 3000,
        position: { my: 'bottom right', at: 'bottom right', offset: '-16 -16' },
        maxWidth: '400px',
        closeOnClick: true,
      });
      this.rulesGrid.setIsLoading(false);
    });
  }

  searchDataGrid() {
    this.rulesGrid?.rulesGrid?.instance?.searchByText(this.searchText);
  }

  showFilterBuilder() {
    this.rulesGrid.filterBuilderVisible = true;
  }

  clearGridFilters(evt: MouseEvent) {
    evt.stopPropagation();
    this.rulesGrid?.rulesGrid?.instance?.clearFilter();

    this.appliedFilterCount = 0;
    this.showClearFilters = false;
  }

  toggleClearFilters() {
    this.showClearFilters = !this.showClearFilters;
  }

  exportDataGrid() {
    this.isExporting = true;

    const workbook = new Workbook();
    const alertRulesWorksheet = workbook.addWorksheet('Alert Rules');

    exportDataGrid({
      component: this.rulesGrid.rulesGrid.instance,
      worksheet: alertRulesWorksheet,
    }).then(() => {
      const descriptions = this.rulesGrid.gridData.map(x => x.description);
      descriptions.unshift('Rule Description');

      alertRulesWorksheet.spliceColumns(3, 0, descriptions);
      alertRulesWorksheet.getCell('C1').style = alertRulesWorksheet.getCell('A1').style;

      alertRulesWorksheet.getColumn('B').width = 80;
      alertRulesWorksheet.getColumn('C').width = 100;

      workbook.xlsx.writeBuffer().then((buffer: Buffer) => {
        saveAs(new Blob([ buffer ], { type: 'application/octet-stream' }),
          'Alert Rules.xlsx');
      });

      this.isExporting = false;
    }).catch(() => { this.isExporting = false; });
  }

  updateFilterCount(newCount: number) {
    this.appliedFilterCount = newCount;
  }

  updateSaveButton(evt: boolean) {
    this.disableSave = !evt;
  }

  save() {
    this.rulesGrid.saveChanges();
  }
}
