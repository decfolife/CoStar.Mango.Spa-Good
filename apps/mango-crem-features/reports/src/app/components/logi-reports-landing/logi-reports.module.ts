import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { LogiReportsLandingPageComponent } from './logi-reports-landing-page.component';
import { LogiReportsLandingModule } from './logi-reports-landing-routing.module';


@NgModule({
  declarations: [LogiReportsLandingPageComponent],
  imports: [
    CommonModule,
    LogiReportsLandingModule,
    SharedModule.forRoot(),
  ],
  providers: [
  ],
})
export class LogiReportsModule {}