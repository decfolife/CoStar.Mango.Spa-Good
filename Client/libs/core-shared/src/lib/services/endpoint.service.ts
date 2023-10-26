import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Observable, combineLatest, of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { environment } from '../../../../../apps/mango/src/environments/environment.local';

@Injectable()
export abstract class EndpointService {
  private static logged = false;
  userId$: Observable<number> = new Observable<number>(null)
  clientKey$: Observable<string> = new Observable<string>(null)

  constructor(protected http: HttpClient, protected facade: MangoAppFacade) {
    if (environment.name !== 'PROD' && !EndpointService.logged) {
      EndpointService.logged = true;
    }

    if (this.facade) {
      this.userId$ = this.facade.contactRecord$.pipe(filter(contactRecord => !!contactRecord), switchMap(contactRecord => of(contactRecord.contactID)))
      this.clientKey$ = this.facade.clientKey$.pipe(switchMap(clientKey => of(clientKey)))
    }
  }

  protected getHttpHeaders(): Observable<{ headers: HttpHeaders }> {
    if (this.facade) {
      return combineLatest([this.userId$, this.clientKey$]).pipe(
        filter(([userId, clientKey]) => !!userId && !!clientKey),
        switchMap(([userId, clientKey]) => of(
          {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'UserId': userId ? userId.toString() : '2',
              'ClientKey': clientKey || 'RETAILDEMO',
              UseQueryOptimization: '1',
              'ApiKey': 'u1rfLIr102JFGKwNHn4xj2'
            })
          }
        ))
      );
    }
    else {
      return of(
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'UserId': '2',
            'ClientKey': 'RETAILDEMO'
          })
        });
    }
  }

  protected handleError(operation = 'operation not provided') {
    return (error: any): Observable<any> => {
      console.error(operation, error);

      if (error.status === 404 && error.url.toLowerCase().indexOf('griddata') >= 0) {
        return of({ status: error.status });
      }

      return of(null);
    };
  }

  // This method processing error response and passes status code and statue message back to calling method.
  // This is here so that when design is ready to display messages for user, we don't have to touch service code.
  protected handleTaskApprovalError(operation) {
    return (error: any): Observable<any> => {
      console.error(operation, error);
      return of({ status: error.status, statusText: error.statusText });
    };
  }

  protected toObject(value: any): any {
      return {
        success: value?.succeeded,
        data: value?.hasOwnProperty('data') ? value.data : value,
        clientErrorMessage: value?.succeeded ? null : value?.message
      }
  }

  protected byteArrayFromResponse(response: any) {
    let data = response.d.hasOwnProperty('Result') ? response.d.Result : response.d;

    var binary_string = window.atob(data);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }

    return bytes.buffer;
  }

  protected callHttpGet(url: string, functionName: string): Observable<any> {
    return this.getHttpHeaders().pipe(
      switchMap(httpHeaders => this.http.get(url, httpHeaders)),
      map(x => this.toObject(x) as any),
      catchError(this.handleError(functionName))
    )
  }

  protected callHttpPost(url: string, functionName: string, postBody: any): Observable<any> {
    return this.getHttpHeaders().pipe(
      switchMap(httpHeaders => this.http.post(url, postBody, httpHeaders)),
      map(x => this.toObject(x) as any),
      catchError(this.handleError(functionName))
    )
  }

  protected callHttpPut(url: string, functionName: string, postBody: any): Observable<any> {
    return this.getHttpHeaders().pipe(
      switchMap(httpHeaders => this.http.put(url, postBody, httpHeaders)),
      map(x => this.toObject(x) as any),
      catchError(this.handleError(functionName))
    )
  }

  protected callHttpPostByteArray(url: string, functionName: string, postBody: any): Observable<any> {
    return this.getHttpHeaders().pipe(
      switchMap(httpHeaders => this.http.post(url, postBody, httpHeaders)),
      map(x => this.byteArrayFromResponse(x) as any),
      catchError(this.handleError(functionName))
    )
  }
}
