import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '@mango/core-shared';
import { MangoNavigationService } from '@mangoSpa/src/app/services/navigation.service';

@Component({
  selector: 'session-expired',
  templateUrl: './session-expired.component.html',
  styleUrls: ['./session-expired.component.scss'],
})
export class SessionExpiredComponent implements OnInit {
  constructor(private navigationService: MangoNavigationService) {}

  ngOnInit(): void {}

  redirectToCA() {
    if (UtilitiesService.isLocalEnvironment()) {
      this.navigationService.redirectToCentralAuth(false);
    }

    this.navigationService.redirectToV06Logout();
  }
}
