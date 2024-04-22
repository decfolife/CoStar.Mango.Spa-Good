import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injector, ModuleWithProviders, NgModule } from "@angular/core";
import { Router } from "@angular/router";
import { JwtService, MangoErrorHandler, UtilitiesService } from "@mango/core-shared/lib-core-shared";
import { CentralAuthErrorCodes, CentralAuthHttpError, IGNORED_ERRORS, MangoErrorTypes, UNEXPECTED_ERROR_MESSAGE } from "@mango/data-models/lib-data-models";
import { Observable, throwError } from "rxjs";
import { catchError, finalize, switchMap, take } from "rxjs/operators";
import { CentralAuthFacade } from "../+state/facades";

@NgModule()
export class CentralAuthHttpInterceptor extends MangoErrorHandler<any> implements HttpInterceptor {

  constructor(injector: Injector) {
    super(injector)
  }

  get router(): Router {
    return this.injector.get(Router)
  }

  get facade(): CentralAuthFacade {
    return this.injector.get(CentralAuthFacade)
  }

  get jwtService(): JwtService {
    return this.injector.get(JwtService)
  }

  static forRoot(): ModuleWithProviders<CentralAuthHttpInterceptor> {
    return {
      ngModule: CentralAuthHttpInterceptor,
      providers: [{
        provide: HTTP_INTERCEPTORS, useFactory: (injector) => (new CentralAuthHttpInterceptor(injector)),
        deps: [Injector],
        multi: true
      }]
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (UtilitiesService.isLocalEnvironment()) {
      let token = this.jwtService.getToken()
      const headers = this.generateRequestHeaders(token)
      const request = req.clone({ setHeaders: headers })
      return next.handle(request).pipe(
        catchError(this.handleError),
        // finalize(() => {
        //   this.facade.setLoading(false);
        // })
      )
    }

    return this.facade.accessToken$.pipe(
      take(1),
      switchMap(token => {
        const headers = this.generateRequestHeaders(token)
        const request = req.clone({ setHeaders: headers })
        return next.handle(request)
      }),
      catchError(this.handleError),
      // finalize(() => {
      //   this.facade.setLoading(false);
      // })
    )
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
      traceId: null
    }

    const caHttpError: CentralAuthHttpError = errorResponse.error?.traceId ? errorResponse.error : genericErrorObject

    if (caHttpError.status === 401) {
      caHttpError.title = 'Unauthorized'
      caHttpError.message = caHttpError.message;
      this.facade.logout()
      this.router.navigate(['/'])
      this.showErrorNotification(caHttpError.message, caHttpError.title, MangoErrorTypes.FATAL)
    }

    if (caHttpError.errorCode === CentralAuthErrorCodes.ForceLogout) {
      this.facade.logout()
      window.location.href = '?caforcelogout=true';
    }

    return throwError(caHttpError);
  }

  generateRequestHeaders(accessToken: string): any {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
    accessToken ? headers['Authorization'] = `Bearer ${accessToken}` : null
    return headers
  }
}