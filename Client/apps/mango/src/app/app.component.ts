import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '@mango/core-shared';
import { Notification, NotificationTypesEnum } from '@mango/data-models/lib-data-models';
import { ProjectsDashboardLeftNavService } from '@micro-components/services/projects-dashboard-left-nav.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { MangoAppFacade } from './+state/app/app.facade';
import { SettingsService } from '@mango/core-shared/lib-core-shared';
import { environment } from '../environments/environment.local';
import { filter, switchMap, tap } from 'rxjs/operators';
import { CookieService } from 'libs/core-shared/src/lib/services';
import { MatDialog } from '@angular/material/dialog';
import { Idle } from '@ng-idle/core';

@Component({
  selector: 'mango-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
  navigationLinks: any = [];
  public navLinksFetched = false;
  loaded$: Observable<boolean>;
  showIdleTimeoutPopup = false;

  constructor(
    public toastr: ToastrService,
    private notificationService: NotificationService,
    private leftNavService: ProjectsDashboardLeftNavService,
    private facade: MangoAppFacade,
    public dialog: MatDialog,
    private settingsService: SettingsService,
    private idle: Idle
  ) {
    this.subs.add(this.notificationService
      .getNotification()
      .subscribe(notification => this.showNotification(notification)))

    this.loaded$ = this.facade.loaded$;
  }

  ngOnInit(): void {
    this.facade.init()
    this.facade.loadRedirectorLinks()
    this.setupIdle()

    const modId = 1; // hard coded until we start getting logged in with actual data for the user
    this.getModuleNavLinksNew(modId);
  }

  setupIdle() {
    this.facade.setupIdleTimeout()

    this.idle.onIdleStart.subscribe(() => {
      CookieService.setMangoIdleCookieProperty(true)

      // Only start timer/show popup when both SPA and V06 are idle.
      if (CookieService.isV06Idle()) {
        this.idle.clearInterrupts()
        this.showIdleTimeoutPopup = true
      } else {
        this.idle.watch() // reset idle timer
      }
    });

    this.idle.onIdleEnd.subscribe(() => {
      this.showIdleTimeoutPopup = false
      CookieService.setMangoIdleCookieProperty(false)
    });

    this.idle.onTimeout.subscribe(() => {
      this.showIdleTimeoutPopup = false
      this.facade.logout(true)
    });
  }

  idlePopupOnClose() {
    this.showIdleTimeoutPopup = false
  }

  getModuleNavLinksNew(moduleId: number) {
    this.subs.add(this.leftNavService.getModuleNavigationLinks(moduleId).subscribe(
      (res: any) => {
        this.navigationLinks = res.data;
        this.navLinksFetched = true;
      },
      (error: any) => {
        this.navLinksFetched = true;
      }
    ));
  }

  public showNotification(notification: Notification) {
    switch (notification.type) {
      case NotificationTypesEnum.Success:
        this.toastr.success(notification.message, notification.title, { enableHtml: true });
        break;

      case NotificationTypesEnum.Error:
        this.toastr.error(notification.message, notification.title, { enableHtml: true, timeOut: 15000 });
        break;

      case NotificationTypesEnum.Warning:
        this.toastr.warning(notification.message, notification.title, { enableHtml: true });
        break;

      case NotificationTypesEnum.Info:
        this.toastr.info(notification.message, notification.title, { enableHtml: true });
        break;

      default:
        this.toastr.info(notification.message, notification.title, { enableHtml: true });
        break;
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }
}
