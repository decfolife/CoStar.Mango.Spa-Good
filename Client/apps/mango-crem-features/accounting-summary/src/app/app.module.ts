import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import {
  NgModule,
  Injector,
  CUSTOM_ELEMENTS_SCHEMA,
  DoBootstrap,
} from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountingSummaryService } from './services/accounting-summary.service';
import { createCustomElement } from '@angular/elements';
import { BalanceCardsComponent } from './components/add-event/financial-card/balance-cards/balance-cards.component';
import { StorageService } from '@mango/core-shared';
import { DeleteHistoricScheduleComponent } from './components/accounts-summary/delete-historic-schedule/delete-historic-schedule.component';

@NgModule({
  declarations: [
    AppComponent,
    BalanceCardsComponent,
    DeleteHistoricScheduleComponent,
  ],

  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
  ],

  providers: [AccountingSummaryService, StorageService],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(AppComponent, { injector: this.injector });

    customElements.define('ngce-accounting-summary', el);
  }
}
