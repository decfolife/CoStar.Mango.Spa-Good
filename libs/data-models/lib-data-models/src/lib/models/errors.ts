export interface Errors {
  errors: { [key: string]: string };
}

export enum MangoErrorTypes {
  INFO = 'INFO',
  WARNING = 'WARNING',
  FATAL = 'FATAL'
}


export const NOTIFICATION_ERROR_TYPES_MAP = {
  [MangoErrorTypes.INFO]: 'info',
  [MangoErrorTypes.WARNING]: 'warning',
  [MangoErrorTypes.FATAL]: 'error',
}

export abstract class MangoError {
  title?: string;
  message?: string;
  errorCode: string;
  errorType: MangoErrorTypes;
}