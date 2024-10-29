import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../../../../dashboards/project-dashboard/src/app/services/dashboard.service';
import {
  LibUiElementsModule,
  ModalModule,
} from '@mango/ui-shared/lib-ui-elements';
import { FormWizardAppModule } from '@micro-components/form-wizard/form-wizard.module';
import { AddFormWizardComponent } from './add-form-wizard.component';
import { DxLoadPanelModule } from 'devextreme-angular/ui/load-panel';
import { OpenFormWizardModalComponent } from './open-form-wizard-modal.component';
import { createCustomElement } from '@angular/elements';
import { DxButtonModule } from 'devextreme-angular/ui/button';

@NgModule({
  declarations: [AddFormWizardComponent, OpenFormWizardModalComponent],
  imports: [
    CommonModule,
    LibUiElementsModule,
    ModalModule,
    FormWizardAppModule,
    DxLoadPanelModule,
    DxButtonModule,
  ],
  providers: [DashboardService],
  exports: [AddFormWizardComponent],
})
export class AddFormWizardModule {
  constructor(private injector: Injector) {}
  ngDoBootstrap() {
    const el = createCustomElement(OpenFormWizardModalComponent, {
      injector: this.injector,
    });
    customElements.define('mango-open-form-wizard-modal', el);
  }
}
