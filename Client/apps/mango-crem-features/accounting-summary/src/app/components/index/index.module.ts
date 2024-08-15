import { CommonModule, DatePipe } from '@angular/common';

import { NgModule } from '@angular/core';

import { AccountsSummaryComponent } from '@accounting-summary/components/accounts-summary/accounts-summary.component';
import { TitleComponent } from '@accounting-summary/components/title/title.component';
import { AccountingSummaryService } from '@accounting-summary/services/accounting-summary.service';
import { ButtonModule, DatePickerModule, DropdownModule, IconModule, ToggleSliderComponent, InputComponent, AccordionModule } from '@mango/ui-shared/lib-ui-elements';
import { HttpClientModule } from '@angular/common/http';
import { DxDataGridModule, DxDropDownBoxModule, DxTooltipModule, DxPopupModule, DxScrollViewModule, DxSelectBoxModule, DxTemplateModule, DxTabPanelModule } from 'devextreme-angular';
import { IndexRoutingModule } from './index-routing.module';
import { LeaseAlertsModule } from '@micro-components/lease-alerts/lease-alerts.module';
import { IndexComponent } from './index.component';
import { AddEventComponent } from '../add-event/add-event.component';
import { EventsDetailSectionComponent } from '../events-detail-section/events-detail-section.component';
import { AmortizationDetailSectionComponent } from '../amortization-detail-section/amortization-detail-section.component';
import { PaymentsDetailSectionComponent } from '@accounting-summary/components/payments-detail-section/payments-detail-section.component';
import { TransactionPopupComponent } from '../payments-detail-section/transaction-popup/transaction-popup.component';
import { JeProcessingInfoComponent } from '../amortization-detail-section/je-retro-popup/je-processing-info/je-processing-info.component';
import { JePaymentInfoComponent } from '../amortization-detail-section/je-retro-popup/je-payment-info/je-payment-info.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CardModule } from '@mango/ui-shared/lib-ui-elements';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FormattingService } from '@accounting-summary/services/formatting.service';
import { WorkflowDropdownComponent } from '../workflow-dropdown/workflow-dropdown.component';
import { WorkflowHistoryPopupComponent } from '../workflow-history-popup/workflow-history-popup.component';
import { TimelineModule } from 'primeng/timeline';
import { RetrospectiveAdjustmentInfoComponent } from '../amortization-detail-section/je-retro-popup/retrospective-adjustment-info/retrospective-adjustment-info.component';
import { JeRetroPopupComponent } from '../amortization-detail-section/je-retro-popup/je-retro-popup.component';
import { ScheduleDetailsComponent } from '../add-event/schedule-details/schedule-details.component';
import { ClassificationTestsComponent } from '../add-event/classification-tests/classification-tests.component';
import { InputLabelComponent } from 'libs/ui-shared/lib-ui-elements/src/lib/input';
import { ResidualValueComponent } from '../add-event/residual-value/residual-value.component';
import { FinancialCardComponent } from '../add-event/financial-card/financial-card.component';
import { CheckBoxComponent } from 'libs/ui-shared/lib-ui-elements/src/lib/checkbox';

@NgModule({
  declarations: [
    IndexComponent,
    AccountsSummaryComponent,
    TitleComponent,
    AddEventComponent,
    EventsDetailSectionComponent,
    PaymentsDetailSectionComponent,
    TransactionPopupComponent,
    WorkflowDropdownComponent,
    AmortizationDetailSectionComponent,
    JeRetroPopupComponent,
    JeProcessingInfoComponent,
    JePaymentInfoComponent,
    WorkflowHistoryPopupComponent,
    RetrospectiveAdjustmentInfoComponent,
    ScheduleDetailsComponent
  ],

  imports: [
    CommonModule,
    MatExpansionModule,
    CardModule,
    IndexRoutingModule,
    IconModule,
    HttpClientModule,
    DxTooltipModule,
    DxDropDownBoxModule,
    DxDataGridModule,
    DxSelectBoxModule,
    ButtonModule,
    LeaseAlertsModule,
    DropdownModule,
    MatIconModule,
    MatMenuModule,
    DxPopupModule,
    DxScrollViewModule,
    FormsModule,
    DxTabPanelModule,
    DxTemplateModule,
    TimelineModule,
    InputLabelComponent,
    DatePickerModule,
    CheckBoxComponent,
    ReactiveFormsModule,
    InputComponent,
    ToggleSliderComponent,
    ClassificationTestsComponent,
    FinancialCardComponent,
    AccordionModule,
    ResidualValueComponent
  ],

  providers: [AccountingSummaryService, FormattingService, DatePipe],

})
export class IndexModule { }
