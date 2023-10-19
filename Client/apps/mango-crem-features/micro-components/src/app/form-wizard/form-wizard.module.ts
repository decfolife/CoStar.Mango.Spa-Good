import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormWizardAppComponent } from './form-wizard.component';
import {
  ButtonModule,
  DynamicFormModule,
} from '@mango/ui-shared/lib-ui-elements';
import { FormWizardService } from '../services/form-wizard.service';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { AddBuildingWizardComponent } from './modal/add-building-wizard/add-building-wizard.component';

@NgModule({
  declarations: [FormWizardAppComponent, AddBuildingWizardComponent],
  exports: [FormWizardAppComponent],
  imports: [CommonModule, ButtonModule, DynamicFormModule],
  providers: [FormWizardService],
})
export class FormWizardAppModule {
  constructor() {}
}
