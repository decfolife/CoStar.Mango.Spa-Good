import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastMessageService {
  constructor(private messageService: MessageService) {}

  /**
   * Displays a toast message with the specified severity.
   *
   * @param summary - The summary text for the toast.
   * @param detail - The detailed message text.
   * @param severity - The severity level of the message. Possible values are:
   *  - "success": Indicates a successful operation.
   *  - "info": Provides informational messages.
   *  - "warning": Warns about potential issues.
   *  - "primary": Represents primary information.
   *  - "help": Suggests help or guidance.
   *  - "danger": Indicates a dangerous or critical situation.
   *  - "secondary": Additional or less important information.
   *  - "contrast": Highlights contrasting information.
   * Default is "error" if not provided.
   */

  showToast(severity = 'Error', summary: string, message: string, time = 6000) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: message,
      life: time,
    });
  }

  showSuccess(message: string, time = 6000) {
    this.showToast('success', 'Success', message, time);
  }

  showError(message: string, time = 6000) {
    this.showToast('error', 'Error', message, time);
  }

  showInfo(message: string, time = 6000) {
    this.showToast('info', 'Info', message, time);
  }

  showWarn(message: string, time = 6000) {
    this.showToast('warn', 'Warning', message, time);
  }
}
