import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LibUiElementsModule } from '@mango/ui-shared/lib-ui-elements';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ConfigurationService } from './services/configuration.service';





@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        LibUiElementsModule
    ],
    providers: [
        ConfigurationService,
        {
            provide: 'BASE_URL',
            useFactory: ConfigurationService.baseUrl,
        },
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, {
      injector: this.injector,
    });
    customElements.define('ngce-accountingprofiles', el);
  }
}
