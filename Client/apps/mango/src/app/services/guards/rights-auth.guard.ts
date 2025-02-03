import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Subscription, of } from 'rxjs';
import { MangoNavigationService } from '../navigation.service';

@Injectable({
  providedIn: 'root',
})
export class RightsAuthGuard implements CanActivate {
  private subscriptions: Subscription[] = [];

  constructor(
    private navigationService: MangoNavigationService,
    private router: Router
  ) {}

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot,
    routerStateSnapshot: RouterStateSnapshot
  ) {
    const urlParts = routerStateSnapshot.url.split('?');
    if (urlParts.length !== 2) {
      return of(true);
    }

    this.subscriptions.push(
      this.navigationService
        .checkUserRights(urlParts[0], urlParts[1])
        .subscribe(
          (userHaveRights) => {
            if (!userHaveRights) {
              this.router.navigate([
                '/crem/projects/error-notification',
                { errorCode: 'Forbidden' },
              ]);
            }

            return of(userHaveRights);
          },
          (err) => {
            console.log(err);
            this.router.navigate(['/crem/projects/error-notification']);
          }
        )
    );
  }
}
