import { ErrorHandler, Inject, Injectable, Injector } from '@angular/core';
import {
  MangoError,
  MangoErrorTypes,
  NOTIFICATION_ERROR_TYPES_MAP,
} from 'libs/data-models/lib-data-models/src/lib/models/errors.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MangoErrorHandler<ErrorClass extends MangoError>
  implements ErrorHandler
{
  constructor(@Inject(Injector) protected injector: Injector) {}

  private get notificationService(): ToastrService {
    return this.injector.get(ToastrService);
  }

  handleError(err: ErrorClass): void {
    this.showErrorNotification(err.message, err.title, err.errorType);
  }

  showErrorNotification(
    message: string,
    title: string,
    errorType: MangoErrorTypes
  ): void {
    this.notificationService[
      NOTIFICATION_ERROR_TYPES_MAP[errorType || MangoErrorTypes.FATAL]
    ](message, title);
  }

  clearNotification() {
    this.notificationService.clear();
  }
}
