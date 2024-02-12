import { RemindersRecepient } from "./RemindersRecepient";

export interface Reminder {
  Ticklername: string;
  TransactionName: string;
  TicklerDaysOut: number;
  targetTicklerFrequency: number;
  UserDefinedDate: Date;
  UserDefinedEvent: string;
  TicklerTypeID: number;
  DisplayName: string;
  ContactID: number;
  TicklerMessage: string;
  CompanyName: string;
  ContactFirstName: string;
  ContactLastName: string;
  TickleDescription: string;
  TicklerID: number;
  TickleBy: string;
  LastModified: Date;

  remindersRecepient: RemindersRecepient[];

}