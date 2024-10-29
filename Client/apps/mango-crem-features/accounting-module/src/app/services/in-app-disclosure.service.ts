import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import {
  Api,
  CardRequest,
  CardConfig,
} from '@mango/data-models/lib-data-models';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

import { UtilityService } from './utility.service';
import { DashboardService } from '@accounting-dashboard/services/dashboard.service';
import { StorageService } from '@mango/core-shared';

@Injectable()
export class InAppDisclosureService extends EndpointService {
  reportsUrl: string = UtilitiesService.getBaseApiUrl(Api.reports);
  accountingServiceUrl: string = UtilitiesService.getBaseApiUrl(
    Api.accountingService
  );
  dashboardsUrl: string = UtilitiesService.getBaseApiUrl(Api.dashboards);
  public dateFormat: string;
  private httpOptionsWithParams;
  private httpOptions;

  /**
   * Dashboard Data
   *
   * @memberof InAppDisclosureService
   */
  private _dashboardViewData = new BehaviorSubject({
    IADCardData: [],
    pivotDataSources: [],
    cardFieldConfigs: [],
    decimalPrecision: 2,
    localCardConfig: [],
  });
  DashboardViewData$ = this._dashboardViewData.asObservable();

  private _isLoading = new BehaviorSubject<boolean>(true);
  IsLoading$ = this._isLoading.asObservable();

  /**
   * Represented in Hours
   *
   * @type {number}
   * @memberof InAppDisclosureService
   */
  public localSessionExpirationTime = 3 as number;

  private _debug = false as boolean;
  private _sessionId: string;

  constructor(
    protected http: HttpClient,
    @Optional() facade: MangoAppFacade,
    private utilityService: UtilityService,
    private dashboardService: DashboardService,
    private storageService: StorageService
  ) {
    super(http, facade);
  }

  public getSegments(
    criteriaSetID?,
    includeArchived = false as boolean
  ): Observable<any> {
    let param;

    if (criteriaSetID) {
      param = {
        CriteriaSetID: criteriaSetID,
        includeArchived: includeArchived,
      };
    } else {
      param = { includeArchived: includeArchived };
    }

    const url = `${this.reportsUrl}ReportsSegments/Segments`;
    return this.callHttpGet(url, 'getSegments', param);
  }

  public getIADCardData(
    dashboardID,
    segmentID,
    reportingYear,
    reportingCurrency
  ) {
    const param = {
      dashboardID: dashboardID,
      segmentID: segmentID,
      reportingYear: reportingYear,
      reportingCurrencyISO: reportingCurrency,
    };
    const url = `${this.accountingServiceUrl}IAD/IADCardData`;
    return this.callHttpGet(url, 'getIADCardData', param);
  }

  public getIADCardConfigs(dashboardId: number): Observable<any> {
    const param = { dashboardId: dashboardId };
    const url = `${this.accountingServiceUrl}IAD/IADCardConfigs`;
    return this.callHttpGet(url, 'getIADCardData', param);
  }

  public getAccountingCriteriaSets() {
    const url = `${this.accountingServiceUrl}accounting/criteriasets`;
    return this.callHttpGet(url, 'getAccountingCriteriaSets');
  }

