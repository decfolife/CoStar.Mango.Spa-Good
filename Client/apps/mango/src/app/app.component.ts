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
import {
  CookieService,
  UtilitiesService,
} from 'libs/core-shared/src/lib/services';
import { MatDialog } from '@angular/material/dialog';
import { Idle } from '@ng-idle/core';
import { CurrentProjectIdMonitorService } from './services/current-project-monitor.service';
import { convertBoolToString } from 'libs/core-shared/src/lib/utilities/utils';
import LogRocket from 'logrocket';

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
    private currentProjectIdMonitorService: CurrentProjectIdMonitorService, //*** we need this, please do not remove this line */
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
    this.setupLogRocket();
    this.facade.init();
    this.facade.loadRedirectorMappings();
    this.facade.loadRedirectorLinks();
    this.setupIdle();
    this.setupPendo();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
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

  setupPendo() {
    if (UtilitiesService.isLocalEnvironment()) return;

    this.subscriptions.push(
      combineLatest([
        this.facade.clientKey$,
        this.facade.contactRecord$,
        this.facade.adminFlags$,
        this.facade.authenticatedUser$,
      ])
        .pipe(
          filter(
            ([clientkey, contactRecord, adminFlags, authenticatedUser]) =>
              !!clientkey &&
              !!contactRecord &&
              !!adminFlags &&
              !!authenticatedUser
          ),
          switchMap(
            ([clientkey, contactRecord, adminFlags, authenticatedUser]) =>
              combineLatest([
                of(clientkey),
                of(contactRecord),
                of(adminFlags),
                of(authenticatedUser),
                this.settingsService.getClientPendoSettings(),
              ])
          ),
          tap(
            ([
              clientkey,
              contactRecord,
              adminFlags,
              authenticatedUser,
              response,
            ]) => {
              this.pendoService.initialize(
                {
                  id: authenticatedUser.isRemUser
                    ? contactRecord.email.toLocaleLowerCase()
                    : `${authenticatedUser.clientKey.toLocaleUpperCase()}_${
                        authenticatedUser.contactId
                      }_${environment.name.toLocaleUpperCase()}`,
                  full_name:
                    contactRecord.firstName + ' ' + contactRecord.lastName,
                  user_id: contactRecord.userName,
                  email: contactRecord.email.toLocaleLowerCase(),
                  start_page: response.contactStartPage,
                  contact_dates_eu_format:
                    contactRecord.preferences?.contactDatesEU.toString(),
                  role: contactRecord.userRoleName.split(/(?=[A-Z])/).join(' '),
                  isRemUser: authenticatedUser.isRemUser,
                  contactDepartment: response.contactDepartment,
                  signup_date: contactRecord.dateCreated,
                  centralAuthSecurityLevel: (() => {
                    if (authenticatedUser.securityLevel === 0)
                      return 'CoStar Employee L0';
                    if (authenticatedUser.securityLevel === 1)
                      return 'CoStar Employee L1';
                    if (authenticatedUser.securityLevel === 2)
                      return 'CoStar Employee L2';
                    if (authenticatedUser.securityLevel === 3)
                      return 'CoStar Employee L3';
                    return 'Customer';
                  })(),
                  isRequiredSsoUser: contactRecord.requireSSO,
                  centralAuthUserId: authenticatedUser.userId,
                  isAutoProvisioned: authenticatedUser.isAutoProvisioned,
                  hasMultipleSites: authenticatedUser.hasMultipleSites,
                  isServiceAccount: authenticatedUser.isServiceAccount,
                },
                {
                  id:
                    clientkey.toLocaleUpperCase() +
                    '_' +
                    environment.name.toLocaleUpperCase(),
                  environment: environment.name,
                  financialReportingEnabled: convertBoolToString(
                    response.financialReportingEnabled
                  ),
                  financialReportingDeadline:
                    response.financialReportingDeadline.toString(),
                  billingDba: response.billingDBA,
                  includeCostarBillingCounts: convertBoolToString(
                    response.includeCostarBillingCounts
                  ),
                  isRedirectorActive: convertBoolToString(
                    adminFlags.isRedirectorActive
                  ),
                  useNRTDatasets: convertBoolToString(
                    adminFlags.useNRTDataSets
                  ),
                  useSegmentsFeature: convertBoolToString(
                    adminFlags.useSegmentsFeature
                  ),
                  name:
                    environment.name.toLocaleUpperCase() === 'PROD'
                      ? clientkey.toLocaleUpperCase()
                      : clientkey.toLocaleUpperCase() +
                        '_' +
                        environment.name.toLocaleUpperCase(),
                  betaProgramParticipant:
                    response.betaProgramParticipant === 'true',
                  databaseServer: adminFlags.databaseServer,
                  lastCurrencyUpdate: adminFlags.lastCurrencyUpdate,
                  useBatchReporting: convertBoolToString(
                    adminFlags.useBatchReporting
                  ),
                  useAutoLoadReminders: convertBoolToString(
                    adminFlags.useAutoLoadReminders
                  ),
                  useCentralAuthentication: convertBoolToString(
                    adminFlags.useCentralAuthentication
                  ),
                  isEnlist: convertBoolToString(adminFlags.isEnlist),
                  isCachedClient: convertBoolToString(
                    adminFlags.isCachedClient
                  ),
                }
              );
            }
          )
        )
        .subscribe()
    );
  }

  setupLogRocket() {
    if (!UtilitiesService.isUpperEnvironments()) return;

    LogRocket.init(environment.logRocketAppId);

    this.subscriptions.push(
      combineLatest([
        this.facade.authenticatedUser$,
        this.facade.contactRecord$,
      ])
        .pipe(
          filter(
            ([authenticatedUser, contactRecord]) =>
              !!authenticatedUser && !!contactRecord
          ),
          tap(([authenticatedUser, contactRecord]) => {
            LogRocket.identify(contactRecord.contactID.toString(), {
              name: `${contactRecord.firstName} ${contactRecord.lastName}`,
              email: authenticatedUser.email,
              clientSite: authenticatedUser.clientKey,
            });
          })
        )
        .subscribe()
    );
  }
}
