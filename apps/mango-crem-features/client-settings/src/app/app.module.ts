import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CentralAuthErrorHandler } from '../../../central-auth/src/app/services/error-handler.service';
import { CentralAuthHttpInterceptor } from '../../../central-auth/src/app/services/http.interceptor';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
    declarations: [AppComponent],
    /**
     * IMPORTANT: in order to minimize the DevExtreme bundle file, if you add a new DevExtreme module to this library you have to add it too in the file `client-settings.dx.config.js` then follow the next steps:
     * - Generate the new DevExtreme file `client-settings.dx.js` following the steps in this link: https://js.devexpress.com/Documentation/Guide/Common/Modularity/Create_a_Custom_Bundle/
     * - Copy the generated file to CREM under this path `include\devExtreme_21_1_5\js\client-settings.dx.js`
     */
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        AppRoutingModule,
        HttpClientModule,
        CentralAuthErrorHandler.forRoot(),
        CentralAuthHttpInterceptor.forRoot(),
        ToastrModule.forRoot({
            timeOut: 6000,
            progressBar: true,
            closeButton: true
        })
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, {
      injector: this.injector,
    });
    customElements.define('ngce-client-settings', el);
  }
}
