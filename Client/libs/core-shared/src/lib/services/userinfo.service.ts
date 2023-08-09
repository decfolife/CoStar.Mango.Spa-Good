import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { EndpointService } from './endpoint.service';
import { environment } from '../../../../../apps/mango/src/environments/environment.local';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Injectable({
    providedIn: 'root',
})
export class UserInfoService extends EndpointService {
    constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
        super(http, facade);
    }

    getUserLoginInfo(): Observable<any> {
        let url: string = `${environment.appUrls.userService}/UserService/GetUserLoginInformation`;
        return this.callHttpGet(url, 'getUserLoginInfo');
    }
}
