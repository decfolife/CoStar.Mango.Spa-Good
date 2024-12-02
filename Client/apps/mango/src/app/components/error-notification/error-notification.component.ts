import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mango-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.scss'],
})
export class ErrorNotificationComponent {
  errorCode: string = null;

  constructor(private route: ActivatedRoute) {
    const errCode = this.route.snapshot.paramMap.get('errorCode');

    if (!!errCode) {
      this.errorCode = errCode;
    }
  }
}
