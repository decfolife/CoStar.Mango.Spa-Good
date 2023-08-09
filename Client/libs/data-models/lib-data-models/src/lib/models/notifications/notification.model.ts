import { NotificationTypesEnum } from './notification-types.enum';

export class Notification {
  public type: NotificationTypesEnum;
  public title: string;
  public message: string;

  constructor(
    type: NotificationTypesEnum = NotificationTypesEnum.Success,
    title: string = '',
    message: string = ''
  ) {
    this.type = type;
    this.title = title;
    this.message = message;
  }
}
