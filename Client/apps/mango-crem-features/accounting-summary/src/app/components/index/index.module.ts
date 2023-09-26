import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { NgModule } from '@angular/core';

import { AccountsSummaryComponent } from '@accounting-summary/components/accounts-summary/accounts-summary.component';
import { TitleComponent } from '@accounting-summary/components/title/title.component';
import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { IconModule } from '@mango/ui-shared/lib-ui-elements';
import { HttpClientModule } from '@angular/common/http';
import { DxDataGridComponent, DxDataGridModule, DxDropDownBoxModule, DxTooltipModule } from 'devextreme-angular';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';

@NgModule({
  declarations: [
    IndexComponent,
    AccountsSummaryComponent,
    TitleComponent
  ],

  imports: [
    CommonModule,
    IndexRoutingModule,
    IconModule, 
    HttpClientModule,
    DxTooltipModule,
    DxDropDownBoxModule,
    DxDataGridModule
  ],

  providers: [AccountingSummaryService],
  
})
export class IndexModule { }
