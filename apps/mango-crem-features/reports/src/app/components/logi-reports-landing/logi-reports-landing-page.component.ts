import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'logi-reports-landing-page',
  templateUrl: './logi-reports-landing-page.component.html',
  styleUrls: ['./logi-reports-landing-page.component.scss']
})
export class LogiReportsLandingPageComponent {

  constructor(
    private router: Router 
    ) {}

  ngOnInit(): void {
    const url = this.router.url;
    const regex = /(?<=\&report\=).*/g;
    const report = url.match(regex);
    if (report?.length === 1) {
      switch (report[0]) {
        case "exchange-rate-sets":
          window.location.href = '/Reports/exchange-rate-sets';
          break;
        case "group-user-blocked-admin-links":
          window.location.href = '/Reports/group-user-blocked-admin-links';
          break;
        case "group-user-history":
          window.location.href = '/Reports/group-user-history';
          break;
        case "group-user-module-rights":
          window.location.href = '/Reports/group-user-module-rights';
          break;
        case "group-user-navigation-rights":
          window.location.href = '/Reports/group-user-navigation-rights';
          break;
        default:
      }
    }
  }
}
