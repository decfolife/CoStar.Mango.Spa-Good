/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable rxjs-angular/prefer-composition */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api, ApiResponse } from '@mango/data-models/lib-data-models';
import { BehaviorSubject, Observable } from 'rxjs';
import { DashboardVm } from '../shared/models/dashboard-model';
import { DataService } from './data.service'
import { environment } from 'apps/mango/src/environments/environment.local';
import { MatDialog } from '@angular/material/dialog';
import { GenericErrorComponent } from '../components/dashboard/modal/genericError/genericError.component';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { UtilitiesService } from '@mango/core-shared';

@Injectable()
export class DashboardService extends DataService {
    dashboardsUrl: string = UtilitiesService.getBaseApiUrl(Api.dashboards)
    accountingServiceUrl: string = UtilitiesService.getBaseApiUrl(Api.accountingService)
    private _baseUrlOverride = 'dashboards/';
    private _dashboardId: number;
    private _currentCalendarId: number;
    private hasResponse = true;

    constructor(protected http: HttpClient, dialog: MatDialog, facade: MangoAppFacade) {
        super(http, dialog, facade);
    }

    // VM Data
    private _dashboardData = new BehaviorSubject<DashboardVm>({
        calendarFilterData: [],
        clientSite: '',
        portfolioFilterData: [],
        yearFilterData: [],
        cardsMetaData: [],
        selectedPortfolioIds: '',
        selectedCalendarId: null,
        selectedYear: ''
    });
    DashboardData$ = this._dashboardData.asObservable();
    
    // Loading indicator that can be called by the service layer
    private _loading = new BehaviorSubject<boolean>(true);
    isLoading$ = this._loading.asObservable();
    
    // Use this call to set what the base URL and other environment stuff
    // TODO: Lock down and peer review
    private configure(api: string) {
        this.setApiUrl(api);
  }

    public onLoad(api: any){
        // It's assumed loading is TRUE at this point
        if (api) {
            this._baseUrlOverride = '';
            this.configure(api);
        }

        // this.registerClient().subscribe(result => {
        //     if (!result.success) {
        //         this._loading.next(false);
        //     }
        //     this.setApiToken(result.data);
        this.loadDashboardData().subscribe(apiResponse => {
            if (apiResponse.success) {
                this._dashboardData.next(apiResponse.data);
                this._loading.next(true);
            } 
            else if (!apiResponse.success) {
                this.errorDialog(apiResponse.clientErrorMessage);
                this._loading.next(false);
            }
            else {
                // At this point it's either validation issue or dashboard service 500
                this._loading.next(false);
            }
        });   
        return this._loading.asObservable();
        // });
    }

    public onCalendarChange(calendarId: number) {
        throw('Not Implemented');
    }
   
    public errorDialog(errorMsg) {
        this.dialog.open(GenericErrorComponent ,{
          width: '600px',
          data: errorMsg
       });
    }

    public loadDashboardData(): Observable<ApiResponse> {
        const route = `${this.accountingServiceUrl}accounting`;
        return this.getHttpGetApiResponse(route, 'GetDashboardData', route)
    }

    public getSecurityLevel(): Observable<ApiResponse> {
        const route = `${this.dashboardsUrl}accounting/securitylevel`;
        return this.getHttpGetApiResponse(route, 'GetUserSecurityLevel')
    }
}
