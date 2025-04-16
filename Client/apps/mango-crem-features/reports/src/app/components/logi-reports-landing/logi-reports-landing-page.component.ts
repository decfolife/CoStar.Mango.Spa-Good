import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'logi-reports-landing-page',
  templateUrl: './logi-reports-landing-page.component.html',
  styleUrls: ['./logi-reports-landing-page.component.scss'],
})
export class LogiReportsLandingPageComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    const url = this.router.url;
    const regex = /(?<=\&report\=).*/g;
    const report = url.match(regex);
    if (report?.length === 1) {
      switch (report[0]) {
        case 'exchange-rate-sets':
          this.router.navigate(['/Reports/exchange-rate-sets']);
          break;
        case 'group-user-blocked-admin-links':
          this.router.navigate(['/Reports/group-user-blocked-admin-links']);
          break;
        case 'group-user-history':
          this.router.navigate(['/Reports/group-user-history']);
          break;
        case 'group-user-module-rights':
          this.router.navigate(['/Reports/group-user-module-rights']);
          break;
        case 'group-user-navigation-rights':
          this.router.navigate(['/Reports/group-user-navigation-rights']);
          break;
        default:
      }
    }
  }
}
