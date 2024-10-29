import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { ScreenLoaderModule } from '@mango/ui-shared/lib-ui-elements';
import { ExportDevexDatagridService } from '@mango/core-shared';
import {
  DevExtremeModule,
  DxChartModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxDropDownButtonModule,
  DxFormModule,
  DxListModule,
  DxNumberBoxModule,
  DxPivotGridModule,
  DxPopupModule,
  DxScrollViewModule,
  DxSelectBoxModule,
  DxTabsModule,
  DxTextAreaModule,
  DxTreeViewModule,
} from 'devextreme-angular';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BatchEventListComponent } from '../batch-event-list/batch-event-list.component';
import { ParametersCardComponent } from '../batch-event-list/parameters-card/parameters-card.component';
import { ParametersGridComponent } from '../batch-event-list/parameters-grid/parameters-grid.component';
import { BatchLogsComponent } from '../batch-logs/batch-logs.component';
import { ROUTES } from './index.routes';

@NgModule({
  declarations: [
    BatchEventListComponent,
    BatchLogsComponent,
    ParametersCardComponent,
    ParametersGridComponent,
  ],

  imports: [
    CommonModule,
    DevExtremeModule,
    DxChartModule,
    DxDataGridModule,
    DxDateBoxModule,
    DxDropDownButtonModule,
    DxFormModule,
    DxListModule,
    DxNumberBoxModule,
    DxPivotGridModule,
    DxPopupModule,
    DxScrollViewModule,
    DxSelectBoxModule,
    DxTabsModule,
    DxTextAreaModule,
    DxTreeViewModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatTabsModule,
    ScreenLoaderModule,
    RouterModule.forChild(ROUTES),
  ],
  providers: [ExportDevexDatagridService],
})
export class IndexModule {}
