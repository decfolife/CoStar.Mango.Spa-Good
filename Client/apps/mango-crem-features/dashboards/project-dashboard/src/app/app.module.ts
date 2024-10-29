import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LibUiElementsModule } from '@mango/ui-shared/lib-ui-elements';
import { FormWizardService } from '@micro-components/services/form-wizard.service';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { RecentActivitiesComponent } from './components/recent-activities/recent-activities.component';
import { RecentActivitiesModule } from './components/recent-activities/recent-activities.module';
import { DashboardService } from './services/dashboard.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LibUiElementsModule,
    RecentActivitiesModule,
    ToastrModule.forRoot({
      timeOut: 6000,
      progressBar: true,
      closeButton: true,
    }),
  ],
  providers: [DashboardService, FormWizardService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, {
      injector: this.injector,
    });
    customElements.define('ngce-project-dashboard', el);

    customElements.get('ngce-recent-activities') ||
      customElements.define(
        'ngce-recent-activities',
        createCustomElement(RecentActivitiesComponent, {
          injector: this.injector,
        })
      );
  }
}
