import { Component, OnDestroy, OnInit } from '@angular/core';
import { DBkeys, NotificationService, StorageService, UserService } from '@mango/core-shared';
import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { NotificationTypesEnum } from '@mango/data-models/lib-data-models';
import { Notification } from '@mango/data-models/lib-data-models';
import { ProjectsDashboardLeftNavService } from '@micro-components/services/projects-dashboard-left-nav.service';
import { MangoAppFacade } from './+state/app/app.facade';

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

  constructor(
    public toastr: ToastrService,
    private notificationService: NotificationService,
    private leftNavService: ProjectsDashboardLeftNavService,
    private storageService: StorageService,
    private facade: MangoAppFacade,
  ) {

    this.subs.add(this.notificationService
      .getNotification()
      .subscribe(notification => this.showNotification(notification)))
    this.loaded$ = this.facade.loaded$;
    const authenticatedUser = this.storageService.getData(DBkeys.USER_AUTH)
    const contactRecord = this.storageService.getData(DBkeys.CONTACT_RECORD)
    const clientKey = this.storageService.getData(DBkeys.CLIENT_KEY)
    if (authenticatedUser && contactRecord && clientKey) {
      this.facade.setAuthenticatedUser(authenticatedUser),
      this.facade.setContactRecord(contactRecord)
      this.facade.setClientKey(clientKey)
    }
  }

  ngOnInit(): void { 
    this.facade.localAuth()
    const modId = 1; // hard coded until we start getting logged in with actual data for the user
    this.getModuleNavLinksNew(modId);
  }

  getModuleNavLinksNew(moduleId: number) {
    this.subs.add(this.leftNavService.getModuleNavigationLinks(moduleId).subscribe(
      (res: any) => {
        //if (res.succeeded) {
        this.navigationLinks = res.data;
        this.navLinksFetched = true;
        //}
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
