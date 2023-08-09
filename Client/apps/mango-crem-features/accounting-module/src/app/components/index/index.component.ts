/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable rxjs-angular/prefer-composition */

import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { environment } from '../../../../../../mango/src/environments/environment.local';


@Component({
  selector: 'mango-accounting',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  title = 'Accounting Module';
  loading = true;
  env = environment.name;
  activeLink = '';
  basePage = '/v06/Mango/AccountingModule/AccountingModule.aspx';

  private routeNameMap = {
    '/dashboard': 'Dashboard',
    '/accountingevents': 'Accounting Events'
  }

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.initialNavigation(); // Manually triggering initial navigation for @angular/elements
    this.router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    })
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        this.dispatchBreadCrumbEvent();
      }
    }
  }

  dispatchBreadCrumbEvent() {
    const route = this.router.url;
        this.activeLink = this.routeNameMap[route]
        const event = new CustomEvent('breadcrumb', {
        bubbles: true,
        detail: {
          name: this.activeLink,
          link: this.basePage + route
    }
    })
    document.dispatchEvent(event);
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      const route = this.router.url;
      this.activeLink = this.routeNameMap[route]
      this.dispatchBreadCrumbEvent();
      this.loading = false;
    }
  }

}
