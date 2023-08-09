import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../../mango/src/environments/environment.local';
import { UserSelectedPageData } from '../models/userSelectedPageData';
import { EndpointService } from './endpoint.service';



@Injectable()
export class StartPageService extends EndpointService{
  constructor(
     protected http: HttpClient
    ) {
    super(http);
  }

  getDefaultStartPagesList(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}Portfolio/GetDefaultStartPageLinks`;
      return this.callHttpGet(url, 'GetDefaultStartPageLinks')
    }
    const url = `${environment.appUrls.dashboards}GetDefaultStartPageLinks`;
    return this.callHttpPost(url, 'GetDefaultStartPageLinks', null)
  }

  saveDefaultStartPage(selection: UserSelectedPageData): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.dashboards}Portfolio/SaveDefaultStartPage`;
      return this.callHttpPost(url, 'SaveDefaultStartPage', selection);
    }
    const url = `${environment.appUrls.dashboards}SaveDefaultStartPage`;
    return this.callHttpPost(url, 'SaveDefaultStartPage', { selection })
  }

  private callHttpGet(url: string, functionName: string): Observable<any> {
    return this.http.get(url, this.httpOptions)
    .pipe(
      map(x => this.toObject(x) as any),
      catchError(this.handleError(functionName))
    );
  }

  private callHttpPost(url: string, functionName: string, postBody: any): Observable<any> {
    return this.http.post(url, postBody, this.httpOptions)
    .pipe(
      map(x => this.toObject(x) as any),
      catchError(this.handleError(functionName))
    );
  }
}