  public exportIADData(
    segmentID: number,
    reportingYear: number,
    reportingCurrencyISO: string,
    dashboardID: number
  ) {
    const param = {
      segmentID: segmentID,
      reportingYear: reportingYear,
      reportingCurrencyISO: reportingCurrencyISO,
      dashboardID: dashboardID,
    };
    const url = `${this.accountingServiceUrl}IAD/Export`;

    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
      Accept: 'application/octet-stream',
      UseQueryOptimization: '1',
    });

    return this.callHttpGet(url, 'Export', param, headers, 'blob');
  }

  getUserPreferences(): Observable<any> {
    const url = `${this.dashboardsUrl}Dashboards/GetUserPreferences`;
    return this.callHttpGet(url, 'getGetUserPreferences');
  }

  public getCurrencyDecimalPrecision(currencyISO) {
    const param = { currencyISO: currencyISO };
    const url = `${this.accountingServiceUrl}IAD/CurrencyPrecision`;

    return this.callHttpGet(url, 'getCurrencyPrecision', param);
  }

  public SetDefault(segmentID: number, criteriaSetID: number) {
    const body = { SegmentID: segmentID, CriteriaSetID: criteriaSetID };
    const url = `${this.reportsUrl}ReportsSegments/SetDefault`;

    return this.callHttpPost(url, 'setDefault', body);
  }

  public callHttpGet(
    url: string,
    functionName: string,
    httpOptionsParams?: any,
    httpOptionsHeaders?: any,
    responseType?: any
  ): Observable<any> {
    const httpOptions = this.getHttpHeaders();

    if (httpOptionsParams) {
      httpOptions.params = httpOptionsParams;
    }
    if (httpOptionsHeaders) {
      httpOptions.headers = httpOptionsHeaders;
    }
    if (responseType) {
      httpOptions.responseType = responseType;
      httpOptions.observe = 'response';
    }

    return this.http.get(url, httpOptions).pipe(
      map((x) => this.toObject(x) as any),
      catchError(this.handleError(functionName))
    );
  }

  public toObject(value: any): any {
    if (value instanceof HttpResponse) {
      const apiSuccess = value.status === 200;
      const cemsg = apiSuccess ? null : value.statusText;
      return {
        success: apiSuccess,
        data: { headers: value.headers, body: value.body },
        clientErrorMessage: cemsg,
      };
    } else {
      return super.toObject(value);
    }
  }

  /**
   * Main entry points for the cards. Use `forceReload` true to refetch all the data
   * and ignore the browser's storage.
   *
   * @param {CardRequest} cardRequest
   * @param {boolean} [forceReload=false as boolean]: Refetch all the API data, typically used when the query parameters change
   * @param {boolean} [debug]: Show all the data needed to build the cards
   * @return {*}  {Observable<boolean>}
   * @memberof InAppDisclosureService
   */
  public onLoad(
    cardRequest: CardRequest,
    forceReload = false as boolean,
    debug?: boolean
  ): Observable<boolean> {
    this._debug = debug;
    this._sessionId =
      `accounting_module_${cardRequest.viewConfiguration.dashboardId}` as string;
    this._isLoading.next(true);

    if (this._getCardsFromStorage(cardRequest, forceReload)) {
      this._isLoading.next(false);
    } else {
      // Calls the API
      const now = new Date().getTime();
      const sessionDashboardView: { [key: string]: any } =
        this.storageService.getData(this._sessionId);
      if (sessionDashboardView?.expiration >= now)
        this.storageService.deleteData(this._sessionId);

      this._getCards(cardRequest).subscribe(
        (result) => {
          this._dashboardViewData.next({
            IADCardData: result.IADCardData,
            pivotDataSources: result.pivotDataSources,
            cardFieldConfigs: result.cardFieldConfigs,
            decimalPrecision: result.decimalPrecision,
            localCardConfig: result.localCardConfig,
          });
          this._isLoading.next(false);

          this.storageService.saveSyncedSessionData(
            {
              IADCardConfigs: result.IADCardConfigs,
              decimalPrecision: result.decimalPrecision,
              localCardConfig: result.localCardConfig,
              // Metadata
              cardRequest: cardRequest,
              expiration:
                new Date().getTime() +
                this.localSessionExpirationTime * 60 * 60 * 1000,
            },
            this._sessionId
          );
        },
        (error) => this.dashboardService.showToast(error, 'error')
      );
    }

    return this._isLoading.asObservable();
  }

  /**
   * It builds the PivotDataSource and Cards based on the browser's storage, no API calls.
   *
   * @private
   * @param {CardRequest} cardRequest
   * @param {boolean} forceReload
   * @return {*}  {boolean}
   * @memberof InAppDisclosureService
   */
  private _getCardsFromStorage(
    cardRequest: CardRequest,
    forceReload: boolean
  ): boolean {
    const now = new Date().getTime();
    const { sessionDashboardView, sessionDashboardViewData } =
      this._getSessionStorage();
    this._isLoading.next(true);

    if (
      sessionDashboardView &&
      sessionDashboardViewData && // Get data from the session if the parameters have not changed
      cardRequest.reportingYear ===
        sessionDashboardView.cardRequest.reportingYear &&
      cardRequest.selectedCurrency ===
        sessionDashboardView.cardRequest.selectedCurrency &&
      cardRequest.selectedSegment ===
        sessionDashboardView.cardRequest.selectedSegment &&
      sessionDashboardView.expiration >= now &&
      !forceReload
    ) {
      const cardFieldConfigs = this.utilityService.configureFieldsPerCard(
        // Build FieldConfiguration for each card
        sessionDashboardView.IADCardConfigs,
        sessionDashboardView.localCardConfig,
        sessionDashboardView.decimalPrecision
      );

      const pivotSource: Array<PivotGridDataSource> =
        this.utilityService.buildPivotDataSources(
          // Build DevExtreme's pivot grid for each card
          sessionDashboardViewData,
          cardRequest.viewConfiguration.localCardConfig,
          cardRequest.reportingYear,
          cardFieldConfigs,
          this._debug
        );

      this._dashboardViewData.next({
        IADCardData: sessionDashboardViewData,
        cardFieldConfigs: cardFieldConfigs, // Fresh card config, it cannot be saved on sessionStorage, it lost the callback functions
        pivotDataSources: pivotSource, // Fresh pivotDataSources, it cannot be saved on sessionStorage
        decimalPrecision: sessionDashboardView.decimalPrecision,
        localCardConfig: sessionDashboardView.localCardConfig,
      });
      return true;
    }
    return false;
  }

  /**
   *
   *
   * @param {*} event
   * @param {CardConfig} config
   * @param {boolean} [forceReload]
   * @memberof InAppDisclosureService
   */
  updateCard(event, config: CardConfig, forceReload?: boolean) {
    this._isLoading.next(true);
    const { sessionDashboardView, sessionDashboardViewData } =
      this._getSessionStorage();

    // 1. Modify IADCardData
    if (sessionDashboardView && sessionDashboardViewData && !forceReload) {
      // use browser's storage
      const localCardConfig = sessionDashboardView.localCardConfig;
      const index = this.utilityService.findObjectByID(
        sessionDashboardView.localCardConfig,
        config.id
      );
      localCardConfig[index].filterInitialValue = event;

      const cardFieldConfigs = this.utilityService.configureFieldsPerCard(
        // Build FieldConfiguration for each card
        sessionDashboardView.IADCardConfigs,
        localCardConfig,
        sessionDashboardView.decimalPrecision
      );

      const pivotSource: Array<PivotGridDataSource> =
        this.utilityService.buildPivotDataSources(
          // Build DevExtreme's pivot grid for each card
          sessionDashboardViewData,
          localCardConfig,
          sessionDashboardView.cardRequest.reportingYear,
          cardFieldConfigs,
          this._debug
        );

      this._dashboardViewData.next({
        IADCardData: sessionDashboardViewData,
        cardFieldConfigs: cardFieldConfigs, // Fresh card config, it cannot be saved on sessionStorage, it lost the callback functions
        pivotDataSources: pivotSource, // Fresh pivotDataSources, it cannot be saved on sessionStorage
        decimalPrecision: sessionDashboardView.decimalPrecision,
        localCardConfig: localCardConfig,
      });
      this._isLoading.next(false);

      this.storageService.saveSyncedSessionData(
        {
          IADCardConfigs: sessionDashboardView.IADCardConfigs,
          decimalPrecision: sessionDashboardView.decimalPrecision,
          localCardConfig: localCardConfig,
          // Metadata
          cardRequest: sessionDashboardView.cardRequest,
          expiration:
            new Date().getTime() +
            this.localSessionExpirationTime * 60 * 60 * 1000,
        },
        this._sessionId
      );

      // console.log({localCardConfig, cardFieldConfigs, pivotSource, sessionDashboardViewData, event, config})
    } else {
      // Refetch all data
    }

    // 2. Save viewConfiguration in SessionStorage

    // 3. Emit new card value
    // this._dashboardViewData({
    // })

    // this.localCardConfig[
    // this.utilityService.findObjectByID(this.localCardConfig, config.id)
    // ].filterInitialValue = e;
  }

  /**
   * It gets the ready to use cards for the selected Dashboard view
   *
   * @private
   * @param {CardRequest} cardRequest
   * @return {*}  {Observable<{
   * 		IADCardConfigs: Array<any>,
   * 		IADCardData: Array<any>,
   *     pivotDataSources: Array<PivotGridDataSource>,
   *     decimalPrecision: number,
   * 		localCardConfig: CardConfig[],
   *     cardFieldConfigs: any,
   *   }>}
   * @memberof InAppDisclosureService
   */
  private _getCards(cardRequest: CardRequest): Observable<{
    IADCardConfigs: Array<any>;
    IADCardData: Array<any>;
    pivotDataSources: Array<PivotGridDataSource>;
    decimalPrecision: number;
    localCardConfig: CardConfig[];
    cardFieldConfigs: any;
  }> {
    let IADCardConfigs: Array<any>;
    let IADcardData: Array<any>;
    let pivotDataSources: Array<PivotGridDataSource>;
    let decimalPrecision: number;
    let cardFieldConfigs;

    return this.getCurrencyDecimalPrecision(cardRequest.selectedCurrency).pipe(
      switchMap((currencyPrecision) => {
        decimalPrecision = currencyPrecision.data.DecimalPrecision;
        return this.getIADCardConfigs(
          cardRequest.viewConfiguration.dashboardId
        );
      }),
      switchMap((rIADCardConfigs) => {
        IADCardConfigs = rIADCardConfigs.data;
        cardFieldConfigs = this.utilityService.configureFieldsPerCard(
          IADCardConfigs,
          cardRequest.viewConfiguration.localCardConfig,
          decimalPrecision
        );
        return this.getIADCardData(
          cardRequest.viewConfiguration.dashboardId,
          cardRequest.selectedSegment,
          cardRequest.reportingYear,
          cardRequest.selectedCurrency
        );
      }),
      tap((result) => {
        IADcardData = result.data;
        this.storageService.saveSyncedSessionData(
          result.data,
          this._sessionId + '_card_data'
        );
        pivotDataSources = this.utilityService.buildPivotDataSources(
          IADcardData,
          cardRequest.viewConfiguration.localCardConfig,
          cardRequest.reportingYear,
          cardFieldConfigs,
          this._debug
        );
      }),
      map(() => ({
        IADCardConfigs: IADCardConfigs,
        IADCardData: IADcardData,
        pivotDataSources: pivotDataSources,
        decimalPrecision: decimalPrecision,
        localCardConfig: cardRequest.viewConfiguration.localCardConfig,
        cardFieldConfigs: cardFieldConfigs,
      }))
    );
  }

  private _getSessionStorage(): {
    sessionDashboardView: { [key: string]: any };
    sessionDashboardViewData: Array<any>;
  } {
    const sessionDashboardView: { [key: string]: any } =
      this.storageService.getData(this._sessionId);
    const sessionDashboardViewData: Array<any> = this.storageService.getData(
      this._sessionId + '_card_data'
    ); // todo: this should be part of the same sessionDashboardView
    return { sessionDashboardView, sessionDashboardViewData };
  }
}
