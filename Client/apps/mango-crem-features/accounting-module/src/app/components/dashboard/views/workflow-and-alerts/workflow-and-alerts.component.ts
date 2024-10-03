/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable rxjs-angular/prefer-composition */

import { Component, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Location } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { CremPivotTableComponent } from 'libs/ui-shared/lib-ui-elements/src/lib/crem-pivot-table/crem-pivot-table.component';
import { DropdownComponent, SimpleGridComponent } from '@mango/ui-shared/lib-ui-elements';
import { environment } from '../../../../../../../../mango/src/environments/environment.local';

import { ColumnArray, DropdownValue } from '../../../../shared/models/dashboard-model'
import { DashboardService } from '../../../../services/dashboard.service';
import { DataService } from '../../../../services/data.service';
import { NgStateObject } from '../../../../shared/models/app-state.model';
import { UtilitiesService } from '@mango/core-shared';
import { Api } from '@mango/data-models/lib-data-models';

@Component({
  selector: 'workflow-and-alerts',
  templateUrl: './workflow-and-alerts.component.html',
  styleUrls: ['./workflow-and-alerts.component.scss'],
})
export class WorkflowAndAlertsComponent implements OnInit, OnDestroy {
  accountingServiceUrl: string = UtilitiesService.getBaseApiUrl(Api.accountingService)
  title = 'Accounting Module';
  loading = true;
  env = environment.name.toUpperCase().trim() !== 'PROD'
    ? environment.name.toUpperCase()
    : '';
  exportDataSourceFileName = '';

  _AppState: NgStateObject;
  _subs: any[] = []

  @Input() selectedSegment: number;
  @Input() selectedYear: number;

  public pageTitle = 'Accounting Dashboard';
  public dropdownField: any;
  public dataGridLoading: false;
  public columns: any;
  public selectedFilter = '';
  public deleting = false;
  public pivotGridDataSource: any;
  public selectedPivot: any;
  public pivotDataSource = {};
  public exportData: any = [];

  public cardData: any;
  public isInitialLoadSuccessful = true;
  public dropdownHidden = false;
  public cardJSONSchemaLoading = true;
  public canSaveDefault = false;
  public cardDataLoadCondition: any = {};
  public allCardDataLoaded = false;

  public cardConfigs: any = {
    22: {
      sortOrder: 1,
      cardId: 'Workflow-Alerts-Status',
      dataGridKeyExpr: 'gridIndex'
    },
    23: {
      sortOrder: 2,
      cardId: 'Workflow-Alerts-JournalEntryCountbyProcessingStatus',
      dataGridKeyExpr: 'gridIndex'
    },
    24: {
      sortOrder: 3,
      cardId: 'Workflow-Alerts-PeriodEventCount',
      dataGridKeyExpr: 'gridIndex'
    },
    25: {
      sortOrder: 4,
      cardId: 'Workflow-Alerts-LeaseAlerts2', // todo: this card seems to be duplicated
      dataGridKeyExpr: 'gridIndex'
    },
    26: {
      sortOrder: 4,
      cardId: 'Workflow-Alerts-LeaseAlerts',
      dataGridKeyExpr: 'gridIndex'
    },
  };

  @ViewChildren('CremPivotTable')
  cremPivotTable: QueryList<CremPivotTableComponent>;

  @ViewChild('SimpleGrid')
  simpleGrid: SimpleGridComponent;

  constructor(
    private dashboardService: DashboardService,
    private location: Location,
    private dataService: DataService
  ) {
    this.canSaveDefault = this.getSecurityLevel();
  }

  ngOnDestroy() {
    this._subs.forEach(sub => {
      sub.unsubscribe();
    })
  }

