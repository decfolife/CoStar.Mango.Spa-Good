import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardWrapperComponent } from './dashboard-wrapper.component';
import { DashboardModule } from '../accounting-dashboard.module';
import {
  ButtonModule,
  CardModule,
  DropdownModule,
  IconModule,
  SkeletonModule,
} from '@mango/ui-shared/lib-ui-elements';

import { MangoDisclosureViewComponent } from '../views/disclosure-dashboard-view/disclosure-dashboard-view.component';

import { Asc842AnnualDisclosuresComponent } from '../views/asc-842-annual-disclosures/asc-842-annual-disclosures.component';
import { Asc842QuarterlyDisclosuresComponent } from '../views/asc-842-quarterly-disclosures/asc-842-quarterly-disclosures.component';
import { WorkflowAndAlertsComponent } from '../views/workflow-and-alerts/workflow-and-alerts.component';
import { InAppDisclosureService } from '@accounting-dashboard/services/in-app-disclosure.service';
import { CremPivotTableModule } from 'libs/ui-shared/lib-ui-elements/src/lib/crem-pivot-table/crem-pivot-table.module';
import { DxPivotGridModule } from 'devextreme-angular/ui/pivot-grid';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LoaderModule } from '@mango/ui-shared/lib-ui-elements';
import { IADCardComponent } from '../card/IADCard/iad-card.component';

@NgModule({
  declarations: [
    DashboardWrapperComponent,
    MangoDisclosureViewComponent,
    Asc842AnnualDisclosuresComponent,
    Asc842QuarterlyDisclosuresComponent,
    WorkflowAndAlertsComponent,
    IADCardComponent,
  ],
  imports: [
    CommonModule,
    DashboardModule,
    DropdownModule,
    DxPivotGridModule,
    ButtonModule,
    CardModule,
    DragDropModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LoaderModule,
    IconModule,
    CremPivotTableModule,
    SkeletonModule,
  ],
  providers: [InAppDisclosureService],
  exports: [DashboardWrapperComponent],
})
export class DashboardWrapperModule {}
