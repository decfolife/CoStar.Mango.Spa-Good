import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { ButtonModule, DropdownModule, DynamicFormModule, IconModule, LoaderModule, ModalModule } from '@mango/ui-shared/lib-ui-elements';
import { DxLoadPanelModule } from 'devextreme-angular';
import { SharedModule } from '../../shared/shared.module';
import { ReportsHomeModule } from '../reports-home/reports-home.module';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { ReportsService } from '../../services/reports.service';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteReportComponent } from '../modal/delete-report/delete-report.component';
import { CriteriaReportComponent } from '../modal/criteria-report/criteria-report.component';
import { ReportsSegmentModule } from '../reports-segment/reports-segment.module';
import { CreateSegmentComponent } from '../modal/create-segment/create-segment.component';
import { TextBoxModule } from 'libs/ui-shared/lib-ui-elements/src/lib/text-box/text-box.module';
import { CriteriaFormComponent } from '../criteria-form/criteria-form.component';
import { VerticalStepperModule } from 'libs/ui-shared/lib-ui-elements/src/lib/vertical-stepper/vertical-stepper.module';


@NgModule({
  declarations: [IndexComponent, DeleteReportComponent, CriteriaReportComponent, CreateSegmentComponent, CriteriaFormComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    SharedModule.forRoot(),
    SearchModule,
    DxLoadPanelModule,
    DropdownModule,
    TextBoxModule,
    ReportsHomeModule,
    ReportsSegmentModule,
    MatDialogModule,
    ButtonModule,
    ModalModule,
    IconModule,
    VerticalStepperModule,
    DynamicFormModule
  ],
  providers: [
    ReportsService
  ],
})
export class IndexModule {}