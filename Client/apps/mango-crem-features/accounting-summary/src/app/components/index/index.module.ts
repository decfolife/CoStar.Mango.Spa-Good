import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';

import { AccountsSummaryComponent } from '@accounting-summary/components/accounts-summary/accounts-summary.component';
import { TitleComponent } from '@accounting-summary/components/title/title.component';
import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { ButtonModule, DropdownModule, IconModule } from '@mango/ui-shared/lib-ui-elements';
import { HttpClientModule } from '@angular/common/http';
import { DxDataGridModule, DxDropDownBoxModule, DxTooltipModule, DxPopupModule, DxScrollViewModule} from 'devextreme-angular';
import { IndexRoutingModule } from './index-routing.module';
import { LeaseAlertsModule } from '@micro-components/lease-alerts/lease-alerts.module';
import { IndexComponent } from './index.component';
import { AddEventComponent } from '../add-event/add-event.component';
import { EventsDetailSectionComponent } from '../events-detail-section/events-detail-section.component';
import { AmortizationDetailSectionComponent } from '../amortization-detail-section/amortization-detail-section.component';
import { PaymentsDetailSectionComponent } from '@accounting-summary/components/payments-detail-section/payments-detail-section.component';
import { TransactionPopupComponent } from '../payments-detail-section/transaction-popup/transaction-popup.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormattingService } from '@accounting-summary/services/formatting.service';
@NgModule({
  declarations: [
    IndexComponent,
    AccountsSummaryComponent,
    TitleComponent,
    AddEventComponent,
    EventsDetailSectionComponent,
    PaymentsDetailSectionComponent,
    TransactionPopupComponent,
    AmortizationDetailSectionComponent
  ],

  imports: [
    CommonModule,
    MatExpansionModule ,
    IndexRoutingModule,
    IconModule,
    HttpClientModule,
    DxTooltipModule,
    DxDropDownBoxModule,
    DxDataGridModule,
    ButtonModule,
    LeaseAlertsModule,
    DropdownModule,
    MatIconModule,
    MatMenuModule,
    DxPopupModule,
    DxScrollViewModule,
    ],

  providers: [AccountingSummaryService, FormattingService],

})
export class IndexModule { }
