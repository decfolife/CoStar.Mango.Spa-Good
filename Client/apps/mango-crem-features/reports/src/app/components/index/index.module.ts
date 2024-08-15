import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { ButtonModule, DropdownModule, DynamicFormModule, IconModule, InputComponent, ModalModule } from '@mango/ui-shared/lib-ui-elements';
import { DxLoadPanelModule } from 'devextreme-angular';
import { VerticalStepperModule } from 'libs/ui-shared/lib-ui-elements/src/lib/vertical-stepper/vertical-stepper.module';
import { ReportsService } from '../../services/reports.service';
import { SharedModule } from '../../shared/shared.module';
import { CriteriaFormReportComponent } from '../criteria-form-report/criteria-form-report.component';
import { CriteriaFormSegmentComponent } from '../criteria-form-segment/criteria-form-segment.component';
import { CreateSegmentComponent } from '../modal/create-segment/create-segment.component';
import { CriteriaReportComponent } from '../modal/criteria-report/criteria-report.component';
import { DeleteReportComponent } from '../modal/delete-report/delete-report.component';
import { ReportsHomeModule } from '../reports-home/reports-home.module';
import { ReportsSegmentModule } from '../reports-segment/reports-segment.module';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';

@NgModule({
  declarations: [
    IndexComponent,
    DeleteReportComponent,
    CriteriaReportComponent,
    CreateSegmentComponent,
    CriteriaFormSegmentComponent,
    CriteriaFormReportComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    SharedModule.forRoot(),
    SearchModule,
    DxLoadPanelModule,
    DropdownModule,
    ReportsHomeModule,
    ReportsSegmentModule,
    MatDialogModule,
    ButtonModule,
    ModalModule,
    IconModule,
    VerticalStepperModule,
    DynamicFormModule,
    InputComponent
  ],
  providers: [
    ReportsService
  ],
})
export class IndexModule {}