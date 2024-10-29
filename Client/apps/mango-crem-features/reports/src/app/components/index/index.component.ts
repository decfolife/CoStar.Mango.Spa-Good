import { Component, OnInit } from '@angular/core';
import {
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
  NavigationCancel,
} from '@angular/router';
import { environment } from '../../../../../../mango/src/environments/environment.local';

@Component({
  selector: 'mango-reports',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  title = 'mango-crem-features-reports';
  loading = true;
  env = environment.name;

  constructor(private router: Router) {}

  ngOnInit() {
    if (
      this.env.toUpperCase() == 'OPS' ||
      this.env.toUpperCase() == 'STAGE' ||
      this.env.toUpperCase() == 'PROD'
    ) {
      console.log = function () {};
    }

    this.router.initialNavigation(); // Manually triggering initial navigation for @angular/elements
    this.router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError
    ) {
      this.loading = false;
    }
  }
}
