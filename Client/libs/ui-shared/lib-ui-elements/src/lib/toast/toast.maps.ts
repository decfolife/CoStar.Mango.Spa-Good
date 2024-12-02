import { ToastState } from '@mango/data-models/lib-data-models';

export const BORDER_COLOR_MAP = {
  [ToastState.INFORMATION]: 'info-toast-border-color',
  [ToastState.SUCCESS]: 'success-toast-border-color',
  [ToastState.WARNING]: 'warning-toast-border-color',
  [ToastState.ERROR]: 'error-toast-border-color',
};

export const ICON_BG_COLOR_MAP = {
  [ToastState.INFORMATION]: 'info-icon-bgcolor',
  [ToastState.SUCCESS]: 'success-icon-bgcolor',
  [ToastState.WARNING]: 'warning-icon-bgcolor',
  [ToastState.ERROR]: 'error-icon-bgcolor',
};

export const POSITION_MAP = {
  'top left': { top: '20px', left: '20px' },
  'top center': { top: '20px', left: '40%' },
  'top right': { top: '20px', right: '20px' },
  'bottom left': { bottom: '20px', left: '20px' },
  'bottom center': { bottom: '20px', left: '40%' },
  'bottom right': { bottom: '20px', right: '20px' },
};
