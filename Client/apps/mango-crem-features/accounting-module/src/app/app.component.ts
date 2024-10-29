/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable rxjs-angular/prefer-composition */

import {
  Component,
  SecurityContext,
  ElementRef,
  Injectable,
} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ProjectsDashboardLeftNavService } from 'apps/mango-crem-features/micro-components/src/app/services/projects-dashboard-left-nav.service';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Component({
  selector: 'mango-accounting-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Accounting Service';
  api;
  page;
  route;

  constructor(private sanitizer: DomSanitizer, private elementRef: ElementRef) {
    this.page = this.sanitizer.sanitize(
      SecurityContext.HTML,
      this.elementRef.nativeElement.getAttribute('page')
    );
    this.api = this.sanitizer.sanitize(
      SecurityContext.HTML,
      this.elementRef.nativeElement.getAttribute('api')
    );
    this.elementRef.nativeElement.removeAttribute('page');
    this.elementRef.nativeElement.removeAttribute('api');
  }

  onOutletLoaded(webComponent: any) {
    // console.log("AppComponent Router Outlet Activated");
    // console.log("WebComponent Loaded:", webComponent);
  }
}

@Injectable()
export class CanActivateGuard {
  constructor(
    private router: Router,
    private leftNavService: ProjectsDashboardLeftNavService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const routes = this.router.config;
    return this.leftNavService.getModuleNavigationLinksClient(9).pipe(
      map((res) => {
        for (const link of res.data) {
          if (
            link.isActive === false &&
            (link.name === 'Dashboard' || link.name === 'Accounting Events')
          ) {
            if (
              route.routeConfig.path ===
              link.name.toLowerCase().replace(' ', '')
            ) {
              if (link.name === 'Dashboard') {
                const i = this.router.config.findIndex((x) => x.path === '**');
                routes[i].redirectTo = '/accountingevents';
                this.router.resetConfig(routes);
                this.router.navigate(['/accountingevents']);
                return false;
              } else {
                this.router.navigate(['/']);
                return false;
              }
            }
          }
        }
        return true;
      }),
      catchError(() => {
        this.router.navigate(['/accountingevents']);
        return of(false);
      })
    );
  }
}
