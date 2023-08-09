/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable rxjs-angular/prefer-composition */

import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Location } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { CremPivotTableComponent } from 'libs/ui-shared/lib-ui-elements/src/lib/crem-pivot-table/crem-pivot-table.component';
import { DropdownComponent, SimpleGridComponent } from '@mango/ui-shared/lib-ui-elements';
import { environment } from '../../../../../../mango/src/environments/environment.local';

import { ColumnArray, DropdownValue } from '../../shared/models/dashboard-model';
import { DashboardService } from '../../services/dashboard.service';
import { DataService } from '../../services/data.service';
import { NgStateObject } from '../../shared/models/app-state.model';

@Component({
  selector: 'mango-accounting-dashboard',
  templateUrl: './accounting-dashboard.component.html',
  styleUrls: ['./accounting-dashboard.component.scss'],
})
export class AccountingDashboardComponent implements OnInit {
  title = 'Accounting Module';
  loading = true;
  env = environment.name.toUpperCase().trim() !== 'PROD'
    ? environment.name.toUpperCase()
    : '';
  exportDataSourceFileName = '';

  _AppState: NgStateObject;
  _subs: any[] = []

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

  public calendarList: DropdownValue[] = [];
  public portfolioList: DropdownValue[] = [];
  public yearList: DropdownValue[] = [];
  public cardData: any;
  public isInitialLoadSuccessful = true;
  public initialSelectedPortfolios: any;
  public initialSelectedCalendar: any;
  public initialSelectedYear: any;
  public selectedCalendar;
  public selectedPortfolios;
  public selectedYears;
  public appliedCalendar;
  public dropdownHidden = false;
  public cardJSONSchemaLoading = true;
  public canSaveDefault = false;
  public cardDataLoadCondition: any = {};
  public allCardDataLoaded = false;

  public cardConfigs: any = {
    22: {
      sortOrder: 1,
      cardId: 'AccountingWorkflowStatus',
      dataGridKeyExpr: 'gridIndex'
    },
    23: {
      sortOrder: 2,
      cardId: 'JournalEntryCountbyProcessingStatus',
      dataGridKeyExpr: 'gridIndex'
    },
    24: {
      sortOrder: 3,
      cardId: 'PeriodEventCount',
      dataGridKeyExpr: 'gridIndex'
    },
    25: {
      sortOrder: 4,
      cardId: 'LeaseAlerts',
      dataGridKeyExpr: 'gridIndex'
    },
    26: {
      sortOrder: 4,
      cardId: 'LeaseAlerts',
      dataGridKeyExpr: 'gridIndex'
    },
  };

  @ViewChild('PortfolioDropdown')
  portfolioDropdown: DropdownComponent;

  @ViewChild('YearsDropdown')
  yearsDropdown: DropdownComponent;

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

  ngOnInit() {
    this._AppState = <NgStateObject>this.location.getState();

    this.dataService.dashboardDataUpdateKey$.subscribe(data => {
      if (data) {
        this.cardDataLoadCondition[data.key] = true;
        // check if every item is true
        this.allCardDataLoaded = Object.values(this.cardDataLoadCondition).every(item => item)
      }
    });

    this.dashboardService.onLoad(environment.appUrls.accountingService).subscribe((successFlag) => {
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

        // Assign selected values
        this.initialSelectedYear = result.selectedYear;
        this.initialSelectedCalendar = result.selectedCalendarId;
        this.initialSelectedPortfolios = result.selectedPortfolioIds;

        // Assign Dropdown sources
        this.calendarList = result.calendarFilterData;
        this.portfolioList = result.portfolioFilterData;
        this.yearList = result.yearFilterData;

        this.selectedCalendar = result.calendarFilterData[0];
        this.selectedPortfolios = result.portfolioFilterData;

        const yearIndex = result.yearFilterData.findIndex((year) => {
          return year.stringValue === result.selectedYear;
        });

        if (yearIndex !== -1) {
          this.selectedYears = [result.yearFilterData?.[yearIndex]];
        }

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

          this.dataService.setApiEndpoints(apiEndPoints);

          setTimeout(() => {
            this.dataService.getDashboardData(this.selectedCalendar?.intValue, this.selectedPortfolios, this.selectedYears);
            this.cardJSONSchemaLoading = false;
          });
        }
      }
    });

    this._subs.push(dashboardSub);
  }

  public resetDropdownLoadCondition() {
    this.allCardDataLoaded = false;
    Object.keys(this.cardDataLoadCondition).forEach(key => this.cardDataLoadCondition[key] = false);
  }

  public apply(event) {
    event.preventDefault();

    const selectedCalendar = Array.isArray(this.selectedCalendar) && this.selectedCalendar.length
      ? this.selectedCalendar[0].intValue
      : this.selectedCalendar.intValue;
    this.resetDropdownLoadCondition();
    this.dataService.getDashboardData(selectedCalendar, this.selectedPortfolios, this.selectedYears);
  }

  public cardMove(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.cardData, event.previousIndex, event.currentIndex);
  }

  public dropdownChange(dropdown, e) {
    switch (dropdown) {
      case 'calendar':
        if (e !== this.selectedCalendar) {
          this.selectedCalendar = e;

          const selectedCalendar = Array.isArray(this.selectedCalendar) && this.selectedCalendar.length
            ? this.selectedCalendar[0].intValue
            : this.selectedCalendar.intValue;

          this.dataService.getDashboardFilterData(selectedCalendar).subscribe(apiResponse => {
            if (apiResponse.success) {
              const data = apiResponse.data;

              this.initialSelectedYear = data.selectedYear;
              this.initialSelectedPortfolios = data.selectedPortfolioIds;

              this.portfolioList = data.portfolioFilterData;
              this.yearList = data.yearFilterData;

              this.selectedPortfolios = data.portfolioFilterData;

              const selectedYear = data.yearFilterData.filter((year) => {
                return year.stringValue === data.selectedYear;
              });

              this.selectedYears = selectedYear;
              this.dataService.getDashboardData(selectedCalendar, this.selectedPortfolios, this.selectedYears);
              this.resetDropdownLoadCondition();
            }
          });

        }
        break;

      case 'year':
        if (e !== this.selectedYears) {
          this.selectedYears = e;
        }
        break;

      case 'portfolio':
        if (e !== this.selectedPortfolios) {
          this.selectedPortfolios = e;
        }
        break;
    }
  }

  public getSecurityLevel(): boolean {
    const userRoleElement = document.getElementById('hasAccountingModuleAddRight');
    return userRoleElement?.innerText === 'true';
  }
}
