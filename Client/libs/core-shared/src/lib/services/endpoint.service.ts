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

  protected getHttpHeaders(): Observable<any> {
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
              UseQueryOptimization: '1'
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
    if (value != null && value.hasOwnProperty('status')) {
        const executionSuccessful = value.status === 200 ? true : false;
        return {
            success: executionSuccessful,
            data: value.data,
            clientErrorMessage: executionSuccessful ? null : value.title
        };
    } else {
        let apiSuccess = value?.succeeded ? value?.succeeded : value?.success ? value?.success : null;
        let cemsg = value?.message ? value?.message : value?.clientErrorMessage ? value?.clientErrorMessage : null
        return {
            success: apiSuccess,
            data: value?.hasOwnProperty('data') ? value.data : value,
            clientErrorMessage: cemsg
        }
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

  protected callHttpGet(url: string, functionName: string, httpOptionsParams?: any): Observable<any> {
    return this.getHttpHeaders().pipe(
      switchMap(httpOptions => { 
        if (httpOptionsParams) {
          httpOptions.params = httpOptionsParams
        }
        return this.http.get(url, httpOptions) 
      }),
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

  protected callHttpPostWithBlobResponse(url: string, functionName: string, postBody: any): Observable<any> {
    return this.getHttpHeaders().pipe(
      switchMap(httpHeaders => {
        httpHeaders.responseType = 'blob' as 'json';
        return this.http.post(url, postBody, httpHeaders)
      }),
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

  protected callHttpDelete(url: string, functionName: string): Observable<any> {
    return this.getHttpHeaders().pipe(
      switchMap(httpHeaders => this.http.delete(url, httpHeaders)),
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
