import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from '@mango/core-shared';
import {
  Notification,
  NotificationTypesEnum,
} from '@mango/data-models/lib-data-models';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { MangoAppFacade } from './+state/app/app.facade';
import { SettingsService } from '@mango/core-shared/lib-core-shared';
import { environment } from '../environments/environment.local';
import { filter, switchMap, tap } from 'rxjs/operators';
import { PendoService } from '../app/services/pendo.service';
import { CookieService } from 'libs/core-shared/src/lib/services';
import { MatDialog } from '@angular/material/dialog';
import { Idle } from '@ng-idle/core';
import { CurrentProjectIdMonitorService } from './services/current-project-monitor.service';

@Component({
  selector: 'mango-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
  subscriptions: Subscription[] = [];
  loaded$: Observable<boolean>;
  showIdleTimeoutPopup = false;

  constructor(
    public toastr: ToastrService,
    private notificationService: NotificationService,
    private facade: MangoAppFacade,
    public dialog: MatDialog,
    private settingsService: SettingsService,
    private pendoService: PendoService,
    private idle: Idle
  ) {
    this.subs.add(
      this.notificationService
        .getNotification()
        .subscribe((notification) => this.showNotification(notification))
    );

    this.loaded$ = this.facade.loaded$;
  }

  ngOnInit(): void {
    this.facade.init();
    this.facade.loadRedirectorLinks();
    this.setupIdle();
    this.setPendo();
  }

  setupIdle() {
    this.facade.setupIdleTimeout();

    this.idle.onIdleStart.subscribe(() => {
      CookieService.setMangoIdleCookieProperty(true);

      // Only start timer/show popup when both SPA and V06 are idle.
      if (CookieService.isV06Idle()) {
        this.idle.clearInterrupts();
        this.showIdleTimeoutPopup = true;
      } else {
        this.idle.watch(); // reset idle timer
      }
    });

    this.idle.onIdleEnd.subscribe(() => {
      this.showIdleTimeoutPopup = false;
      CookieService.setMangoIdleCookieProperty(false);
    });

    this.idle.onTimeout.subscribe(() => {
      this.showIdleTimeoutPopup = false;
      this.facade.logout(true);
    });
  }

  idlePopupOnClose() {
    this.showIdleTimeoutPopup = false;
  }

  public showNotification(notification: Notification) {
    switch (notification.type) {
      case NotificationTypesEnum.Success:
        this.toastr.success(notification.message, notification.title, {
          enableHtml: true,
        });
        break;

      case NotificationTypesEnum.Error:
        this.toastr.error(notification.message, notification.title, {
          enableHtml: true,
          timeOut: 15000,
        });
        break;

      case NotificationTypesEnum.Warning:
        this.toastr.warning(notification.message, notification.title, {
          enableHtml: true,
        });
        break;

      case NotificationTypesEnum.Info:
        this.toastr.info(notification.message, notification.title, {
          enableHtml: true,
        });
        break;

      default:
        this.toastr.info(notification.message, notification.title, {
          enableHtml: true,
        });
        break;
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  setPendo() {
    this.subscriptions.push(
      combineLatest([
        this.facade.clientKey$,
        this.facade.contactRecord$,
        this.facade.adminFlags$,
      ])
        .pipe(
          filter(
            ([clientkey, contactRecord, adminFlags]) =>
              !!clientkey && !!contactRecord && !!adminFlags
          ),
          switchMap(([clientkey, contactRecord, adminFlags]) =>
            combineLatest([
              of(clientkey),
              of(contactRecord),
              of(adminFlags),
              this.settingsService.getClientPendoSettings(
                clientkey,
                contactRecord.contactID
              ),
            ])
          ),
          tap(([clientkey, contactRecord, adminFlags, response]) => {
            this.pendoService.initialize(
              {
                id: contactRecord.email,
                full_name:
                  contactRecord.firstName + ' ' + contactRecord.lastName,
                user_id: contactRecord.userName,
                email: contactRecord.email,
                start_page: response.contactStartPage,
                contact_dates_eu_format:
                  contactRecord.preferences?.contactDatesEU.toString(),
                role: contactRecord.userRoleName,
                INTERNAL_USER: contactRecord.userRole == 0 ? '1' : '0',
                contactDepartment: response.contactDepartment,
              },
              {
                id: clientkey + '_' + environment.name,
                environment: environment.name,
                financialReportingEnabled:
                  response.financialReportingEnabled.toString(),
                financialReportingDeadline:
                  response.financialReportingDeadline.toString(),
                billingDba: response.billingDBA,
                includeCostarBillingCounts:
                  response.includeCostarBillingCounts.toString(),
                isRedirectorActive: adminFlags.isRedirectorActive.toString(),
                useNRTDatasets: adminFlags.useNRTDataSets.toString(),
                useSegmentsFeature: adminFlags.useSegmentsFeature.toString(),
                name: clientkey + '_' + environment.name,
                betaProgramParticipant: response.betaProgramParticipant,
                databaseServer: adminFlags.databaseServer,
                lastCurrencyUpdate: adminFlags.lastCurrencyUpdate,
                useBatchReporting: adminFlags.useBatchReporting.toString(),
                useAutoLoadReminders:
                  adminFlags.useAutoLoadReminders.toString(),
                useCentralAuthentication:
                  adminFlags.useCentralAuthentication.toString(),
                isEnlist: adminFlags.isEnlist.toString(),
                isCachedClient: adminFlags.isCachedClient.toString(),
              }
            );
          })
        )
        .subscribe()
    );
  }
}
