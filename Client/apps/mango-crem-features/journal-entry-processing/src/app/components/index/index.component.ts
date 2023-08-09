import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { environment } from '../../../../../../mango/src/environments/environment.local';

@Component({
  selector: 'mango-journal-entry-processing',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  title = 'mango-crem-features-journal-entry-processing';
  loading = true;
  env = environment.name;

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.initialNavigation(); // Manually triggering initial navigation for @angular/elements
    this.router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    })

    // TOBE removed once url is configured in left nav
    window.location.href = window.location.href + '/journal-entries-to-approve';

  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

}
