/* eslint-disable no-prototype-builtins */
/* eslint-disable quote-props */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of} from 'rxjs';

import { ApiResponse } from '../../shared/models';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from 'apps/mango/src/environments/environment.local';

@Injectable()
export class EndpointService {
  private static logged = false;

  // This endpoint service is going to be removed in the next PR
  protected httpOptions: any = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'UserId': '2',
        'ClientKey': 'blank'
    })
  };



  constructor(protected http: HttpClient) {
    if (environment.name !== 'PROD' && !EndpointService.logged) {
      console.log('ENV=' + environment.name);
      console.log(environment);
      EndpointService.logged = true;
    }
  }

  protected handleError(operation = 'operation not provided') {
    return (error: any): Observable<any> => {
      console.error(operation, error);
      // This code will fire when running locally. If hosted in aspx, the aspx page will
      // likely catch 500 or other status codes and return a ListPageResponse with success=false, which is a 200
      // in the sense of this error handling, therefore, these codes would be bypassed when hosted in aspx. 
      if(operation === 'getGridData') {
        if (error.status === 404) {
          return of({
            success: false,
            clientErrorMessage:'You do not have permission to access this list view.'
          });
        } else if(error.status === 408) {
          return of({
            success: false,
            clientErrorMessage:'The query for this view did not return within ' +
            'the timeout limit. The recommendation is to reduce the number of columns and try ' +
            'again. If this problem persists then the ad-hoc reporting features may yield better results.',
            status: 408
          });
        }
        return of({
          success: false,
          clientErrorMessage:'There was an error retrieving the data for this list view.'
        });
     }
     if(operation === 'getListPageColumns'){
      return of({
        success: false,
        clientErrorMessage:'There was an error retrieving the columns for this list view.'
      });
     }
     if(operation == 'getDynamicSQL') {
      return of({
        success: false,
        clientErrorMessage:'There was an error retrieving the data.'
      });
     }    
     return of(null);
    };
  }

  protected toObject(value: any): ApiResponse {
    if (environment.isRestful) {
      return {
        success: true,
        data: value?.data
          ? value.data
          : value,
        clientErrorMessage: null,
        status: null
      }
    }

    const res = value?.d?.Result ? value.d.Result : value.d;
    let data;
    try {
      data = JSON.parse(res.data);
    } catch (e) {
      data = res;
    }

    return {
      success: res.success,
      data: data?.data
        ? data.data
        : data,
      clientErrorMessage: res.clientErrorMessage,
      status: res.statusCode
    };
  }

  protected toObjectFinancialsApi(value: any): any {
    if (environment.isRestful) {
      return {
        success: value.success,
        data: value.hasOwnProperty('data') ? value.data : value,
        clientErrorMessage: value.success ? null : value.clientErrorMessage
      }
    }

    let res = value.d.hasOwnProperty('Result') ? value.d.Result : value.d;
    let data;
    try {
      data = JSON.parse(res);
    } catch (e) {
      data = res;
    }

    return {
      success: data.success,
      data: data.hasOwnProperty('data')
        ? data.data
        : data,
        clientErrorMessage: data.success ? null : data.clientErrorMessage
    };
  }
}
