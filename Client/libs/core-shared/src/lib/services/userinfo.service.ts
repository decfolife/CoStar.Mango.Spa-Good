import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { V06GlobalSession } from '@mango/data-models/lib-data-models';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Observable, combineLatest } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { environment } from '../../../../../apps/mango/src/environments/environment.local';
import { EndpointService } from './endpoint.service';

@Injectable({
    providedIn: 'root',
})
export class UserInfoService extends EndpointService {
    constructor(protected http: HttpClient, protected facade: MangoAppFacade) {
        super(http, facade)
    }

    getUserLoginInfo(): Observable<any> {
        let url: string = `${environment.appUrls.userService}/UserService/GetUserLoginInformation`;
        return this.callHttpGet(url, 'getUserLoginInfo');
    }

    getGlobalSession(): Observable<any> {
        return combineLatest([this.facade.clientKey$, this.facade.contactRecord$]).pipe(
            filter(([clientKey, contactRecord]) => !!clientKey && !!contactRecord),
            switchMap(([clientKey, contactRecord]) => this.callHttpGet(`${environment.appUrls.userService}/session?UserId=${contactRecord.contactID}&ClientKey=${clientKey}`, 'getGlobalSession'))
        )
    }

    updateGlobalSession(session: V06GlobalSession): Observable<any> {
        return this.facade.globalSession$.pipe(
            filter(globalSession => !!globalSession),
            switchMap(globalSession => this.callHttpPost(`${environment.appUrls.userService}/session`, 'updateGlobalSession', session || globalSession))
        )
    }
}
