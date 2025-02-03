/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable rxjs-angular/prefer-composition */

import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../../mango/src/environments/environment.local';
import { Api, ApiResponse } from '@mango/data-models/lib-data-models';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import {
  ColumnArray,
  ColumnOverrideArray,
} from '../shared/models/dashboard-model';
import { MatDialog } from '@angular/material/dialog';
import { ColumnLimitComponent } from '../components/dashboard/modal/column-limit/column-limit.component';
import { forkJoin } from 'rxjs';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Injectable({
  providedIn: 'root',
})
export class DataService extends EndpointService {
  dashboardsUrl: string = UtilitiesService.getBaseApiUrl(Api.dashboards);
  accountingServiceUrl: string = UtilitiesService.getBaseApiUrl(
    Api.accountingService
  );
  baseUrl = '';
  calendar: any;
  portfolios: any;
  segmentID: any;
  years: any;
  dataStore: ArrayStore;
  columnStore: ArrayStore;
  dataSource: DataSource;
  apiEndPoints: string[];
  states = [
    { dataSourceKey: 'Leases', data: [] },
    { dataSourceKey: 'Periods', data: [] },
    { dataSourceKey: 'Alerts', data: [] },
  ];

  protected httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      UserId: '2',
      ClientKey: 'pepsi',
      CAEnabled: 'false',
    }),
  };

  constructor(
    protected http: HttpClient,
    protected dialog: MatDialog,
    protected facade: MangoAppFacade
  ) {
    super(http, facade);
    this.httpOptions = this.getHttpHeaders();

    this.dataStore = new ArrayStore({
      key: 'dataSourceKey',
      data: this.states,
    });

    this.columnStore = new ArrayStore({
      key: 'dataSourceKey',
      data: [
        {
          dataSourceKey: 'Leases',
          columns: [],
        },
        {
          dataSourceKey: 'Periods',
          columns: [],
        },
        {
          dataSourceKey: 'Alerts',
          columns: [],
        },
      ],
    });
  }

  // Dashboard Data Updated
  private _dashboardDataUpdateKey = new BehaviorSubject<any>(null);
  dashboardDataUpdateKey$ = this._dashboardDataUpdateKey.asObservable();

  private _cardNeedUpdate = new BehaviorSubject<any>(true);
  cardNeedUpdate$ = this._cardNeedUpdate.asObservable();

  private _dashboardConfigData = new BehaviorSubject<any>(null);
  dashboardConfigData$ = this._dashboardConfigData.asObservable();

  private _saveCardConfig = new BehaviorSubject<any>(null);
  saveCardConfig$ = this._saveCardConfig.asObservable();

  public async getDataSource(key) {
    return this.dataStore
      .load({ filter: ['dataSourceKey', '=', key] })
      .then((data) => {
        return data;
      });
  }

  public saveCardConfig(
    mangoDashboardCardId,
    isSiteDefault,
    config
  ): Observable<ApiResponse> {
    this._saveCardConfig.next(true);
    const route = `${this.dashboardsUrl}accounting/savecard`;

    let param = {
      mangoDashboardCardID: mangoDashboardCardId,
      isSiteDefault: isSiteDefault,
      config: JSON.stringify(config),
    };

    return this.getHttpPostApiResponse(route, 'savecard', param);
  }

  public deleteUserConfig(mangoDashboardCardId): Observable<ApiResponse> {
    const restfulParam = {
      mangoDashboardCardID: mangoDashboardCardId,
    };
    const route = `${this.dashboardsUrl}accounting/deletecard`;
    return this.getHttpPostApiResponse(route, 'deletecard', restfulParam);
  }

  public updateCardConfig(mangoDashboardCardId, isSiteDefault, config) {
    this._saveCardConfig.next(true);
    const route = `${this.dashboardsUrl}accounting/updatecard`;
    let param = {
      mangoDashboardCardID: mangoDashboardCardId,
      isSiteDefault: isSiteDefault,
      config: JSON.stringify(config),
    };
    return this.getHttpPostApiResponse(route, 'updatecard', param);
  }

  public async updateColumnData(key, data) {
    const fields = await this.columnStore
      .load({ filter: ['dataSourceKey', '=', key] })
      .then((data) => {
        return data;
      });
    let newField = false;
    if (data?.columns && fields?.length) {
      data.columns.forEach((column) => {
        if (!fields[0].columns.includes(column)) {
          newField = true;
          fields[0].columns.push(column);
        }
      });
    }

    //only update store if column does not exist in current column store
    if (newField) {
      this.columnStore.update(key, fields[0]);
      if (key === 'Leases') {
        this.updateLeaseData(data.segmentID, false);
      } else if (key === 'Periods') {
        this.updatePeriodsData(
          data.segmentID,
          this.portfolios,
          this.years,
          false
        );
      } else if (key === 'Alerts') {
        this.updateAlertsData(data.segmentID, this.portfolios, false);
      }
    } else {
      this._cardNeedUpdate.next({ key, needUpdate: false });
    }
  }

  public updateInitialColumnData(key, data): void {
    this.columnStore.update(key, data);
  }

  public updateData(key, data): void {
    this.dataStore.update(key, data);
  }

  public async getDashboardData(segmentID, selectedYear, apiEndPoints?) {
    this._cardNeedUpdate.next({ key: 'everything', needUpdate: true });

    setTimeout(() => {
      this.updateLeaseData(segmentID, true, apiEndPoints);
      //this.updatePeriodsData(calendar, portfolios, selectedYear, true, apiEndPoints);
      this.updateAlertsData(segmentID, true, apiEndPoints);
    });
  }

  public getDashboardFilterData(calendar): Observable<ApiResponse> {
    this._cardNeedUpdate.next({ key: 'everything', needUpdate: true });

    const route = `${this.dashboardsUrl}accounting/accountingDashboard`;

    let param = {
      calendarId: calendar,
    };

    return this.getHttpPostApiResponse(route, 'AccountingDashboard', param);
  }

  public columnLimitWarning(columns) {
    this.dialog.open(ColumnLimitComponent, {
      width: '600px',
      panelClass: 'columnLimitModal',
      data: {
        columns: columns,
      },
    });
  }

  public setApiEndpoints(apiEndpoints): void {
    this.apiEndPoints = apiEndpoints;
  }

  private async updateLeaseData(
    segmentID,
    requiredDataRefresh: boolean = false,
    apiEndPoints?
  ) {
    if (
      apiEndPoints?.includes('Leases') ||
      this.apiEndPoints.includes('Leases')
    ) {
      this._cardNeedUpdate.next({ key: 'Leases', needUpdate: true });
      const columns = await this.columnStore
        .load({ filter: ['dataSourceKey', '=', 'Leases'] })
        .then((data) => {
          return data;
        });
      this.getLeaseData(segmentID, columns).subscribe((apiResponse) => {
        if (apiResponse.success) {
          //needed this conversion because currently the fields are treated as string instead of a date field
          const dateColumns = this.getDateFields(columns, 'Leases');
          apiResponse.data.forEach((data) => {
            dateColumns.forEach((dateColumn) => {
              if (data[dateColumn]) {
                data[dateColumn] = new Date(data[dateColumn]);
              }
            });
          });
          this.updateData('Leases', {
            dataSourceKey: 'Leases',
            data: apiResponse.data,
          });
          setTimeout(() => {
            this._dashboardDataUpdateKey.next({
              requiredDataRefresh,
              key: 'Leases',
            });
          });
        } else {
          if (
            !apiResponse.success &&
            apiResponse.clientErrorMessage ===
              'Number of allowable fields exceeded.'
          ) {
            this.columnLimitWarning(columns[0].columns);
            this._dashboardDataUpdateKey.next({
              requiredDataRefresh,
              key: 'Leases',
            });
          }
          this.columnStore.update('Leases', {
            columns: [],
            dataSourceKey: 'Leases',
          });
        }
      });
    }
  }

  private async updatePeriodsData(
    calendar,
    portfolios,
    years,
    requiredDataRefresh,
    apiEndPoints?
  ) {
    if (
      this.apiEndPoints.includes('Periods') ||
      apiEndPoints?.includes('Periods')
    ) {
      this._cardNeedUpdate.next({ key: 'Periods', needUpdate: true });
      const columns = await this.columnStore
        .load({ filter: ['dataSourceKey', '=', 'Periods'] })
        .then((data) => {
          return data;
        });
      this.getPeriodsData(portfolios, calendar, years, columns).subscribe(
        (apiResponse) => {
          if (apiResponse.success) {
            //needed this conversion because currently the fields are treated as string instead of a date field
            const dateColumns = this.getDateFields(columns, 'Periods');

            //adding batching
            const periodData = [];
            const periodDataTemp = apiResponse.data.periods;
            const totalCount = apiResponse.data.totalCount;

            periodData.push(...periodDataTemp);

            if (periodData.length < totalCount) {
              const totalPagesRequired = Math.ceil(
                totalCount / periodDataTemp.length
              );

              this.recurseGetAllPagesPeriods(
                totalCount,
                totalPagesRequired,
                2,
                portfolios,
                calendar,
                years,
                columns,
                periodData,
                dateColumns,
                requiredDataRefresh
              );
              //add batching end
            } else {
              periodData.forEach((data) => {
                dateColumns.forEach((dateColumn) => {
                  if (data[dateColumn]) {
                    data[dateColumn] = new Date(data[dateColumn]);
                  }
                });
              });
              this.updateData('Periods', {
                dataSourceKey: 'Periods',
                data: periodData,
              });
              setTimeout(() => {
                this._dashboardDataUpdateKey.next({
                  requiredDataRefresh,
                  key: 'Periods',
                });
              });
            }
          } else {
            if (
              !apiResponse.success &&
              apiResponse.clientErrorMessage ===
                'Number of allowable fields exceeded.'
            ) {
              this.columnLimitWarning(columns[0].columns);

              this._dashboardDataUpdateKey.next({
                requiredDataRefresh,
                key: 'Periods',
              });
            }
            this.columnStore.update('Periods', {
              columns: [],
              dataSourceKey: 'Periods',
            });
          }
        }
      );
    }
  }

  private recurseGetAllPagesPeriods(
    totalCount: number,
    totalPages: number,
    firstPageNumber: number,
    portfolios,
    calendar,
    years,
    columns,
    periodData,
    dateColumns,
    requiredDataRefresh
  ) {
    // leaseAbstractId?: number,
    // masterGroupId?: number,
    // alertRuleId?: number,
    // isLeaseActive?: boolean,
    // selectedColumns: SelectedColumns,
    // isDismissed: boolean,
    // pageNumber?: number,
    // rowsPerPage?: number,

    const secondPageNumber = firstPageNumber + 1;
    const thirdPageNumber = secondPageNumber + 1;

    let observableList;

    if (firstPageNumber === totalPages) {
      observableList = forkJoin({
        pageOneReturn: this.getPeriodsData(
          portfolios,
          calendar,
          years,
          columns,
          firstPageNumber
        ),
        pageTwoReturn: of({ data: { periods: [] } }),
        pageThreeReturn: of({ data: { periods: [] } }),
      });
    }

    if (secondPageNumber === totalPages) {
      observableList = forkJoin({
        pageOneReturn: this.getPeriodsData(
          portfolios,
          calendar,
          years,
          columns,
          firstPageNumber
        ),
        pageTwoReturn: this.getPeriodsData(
          portfolios,
          calendar,
          years,
          columns,
          secondPageNumber
        ),
        pageThreeReturn: of({ data: { periods: [] } }),
      });
    }

    if (thirdPageNumber <= totalPages) {
      observableList = forkJoin({
        pageOneReturn: this.getPeriodsData(
          portfolios,
          calendar,
          years,
          columns,
          firstPageNumber
        ),
        pageTwoReturn: this.getPeriodsData(
          portfolios,
          calendar,
          years,
          columns,
          secondPageNumber
        ),
        pageThreeReturn: this.getPeriodsData(
          portfolios,
          calendar,
          years,
          columns,
          thirdPageNumber
        ),
      });
    }

    observableList.subscribe((res: any) => {
      periodData.push(...res.pageOneReturn.data.periods);
      periodData.push(...res.pageTwoReturn.data.periods);
      periodData.push(...res.pageThreeReturn.data.periods);

      if (thirdPageNumber < totalPages) {
        return this.recurseGetAllPagesPeriods(
          totalCount,
          totalPages,
          thirdPageNumber + 1,
          portfolios,
          calendar,
          years,
          columns,
          periodData,
          dateColumns,
          requiredDataRefresh
        );
      } else {
        periodData.forEach((data) => {
          dateColumns.forEach((dateColumn) => {
            if (data[dateColumn]) {
              data[dateColumn] = new Date(data[dateColumn]);
            }
          });
        });
        this.updateData('Periods', {
          dataSourceKey: 'Periods',
          data: periodData,
        });
        setTimeout(() => {
          this._dashboardDataUpdateKey.next({
            requiredDataRefresh,
            key: 'Periods',
          });
        });
        return;
      }
    });
  }

  private async updateAlertsData(
    segmentID,
    requiredDataRefresh: boolean = false,
    apiEndPoints?
  ) {
    if (
      this.apiEndPoints.includes('Alerts') ||
      apiEndPoints?.includes('Alerts')
    ) {
      this._cardNeedUpdate.next({ key: 'Alerts', needUpdate: true });
      const columns = await this.columnStore
        .load({ filter: ['dataSourceKey', '=', 'Alerts'] })
        .then((data) => {
          return data;
        });
      this.getAlertsData(segmentID, columns).subscribe((apiResponse) => {
        if (apiResponse.success) {
          //needed this conversion because currently the fields are treated as string instead of a date field
          const dateColumns = this.getDateFields(columns, 'Alerts');
          apiResponse.data.forEach((data) => {
            dateColumns.forEach((dateColumn) => {
              if (data[dateColumn]) {
                data[dateColumn] = new Date(data[dateColumn]);
              }
            });
          });
          this.updateData('Alerts', {
            dataSourceKey: 'Alerts',
            data: apiResponse.data,
          });
          setTimeout(() => {
            this._dashboardDataUpdateKey.next({
              requiredDataRefresh,
              key: 'Alerts',
            });
          });
        } else {
          if (
            !apiResponse.success &&
            apiResponse.clientErrorMessage ===
              'Number of allowable fields exceeded.'
          ) {
            this.columnLimitWarning(columns[0].columns);
            this._dashboardDataUpdateKey.next({
              requiredDataRefresh,
              key: 'Alerts',
            });
          }
          this.columnStore.update('Alerts', {
            columns: [],
            dataSourceKey: 'Alerts',
          });
        }
      });
    }
  }

  private getLeaseData(segmentID, columns): Observable<ApiResponse> {
    const route = `${this.accountingServiceUrl}accounting/leases`;

    let param = {
      segmentID: segmentID,
      Fields: columns?.[0]?.columns?.toString() || [].toString(),
    };

    return this.getHttpPostApiResponse(route, 'leases', param);
  }

  private getPeriodsData(
    portfolios,
    calendar,
    years,
    columns,
    pageNumber: number = 1
  ): Observable<ApiResponse> {
    const newColumns = columns?.[0]?.columns.map((column) => {
      if (ColumnOverrideArray.Periods[column]) {
        return ColumnOverrideArray.Periods[column];
      } else {
        return column;
      }
    });

    const route = `${this.accountingServiceUrl}periods`;

    let param = {
      portfolioIDs: portfolios,
      calendarID: calendar,
      Fields: newColumns.toString() || [].toString(),
      Year: years,
      PageNumber: pageNumber,
    };

    return this.getHttpPostApiResponse(route, 'periods', param);
  }

  private getAlertsData(segmentID, columns): Observable<ApiResponse> {
    const newColumns = columns?.[0]?.columns.map((column) => {
      if (ColumnOverrideArray.Alerts[column]) {
        return ColumnOverrideArray.Alerts[column];
      } else {
        return column;
      }
    });

    const route = `${this.accountingServiceUrl}accounting/alerts`;

    let param = {
      SegmentID: segmentID,
      Fields: newColumns.toString() || [].toString(),
    };

    return this.getHttpPostApiResponse(route, 'alerts', param);
  }

  private getDateFields(columns, key) {
    const allColumns = ColumnArray[key];
    const dateColumns = columns?.[0]?.columns.filter((column) => {
      return allColumns[column] === 'Date';
    });
    return dateColumns;
  }

  protected setApiToken(authToken: any) {
    const headerAuthorizationValue = `Bearer ${authToken}`;
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      headerAuthorizationValue
    );
  }

  // ApiResponse calls //
  protected getHttpGetApiResponse(
    url: string,
    functionName: string,
    httpOptionsParams?: HttpParams | { [param: string]: any }
  ): Observable<ApiResponse> {
    if (httpOptionsParams) {
      this.httpOptions.params = httpOptionsParams;
    }

    return this.http.get(url, this.httpOptions).pipe(
      map((x) => this.toApiResponse(x) as any),
      catchError(this.handleApiResponseError(functionName))
    );
  }

  protected getHttpPostApiResponse(
    url: string,
    functionName: string,
    postBody: any
  ): Observable<ApiResponse> {
    return this.http.post(url, postBody, this.httpOptions).pipe(
      map((x) => this.toApiResponse(x) as any),
      catchError(this.handleApiResponseError(functionName))
    );
  }

  protected getHttpPutApiResponse(
    url: string,
    functionName: string,
    body: any
  ): Observable<ApiResponse> {
    return this.http.put(url, body, this.httpOptions).pipe(
      map((x) => this.toApiResponse(x) as any),
      catchError(this.handleApiResponseError(functionName))
    );
  }

  protected getHttpDeleteApiResponse(
    url: string,
    functionName: string
  ): Observable<ApiResponse> {
    return this.http.delete(url, this.httpOptions).pipe(
      map((x) => this.toApiResponse(x) as any),
      catchError(this.handleApiResponseError(functionName))
    );
  }

  protected handleApiResponseError(operation = 'operation not provided') {
    return (error: any): Observable<any> => {
      if (error) {
        return of({
          success: false,
          data: '',
          clientErrorMessage:
            error?.error?.clientErrorMessage || error.statusText,
        });
      }
      return of(null);
    };
  }

  protected toApiResponse(value: any): ApiResponse {
    const result: ApiResponse = {
      success: false,
      data: '{}',
      clientErrorMessage: '',
    };

    result.success = value.success ? value.success : false;
    result.data =
      value.data || (!value.data && value.data === 0) ? value.data : '{}';
    result.clientErrorMessage = result.success ? '' : result.data;

    return result;
  }
}
