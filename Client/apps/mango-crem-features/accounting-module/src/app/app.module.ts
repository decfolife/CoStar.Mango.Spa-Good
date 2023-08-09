import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { SharedLeftNavModule } from 'libs/ui-shared/lib-ui-shared/src/lib/shared-left-nav';
import { DashboardModule } from './components/dashboard/accounting-dashboard.module';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './components/index/index.component';
import { ModuleLeftNavAppComponent } from 'apps/mango-crem-features/micro-components/src/app/module-left-nav/module-left-nav.component';
import { ProjectsDashboardLeftNavService } 
  from 'apps/mango-crem-features/micro-components/src/app/services/projects-dashboard-left-nav.service';
import { AccountingListpageComponent } from './components/listpage/accounting-listpage/accounting-listpage.component';
import { IndexModule } from 'apps/mango-crem-features/list-pages/src/app/components/index.module.hosted'

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ModuleLeftNavAppComponent,
    AccountingListpageComponent,
  ],

  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    SharedLeftNavModule,
    DashboardModule,
    IndexModule
  ],

  providers: [ ProjectsDashboardLeftNavService ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})

export class AppModule {

  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, {
      injector: this.injector,
    });
    customElements.define('ngce-accounting', el);
  }
}

