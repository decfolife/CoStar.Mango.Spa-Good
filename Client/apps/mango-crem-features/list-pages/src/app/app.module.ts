import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateFnsModule } from 'ngx-date-fns';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LibUiElementsModule } from '@mango/ui-shared/lib-ui-elements';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
    declarations: [AppComponent],
    /**
     * IMPORTANT: in order to minimize the DevExtreme bundle file, if you add a new DevExtreme module to this library you have to add it too in the file `list-page.dx.config.js` then follow the next steps:
     * - Generate the new DevExtreme file `list-page.dx.js` following the steps in this link: https://js.devexpress.com/Documentation/Guide/Common/Modularity/Create_a_Custom_Bundle/
     * - Copy the generated file to CREM under this path `include\devExtreme_21_1_5\js\list-page.dx.js`
     */
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        DateFnsModule.forRoot(),
        LibUiElementsModule,
        ToastrModule.forRoot({
            timeOut: 6000,
            progressBar: true,
            closeButton: true
        }),
        FontAwesomeModule
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, {
      injector: this.injector,
    });
    customElements.define('ngce-list-page', el);
  }
}
