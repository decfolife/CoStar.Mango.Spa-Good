export enum ToastState {
  INFORMATION = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

// Type guard for ToastState
export function isToastState(value: any): value is ToastState {
  return Object.values(ToastState).includes(value);
}

export enum SearchOption {
  MAGNIFYING_GLASS = 'magnifying_glass',
  TYPING = 'typing',
}

export enum RemFormLayout {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
  INLINE = 'inline',
}

export enum FormLabelAlignment {
  LEFT = 'left',
  RIGHT = 'right',
}

export type CremFormControlStatusType =
  | 'success'
  | 'error'
  | 'warning'
  | 'validating'
  | '';

export enum Pill {
  BASIC = 'basic',
  SUCCESS = 'success',
  SUCCESS_FILLED = 'success-filled',
  WARNING = 'warning',
  WARNING_FILLED = 'warning-filled',
  DANGER = 'danger',
  DANGER_FILLED = 'danger-filled',
  DISABLED = 'disabled',
}