  ngOnInit() {
    this._AppState = <NgStateObject>this.location.getState();

    this.dataService.dashboardDataUpdateKey$.subscribe(data => {
      if (data) {
        this.cardDataLoadCondition[data.key] = true;
        // check if every item is true
        this.allCardDataLoaded = Object.values(this.cardDataLoadCondition).every(item => item)
      }
    });

    this.dashboardService.onLoad().subscribe((successFlag) => {
      this.isInitialLoadSuccessful = successFlag;
    });

    // Endpoint service is ready
    const dashboardSub = this.dashboardService.DashboardData$.subscribe(result => {
      if (result.clientSite) {
        // Determine environment segment that is needed for the names of export files
        const remEnvironmentSegment = this.env !== ''
          ? `_${this.env}_`
          : '_';

        this.exportDataSourceFileName = `CoStar_Data_${result.clientSite + remEnvironmentSegment}`

        // Transform card metadata into the config objects needed as inputs
        if (result.cardsMetaData.length) {
          const columnDictionaryByKey = {};
          const apiEndPoints = [];

          this.cardData = result.cardsMetaData.map((card: any) => {
            try {
              card.cardJSONSchema = JSON.parse(card.cardJSONSchema);
              if (card.cardJSONSchema.visible && !apiEndPoints.includes[card.cardJSONSchema.apiEndPoint]) {
                this.cardDataLoadCondition[card.cardJSONSchema.apiEndPoint] = false;
                apiEndPoints.push(card.cardJSONSchema.apiEndPoint)
              }
            } catch (e) {
              //this is just to check if the JSON has already been parsed on a reload
            }


            if (card.cardSource === 'clientdashboard') {
              card.cardJSONSchema.id = 'mangoDashboardCardId' + card.mangoDashboardCardId;
              card.sortOrder = this.cardConfigs?.[card.mangoDashboardCardId]?.['sortOrder'];
              card.cardJSONSchema.dataGridKeyExpr = 0
              card.cardPendoId = this.cardConfigs?.[card.mangoDashboardCardId]?.['cardId']
            } else {
              card.cardJSONSchema.id = 'cardId' + card.id;
              card.sortOrder = this.cardConfigs?.[card.id]?.['sortOrder'];
              card.cardJSONSchema.dataGridKeyExpr = 0
              card.cardPendoId = this.cardConfigs?.[card.id]?.['cardId']
            }

            card.cardJSONSchema.exportFileName = 'CoStar_Pivot_' +
              result.clientSite + remEnvironmentSegment + (
                card.cardJSONSchema.exportFileNameOverride
                  ? card.cardJSONSchema.exportFileNameOverride
                  : card.cardJSONSchema.title
              );

            card.cardJSONSchema.pivotDataSource.fields.forEach((field) => {
              if (field.area && field.dataField) {
                if (!columnDictionaryByKey[card.cardJSONSchema.apiEndPoint]) {
                  columnDictionaryByKey[card.cardJSONSchema.apiEndPoint] = [];
                }

                if (!columnDictionaryByKey[card.cardJSONSchema.apiEndPoint].includes(field.dataField)) {
                  columnDictionaryByKey[card.cardJSONSchema.apiEndPoint].push(field.dataField);
                }
              }
            });

            //add default fields
            const allColumns = ColumnArray[card.cardJSONSchema.apiEndPoint];
            const pivotFields = [];

            for (const [key, value] of Object.entries(allColumns)) {
              const column: any = {
                dataField: key,
                dataType: ''
              };

              if (value === 'number') {
                column.dataType = 'number';
              } else if (value === 'boolean') {
                column.dataType = 'boolean';
              } else if (value === 'currency') {
                column.dataType = 'number';
              } else if (value === 'Date') {
                column.dataType = 'date';
              } else {
                column.dataType = 'string';
              }

              pivotFields.push(column);
            }

            pivotFields.forEach((field) => {
              if (!columnDictionaryByKey[card.cardJSONSchema.apiEndPoint].includes(field.dataField)) {
                card.cardJSONSchema.pivotDataSource.fields.push(field);
              }
            });

            return card;
          });

          this.cardData.sort(function (a, b) {
            return a.sortOrder - b.sortOrder;
          })

          for (const [key, value] of Object.entries(columnDictionaryByKey)) {
            this.dataService.updateInitialColumnData(key, { dataSourceKey: key, columns: value });
          }

          setTimeout(() => {
            this.dataService.setApiEndpoints(apiEndPoints);
            this.dataService.getDashboardData(this.selectedSegment, this.selectedYear, apiEndPoints);
            this.cardJSONSchemaLoading = false;
          });
        }
      }
    });

    this._subs.push(dashboardSub);
  }

  public refreshCardData() {
    this.dataService.getDashboardData(this.selectedSegment, this.selectedYear);
  }

  public resetDropdownLoadCondition() {
    this.allCardDataLoaded = false;
    Object.keys(this.cardDataLoadCondition).forEach(key => this.cardDataLoadCondition[key] = false);
  }

  public cardMove(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.cardData, event.previousIndex, event.currentIndex);
  }

  public getSecurityLevel(): boolean {
    const userRoleElement = document.getElementById('hasAccountingModuleAddRight');
    return userRoleElement?.innerText === 'true';
  }
}
