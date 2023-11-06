import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injector, ModuleWithProviders, NgModule } from "@angular/core";
import { MangoErrorHandler } from "@mango/core-shared/lib-core-shared";
import { CentralAuthErrorCodes, CentralAuthHttpError, MangoErrorTypes, UNEXPECTED_ERROR_MESSAGE } from "@mango/data-models/lib-data-models";
import { Observable, throwError } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { CentralAuthFacade } from "../+state/facades";
import { Router } from "@angular/router";

const IGNORED_ERRORS = [CentralAuthErrorCodes.ResetTokenExpired]

@NgModule()
export class CentralAuthHttpInterceptor extends MangoErrorHandler<any> implements HttpInterceptor {

  constructor(injector: Injector) {
    super(injector)
  }

  private get router(): Router {
    return this.injector.get(Router)
  }

  private get facade(): CentralAuthFacade {
    return this.injector.get(CentralAuthFacade)
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
    return this.facade.accessToken$.pipe(
      switchMap(token => {
        const headers = {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        }
        token ? headers['Authorization'] = `Bearer ${token}` : null
        const request = req.clone({ setHeaders: headers })
        return next.handle(request)
      }),
      catchError((errorResponse: HttpErrorResponse) => {
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
          caHttpError.message = caHttpError.message;
          this.facade.logout()
          this.router.navigate(['/'])
        }

        if (caHttpError.errorCode as CentralAuthErrorCodes === CentralAuthErrorCodes.SqsTimeout) {
          caHttpError.errorType = MangoErrorTypes.WARNING
          caHttpError.title = 'Warning'
        }

        if (!IGNORED_ERRORS.includes(caHttpError.errorCode as CentralAuthErrorCodes)) {
          this.showErrorNotification(caHttpError.message, caHttpError.title, caHttpError.errorType)
          return 
        }

        if (caHttpError.errorCode === CentralAuthErrorCodes.ForceLogout) {
          this.facade.logout()
          window.location.href = '?caforcelogout=true';
        }

        return throwError(caHttpError);
      })
    )
  }
}