import { MangoError, MangoErrorTypes } from '../errors.interface';

export enum CentralAuthErrorCodes {
  Unknown = 'UNKNOWN',
  NotFound = 'NOT_FOUND',
  NotAllowed = 'NOT_ALLOWED',
  InternalError = 'INTERNAL_ERROR',
  PermissionDenied = 'PERMISSION_DENIED',
  InvalidLogin = 'INVALID_LOGIN',
  NotValid = 'NOT_VALID',
  NotAuthorized = 'NOT_AUTHORIZED',
  ForceLogout = 'FORCE_LOGOUT',
  V06LoginError = 'REM_LOGIN_ERROR',
  SqsTimeout = 'SQS_TIMEOUT',
  UserNotAuthorizedForClient = 'NOT_AUTHORIZED_FOR_CLIENT',
  AccountLockedOut = 'ACCOUNT_LOCKED_OUT',
  EmailCannotBeChanged = 'EMAIL_CANNOT_BE_CHANGED',
  UserSiteNotFound = 'USER_SITE_NOT_FOUND',
  UserSitesNotFound = 'USER_SITES_NOT_FOUND',
  UserSiteNotActive = 'USER_SITE_NOT_ACTIVE',
  ClientSiteNotFound = 'CLIENT_SITE_NOT_FOUND',
  ClientSitesNotFound = 'CLIENT_SITES_NOT_FOUND',
  ClientSiteAlreadyExists = 'CLIENT_SITE_ALREADY_EXISTS',
  ResetTokenExpired = 'RESET_TOKEN_EXPIRED',
  CreateContactError = 'CREATE_CONTACT_ERROR',
}

export class CentralAuthHttpError extends MangoError {
  constructor(
    public override title: string,
    public override message: string,
    public status: number,
    public override errorCode: string,
    public type: string,
    public trackingId: string,
    public traceId: string
  ) {
    super();
  }
}

export class CentralAuthUIError extends MangoError {
  constructor(
    public override title: string,
    public override message: string,
    public override errorCode: string,
    public override errorType: MangoErrorTypes
  ) {
    super();
  }
}

export class CentralAuthError extends MangoError {
  traceId?: string;
  trackingId?: string;
  httpStatusCode?: number;

  constructor(error: CentralAuthHttpError | CentralAuthUIError) {
    super();

    this.title = error.title;
    this.errorCode = error.errorCode;
    this.errorType = error.errorType || MangoErrorTypes.FATAL;
    this.message = error.message;

    if (error instanceof CentralAuthHttpError) {
      this.httpStatusCode = error.status;
      this.traceId = error.traceId;
      this.trackingId = error.trackingId;
    }
  }
}
