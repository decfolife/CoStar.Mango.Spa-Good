import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injector, ModuleWithProviders, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import {
  JwtService,
  MangoErrorHandler,
  UtilitiesService,
} from '@mango/core-shared/lib-core-shared';
import {
  CentralAuthErrorCodes,
  CentralAuthHttpError,
  MangoErrorTypes,
  UNEXPECTED_ERROR_MESSAGE,
} from '@mango/data-models/lib-data-models';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, switchMap, take } from 'rxjs/operators';
import { CentralAuthFacade } from '../+state/facades';

@NgModule()
export class CentralAuthHttpInterceptor
  extends MangoErrorHandler<any>
  implements HttpInterceptor
{
  constructor(injector: Injector) {
    super(injector);
  }

  get router(): Router {
    return this.injector.get(Router);
  }

  get facade(): CentralAuthFacade {
    return this.injector.get(CentralAuthFacade);
  }

  get jwtService(): JwtService {
    return this.injector.get(JwtService);
  }

  static forRoot(): ModuleWithProviders<CentralAuthHttpInterceptor> {
    return {
      ngModule: CentralAuthHttpInterceptor,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useFactory: (injector) => new CentralAuthHttpInterceptor(injector),
          deps: [Injector],
          multi: true,
        },
      ],
    };
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (UtilitiesService.isLocalEnvironment()) {
      let token = this.jwtService.getToken();
      const headers = this.generateRequestHeaders(token);
      const request = req.clone({ setHeaders: headers });
      return next.handle(request).pipe(catchError(this.handleError));
    }

    return this.facade.user$.pipe(
      take(1),
      switchMap((user) => {
        const headers = this.generateRequestHeaders(null);
        const request = req.clone({ setHeaders: headers });
        return next.handle(request);
      }),
      catchError(this.handleError)
      // finalize(() => {
      //   this.facade.setLoading(false);
      // })
    );
  }

  generateRequestHeaders(accessToken: string): any {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    accessToken ? (headers['Authorization'] = `Bearer ${accessToken}`) : null;
    return headers;
  }

  // Needs to be an arrow function otherwise injector does not work.
  handleError = (errorResponse: HttpErrorResponse) => {
    const genericErrorObject: CentralAuthHttpError = {
      message: UNEXPECTED_ERROR_MESSAGE,
      title: 'Error',
      errorType: MangoErrorTypes.FATAL,
      errorCode: CentralAuthErrorCodes.InternalError,
      status: errorResponse.status,
      trackingId: null,
      traceId: null,
    };

    const caHttpError: CentralAuthHttpError = errorResponse.error?.traceId
      ? errorResponse.error
      : genericErrorObject;

    let isLoadCurrentUserRequest = errorResponse.url.includes('/api/auth/user');

    // When the user is not logged-in, and we are fetching the current user on application startup,
    // and we are on the login page, then dont show 401 error
    if (
      this.isLoginPage() &&
      isLoadCurrentUserRequest &&
      caHttpError.status === 401
    ) {
      return;
    }

    if (caHttpError.status === 401) {
      caHttpError.title = 'Unauthorized';
      caHttpError.message = errorResponse.error.message;
      this.facade.logout();
      this.router.navigate(['/']);
    }

    if (caHttpError.errorCode === CentralAuthErrorCodes.ForceLogout) {
      this.facade.logout();
      window.location.href = '?caforcelogout=true';
    }

    return throwError(caHttpError);
  };

  // If login page OR client specific login page
  isLoginPage(): boolean {
    let isLoginPage = this.router.url === '/';

    // If the current path does not match an existing route, we are probably on the client specific login page
    // Cannot use snapshot.paramMap.get('clientKey'). Not available on initial load.
    let isClientSpecificLogin =
      this.router.config.filter((x) => x.path === this.router.url.split('/')[1])
        .length === 0;

    return isLoginPage || isClientSpecificLogin;
  }
}
