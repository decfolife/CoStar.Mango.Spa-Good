import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardFiltersComponent } from './dashboard-filters.component';
import { LibUiElementsModule } from '@mango/ui-shared/lib-ui-elements';
import { MatMenuModule } from '@angular/material/menu';
import { FormWizardAppModule } from '../../../../../../apps/mango-crem-features/micro-components/src/app/form-wizard/form-wizard.module';
import { AddFormWizardModule } from '@micro-components/form-wizard/modal/add-form-wizard/add-form-wizard.module';

@NgModule({
  declarations: [DashboardFiltersComponent],
  imports: [
    CommonModule,
    LibUiElementsModule,
    MatMenuModule,
    FormWizardAppModule,
    AddFormWizardModule,
  ],
  exports: [DashboardFiltersComponent],
})
export class DashboardFiltersModule {}
