import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormWizardAppComponent } from './form-wizard.component';
import {
  ButtonModule,
  DynamicFormModule,
} from '@mango/ui-shared/lib-ui-elements';
import { FormWizardService } from '../services/form-wizard.service';
import { DashboardService } from '@project-dashboard/services/dashboard.service';

@NgModule({
  declarations: [FormWizardAppComponent],
  exports: [FormWizardAppComponent],
  imports: [CommonModule, ButtonModule, DynamicFormModule],
  providers: [FormWizardService],
})
export class FormWizardAppModule {
  constructor() {}
}
