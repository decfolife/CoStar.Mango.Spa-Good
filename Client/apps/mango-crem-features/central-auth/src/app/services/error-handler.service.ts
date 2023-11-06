import { ErrorHandler, Injector, ModuleWithProviders, NgModule, NgZone } from "@angular/core"
import { MangoErrorHandler } from "@mango/core-shared/lib-core-shared"
import { CentralAuthError, CentralAuthHttpError, MangoError, MangoErrorTypes } from "@mango/data-models/lib-data-models"

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
    let err = error
    if (error.promise && error.rejection) {
      err = err.rejection
    }
    if (!(err instanceof CentralAuthHttpError)) {
      if (err.errorType) {
        this.zone.run(() => this.showErrorNotification(err.message, 'Error', err.errorType))
      }
      else {
        console.error(err)
      }
    }
  }

  static isHttpError(error: MangoError): boolean {
    return error.hasOwnProperty('traceId')
  }
}
