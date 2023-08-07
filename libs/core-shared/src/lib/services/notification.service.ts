import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { NotificationTypesEnum } from '@mango/data-models/lib-data-models';
import { Notification } from '@mango/data-models/lib-data-models';

@Injectable()
export class NotificationService {
  private notifications = new Subject<Notification>();

  constructor() {}

  showNotification(
    type: NotificationTypesEnum,
    title: string,
    message: string
  ) {
    this.notifications.next(new Notification(type, title, message));
  }

  showSuccessNotification(title: string, message: string) {
    this.notifications.next(
      new Notification(NotificationTypesEnum.Success, title, message)
    );
  }

  showWarningNotification(title: string, message: string) {
    this.notifications.next(
      new Notification(NotificationTypesEnum.Warning, title, message)
    );
  }

  showErrorNotification(title: string, message: string) {
    this.notifications.next(
      new Notification(NotificationTypesEnum.Error, title, message)
    );
  }

  showInformationNotification(title: string, message: string) {
    this.notifications.next(
      new Notification(NotificationTypesEnum.Info, title, message)
    );
  }

  getNotification(): Observable<any> {
    return this.notifications.asObservable();
  }
}
