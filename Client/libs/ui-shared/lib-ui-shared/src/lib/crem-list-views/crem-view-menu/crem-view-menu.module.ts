import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibUiElementsModule, ModalModule } from '@mango/ui-shared/lib-ui-elements';
import { MatMenuModule} from '@angular/material/menu';
import { FormWizardAppModule } from '../../../../../../../apps/mango-crem-features/micro-components/src/app/form-wizard/form-wizard.module';
import { AddFormWizardModule } from '@micro-components/form-wizard/modal/add-form-wizard/add-form-wizard.module';
import { CremViewMenuComponent } from './crem-view-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DxScrollViewModule } from 'devextreme-angular';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [CremViewMenuComponent],
  imports: [
    CommonModule, MatMenuModule,FontAwesomeModule,DxScrollViewModule,
    MatExpansionModule, MatListModule,
  ],
  exports: [CremViewMenuComponent]
})
export class CremViewMenuModule {
}
