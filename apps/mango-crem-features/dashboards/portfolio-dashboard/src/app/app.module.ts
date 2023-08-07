import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LibUiElementsModule } from '@mango/ui-shared/lib-ui-elements';
import { ProjectsDashboardLeftNavService } from 'apps/mango-crem-features/micro-components/src/app/services/projects-dashboard-left-nav.service';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        LibUiElementsModule,
        ToastrModule.forRoot({
            timeOut: 6000,
            progressBar: true,
            closeButton: true
        })
    ],
    providers: [ProjectsDashboardLeftNavService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, {
      injector: this.injector,
    });
    customElements.define('ngce-portfolio-dashboard', el);
  }
}
