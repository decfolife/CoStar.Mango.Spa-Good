import { ErrorHandler, Injector, ModuleWithProviders, NgModule, NgZone } from "@angular/core"
import { MangoErrorHandler } from "@mango/core-shared/lib-core-shared"
import { CentralAuthError, CentralAuthErrorCodes, CentralAuthHttpError, IGNORED_ERRORS, MangoError, MangoErrorTypes } from "@mango/data-models/lib-data-models"

@NgModule()
export class CentralAuthErrorHandler extends MangoErrorHandler<CentralAuthError> {

  static forRoot(): ModuleWithProviders<CentralAuthErrorHandler> {
    return {
      ngModule: CentralAuthErrorHandler,
      providers: [{
        provide: ErrorHandler, useFactory: (injector, zone) => (new CentralAuthErrorHandler(injector, zone)),
        deps: [Injector, NgZone]
      }]
    }
  }

  constructor(protected injector: Injector, private zone: NgZone) {
    super(injector)
  }

  handleError(error: any): void {
    if (error.promise && error.rejection) {
      error = error.rejection
    }

    if (!(error instanceof CentralAuthHttpError)) {
      if (error.errorCode && !IGNORED_ERRORS.includes(error.errorCode as CentralAuthErrorCodes)) {
        this.zone.run(() => this.showErrorNotification(error.message, error.title ?? 'Error', MangoErrorTypes.FATAL))
      }
      else {
        console.error(error)
      }
    }
  }

  static isHttpError(error: MangoError): boolean {
    return error.hasOwnProperty('traceId')
  }
}
