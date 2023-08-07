import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../../mango/src/environments/environment.local';


export class EndpointService {
  // TODO: Should this be hard-coded like this?
  protected httpOptions: any = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'UserId': '2',
        'ClientKey': 'RETAILDEMO'
    })
  };

  private static logged = false;

  constructor(protected http: HttpClient) {

    if (environment.name !== 'PROD' && !EndpointService.logged) {
      EndpointService.logged = true;
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
    if (environment.isRestful) {
      return {
        success: value.succeeded,
        data: value.hasOwnProperty('data')
          ? value.data
          : value,
        clientErrorMessage: value.succeeded ? null : value.message
      }
    }

    let res = value.d.hasOwnProperty('Result') ? value.d.Result : value.d;
    let data =  JSON.parse(res);;

    return {
      success: data.succeeded,
      data: data.hasOwnProperty('data')
        ? data.data
        : data,
      clientErrorMessage: data.succeeded ? null : data.message
    };
  }
}