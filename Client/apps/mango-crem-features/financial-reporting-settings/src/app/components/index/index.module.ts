import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { DxButtonModule, DxPopupModule, DxSelectBoxModule, DxTextBoxModule, DxLoadPanelModule, DxTextAreaModule } from 'devextreme-angular';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { LibUiElementsModule } from 'libs/ui-shared/lib-ui-elements/src/lib/lib-ui-elements.module';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';

import { FinancialReportingSettingsService } from '../../services/financial-reporting-settings.service';

import { EnableFinancialReportingCardComponent } from '../enable-financial-reporting-card/enable-financial-reporting-card.component';
import { FieldAssignmentsCardComponent } from '../field-assignments-card/field-assignments-card.component';
import { IntervalsCardComponent } from '../intervals-card/intervals-card.component';
import { SettingsPageComponent } from '../settings-page/settings-page.component';

@NgModule({
  declarations: [
    EnableFinancialReportingCardComponent,
    FieldAssignmentsCardComponent,
    IndexComponent,
    IntervalsCardComponent,
    SettingsPageComponent,
  ],
  imports: [
    CommonModule,
    DxButtonModule,
    DxPopupModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxLoadPanelModule,
    FormsModule,
    HttpClientModule,
    IndexRoutingModule,
    LibUiElementsModule,
    MatCardModule,
    MatSlideToggleModule,
    NgxSkeletonLoaderModule,
    DxTextAreaModule,

  ],
  providers: [FinancialReportingSettingsService, DatePipe],
})
export class IndexModule { }
