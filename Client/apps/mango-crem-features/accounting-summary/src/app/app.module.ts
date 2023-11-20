import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA, DoBootstrap } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountingSummaryService } from './services/accounting-summary.service';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [AppComponent],

  imports: [
    BrowserAnimationsModule, 
    BrowserModule,
    AppRoutingModule,
  ],

  providers: [AccountingSummaryService],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule implements DoBootstrap{
  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, { injector: this.injector });

    customElements.define('ngce-accounting-summary', el);
  }
}
