import { CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, getPlatform, Injector, NgModule } from '@angular/core';
import { BrowserModule, platformBrowser } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { EnvInfoChipModule, SharedLeftNavModule } from '@mango/ui-shared/lib-ui-shared';
import { BookmarksModule, DashboardsLeftNavModule, SimpleGridModule } from '@mango/ui-shared/lib-ui-elements';
import { CremEnvInfoChipAppComponent } from './crem-env-info-chip/crem-env-info-chip.component';
import { CremEnvChipService } from './crem-env-info-chip/crem-env-info-chip.service';
import { BookmarksAppComponent } from './bookmarks/bookmarks.component';
import { BookmarksService } from 'apps/mango-crem-features/micro-components/src/app/services/bookmarks.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ProjectsDashboardLeftNavService } from './services/projects-dashboard-left-nav.service';
import { ModuleLeftNavAppComponent } from './module-left-nav/module-left-nav.component';
import { MicroComponentsAppComponent } from './app.component';
import { AlertChipModule } from './alert-chip/alert-chip.module';
import { AlertChipComponent } from './alert-chip/alert-chip.component';
import { EmulateUserAppComponent } from './emulate-user/emulate-user.component';
import { EmulateUserService } from './services/emulate-user.service';
import { LeaseAlertsComponent } from './lease-alerts/lease-alerts.component';
import { LeaseAlertsModule } from './lease-alerts/lease-alerts.module';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { EmulateUserAppModule } from './emulate-user/emulate-user.module';
import { FormWizardAppModule } from './form-wizard/form-wizard.module';
import { AddFormWizardModule } from './form-wizard/modal/add-form-wizard/add-form-wizard.module';
import { OpenFormWizardModalComponent } from './form-wizard/modal/add-form-wizard/open-form-wizard-modal.component';
import { ObjectActionsComponent } from './object-actions/object-actions/object-actions.component';
import { ObjectActionsModule } from './object-actions/object-actions/object-actions.module';
import { WidgetHistoryModule } from './widget-history/widget-history.module';
import { OpenWidgetHistoryModalComponent } from './widget-history/open-widget-history-modal.component';

@NgModule({
    declarations: [
        MicroComponentsAppComponent,
        BookmarksAppComponent,
        CremEnvInfoChipAppComponent,
        ModuleLeftNavAppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        BookmarksModule,
        EnvInfoChipModule,
        DashboardsLeftNavModule,
        SharedLeftNavModule,
        AlertChipModule,
        LeaseAlertsModule,
        EmulateUserAppModule,
        FormWizardAppModule,
        AddFormWizardModule,
        ObjectActionsModule,
        WidgetHistoryModule,
        RouterModule.forRoot([])
    ],
    exports: [LeaseAlertsModule],
    providers: [BookmarksService, CremEnvChipService, ProjectsDashboardLeftNavService, EmulateUserService, { provide: APP_BASE_HREF, useValue: '/' }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: []
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) { }

  public ngDoBootstrap(): void {
    customElements.get('ngce-crem-env-info-chip') || customElements.define('ngce-crem-env-info-chip',
      createCustomElement(CremEnvInfoChipAppComponent, { injector: this.injector }));

    customElements.get('ngce-module-left-nav') || customElements.define('ngce-module-left-nav',
      createCustomElement(ModuleLeftNavAppComponent, { injector: this.injector }));

    customElements.get('ngce-bookmarks') || customElements.define('ngce-bookmarks',
      createCustomElement(BookmarksAppComponent, { injector: this.injector }));

    customElements.get('ngce-alert-chip') || customElements
      .define('ngce-alert-chip', createCustomElement(AlertChipComponent, { injector: this.injector }));

    customElements.get('ngce-emulate-user') || customElements
      .define('ngce-emulate-user', createCustomElement(EmulateUserAppComponent, { injector: this.injector }));

    customElements.get('ngce-lease-alerts-popup') || customElements
      .define('ngce-lease-alerts-popup', createCustomElement(LeaseAlertsComponent, { injector: this.injector }));

    customElements.get('ngce-add-form-wizard') || customElements
      .define('ngce-add-form-wizard', createCustomElement(OpenFormWizardModalComponent, { injector: this.injector }));

    customElements.get('ngce-object-actions-popup') || customElements
      .define('ngce-object-actions-popup', createCustomElement(ObjectActionsComponent, { injector: this.injector }));

    customElements.get('ngce-widget-history-popup') || customElements
      .define('ngce-widget-history-popup', createCustomElement(OpenWidgetHistoryModalComponent, { injector: this.injector }));
  }
}
// If there is already a platform, reuse it, otherwise create a new one
(getPlatform() || platformBrowser()).bootstrapModule(AppModule).catch(err => console.log(err));
