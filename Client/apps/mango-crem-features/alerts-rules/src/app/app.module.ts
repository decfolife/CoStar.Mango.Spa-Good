import { Injector, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import {
  DevExtremeModule,
  DxDataGridModule,
  DxFormModule,
  DxPopupModule
} from 'devextreme-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { AlertsRulesComponent } from './alerts-rules/alerts-rules.component';
import { AlertsRulesGridComponent } from './alerts-rules-grid/alerts-rules-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertsRulesComponent,
    AlertsRulesGridComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    DevExtremeModule,
    DxDataGridModule,
    DxFormModule,
    DxPopupModule,
    FontAwesomeModule,
    HttpClientModule,
    MatMenuModule,
    MatSlideToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, { injector: this.injector });

    customElements.define('mango-alerts-rules-root', el);
  }
}
