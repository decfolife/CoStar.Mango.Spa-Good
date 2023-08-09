export class AlertType {
  alertTypeID: number;

  alertType: string;
  description: string;

  constructor(typeID: number, type: string = '', description: string = '') {
    this.alertTypeID = typeID;
    this.alertType = type;
    this.description = description;
  }
}
