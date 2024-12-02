import { ToastState } from '../../enums/ui-shared-elements.enums';

export interface CremToastOptions {
  duration?: number;
  showBody?: boolean;
  maxWidth?: string;
  position?: string;
  showCloseButton?: boolean;
  closeOnClick?: boolean;
  maxToasts?: number;
}

export interface QueuedToasts {
  content: string;
  title?: string;
  state?: ToastState;
  options?: CremToastOptions;
  contentTemplate?: string;
}
