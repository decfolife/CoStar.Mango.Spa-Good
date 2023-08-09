import { Injectable } from '@angular/core';

@Injectable()
// DB keys
export class DBkeys {
  public static readonly SELECTED_CUSTOMER = 'selected_customer';
  public static readonly JWT_TOKEN = 'jwt_token';
  public static readonly USER_AUTH = 'user_auth';
  public static readonly CLIENT_KEY = 'client_key';
  public static readonly CONTACT_RECORD = 'contact_record';
}
