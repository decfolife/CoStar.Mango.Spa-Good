import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '@mango/data-models/lib-data-models';
import { environment } from 'apps/mango/src/environments/environment.local';
import { Observable, of } from 'rxjs';

export class EndpointService {
  private static logged = false;
  user: User;
  // TODO: Should this be hard-coded like this?
  protected httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };

  constructor(protected http: HttpClient) {
    if (environment.name !== 'PROD' && !EndpointService.logged) {
      EndpointService.logged = true;
    }
  }

  protected handleError(operation = 'operation not provided') {
    return (error: any): Observable<any> => {
      console.error(operation, error);

      if (
        error.status === 404 &&
        error.url.toLowerCase().indexOf('griddata') >= 0
      ) {
        return of({ status: error.status });
      }

      return of(null);
    };
  }

  protected toObject(value: any): any {
    if (environment.isRestful) {
      return {
        success: true,
        data: value.data ? value.data : value,
        clientErrorMessage: null,
      };
    }

    const res = value.d.Result ? value.d.Result : value.d;
    const data = JSON.parse(res);

    return {
      success: res.success,
      data: data.data ? data.data : data,
      clientErrorMessage: res.clientErrorMessage,
    };
  }
}
