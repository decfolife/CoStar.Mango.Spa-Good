import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';

import { AccountsSummaryComponent } from '@accounting-summary/components/accounts-summary/accounts-summary.component';
import { TitleComponent } from '@accounting-summary/components/title/title.component';
import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { ButtonModule, IconModule } from '@mango/ui-shared/lib-ui-elements';
import { HttpClientModule } from '@angular/common/http';
import { DxDataGridModule, DxDropDownBoxModule, DxTooltipModule } from 'devextreme-angular';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { AddEventComponent } from '../add-event/add-event.component';

@NgModule({
  declarations: [
    IndexComponent,
    AccountsSummaryComponent,
    TitleComponent,
    AddEventComponent
  ],

  imports: [
    CommonModule,
    IndexRoutingModule,
    IconModule,
    HttpClientModule,
    DxTooltipModule,
    DxDropDownBoxModule,
    DxDataGridModule,
    ButtonModule,
  ],

  providers: [AccountingSummaryService],

})
export class IndexModule { }
