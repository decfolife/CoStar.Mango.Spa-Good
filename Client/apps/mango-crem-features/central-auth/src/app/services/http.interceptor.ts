import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injector, ModuleWithProviders, NgModule, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { MangoErrorHandler, UserService } from "@mango/core-shared/lib-core-shared";
import { CentralAuthErrorCodes, CentralAuthHttpError, MangoErrorTypes, UNEXPECTED_ERROR_MESSAGE } from "@mango/data-models/lib-data-models";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { CentralAuthFacade } from "../+state/facades";

const IGNORED_ERRORS = [CentralAuthErrorCodes.ResetTokenExpired]

@NgModule()
export class CentralAuthHttpInterceptor extends MangoErrorHandler<any> implements HttpInterceptor {

  constructor(injector: Injector) {
    super(injector)
  }

  private get userService(): UserService {
    return this.injector.get(UserService)
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
    return next.handle(req)
      .pipe(
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

          if (caHttpError.errorCode as CentralAuthErrorCodes === CentralAuthErrorCodes.SqsTimeout) {
            caHttpError.errorType = MangoErrorTypes.WARNING
            caHttpError.title = 'Warning'
          }
          
          if (!IGNORED_ERRORS.includes(caHttpError.errorCode as CentralAuthErrorCodes)) {
            this.showErrorNotification(caHttpError.message, caHttpError.title, caHttpError.errorType)
          }

          if (caHttpError.errorCode === CentralAuthErrorCodes.ForceLogout) {
            this.userService.logout();
            window.location.href = '?caforcelogout=true';
          }
          if (caHttpError.status === 401) {
            this.facade.logout()
            this.router.navigate(['/'])
          }
          
          return throwError(caHttpError);
        })
      );
  }
}