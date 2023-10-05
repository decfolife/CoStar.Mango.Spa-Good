import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AccountingSummaryService } from './services/accounting-summary.service';

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
export class AppModule { }
