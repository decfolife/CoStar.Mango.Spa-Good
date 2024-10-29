import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AWSReportComponent } from './aws-report.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AWSReportService } from './aws-report.service';

@NgModule({
  declarations: [AWSReportComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        data: { pageTitle: 'AWS Report' },
        component: AWSReportComponent,
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [AWSReportService],
})
export class AWSReportModule {}
