import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchModule } from '@mango/ui-shared/cosmos';
import {
  DxButtonModule,
  DxDataGridModule,
  DxLoadPanelModule,
  DxPopupModule,
  DxTemplateModule,
  DxTooltipModule,
} from 'devextreme-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  ButtonModule,
  DropdownModule,
  ModalModule,
} from '@mango/ui-shared/lib-ui-elements';
import { ObjectActionsComponent } from './object-actions.component';
import { ObjectActionsService } from './object-actions.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ArchiveLeaseComponent } from '../modal/archive-lease/archive-lease.component';
import { DxCheckBoxModule } from 'devextreme-angular';
import { ArchiveActionService } from '../../shared/services/archive-action.service';
import { createCustomElement } from '@angular/elements';
import { ArchiveCompanyAndContactComponent } from '../modal/archive-company-and-contact/archive-company-and-contact.component';

@NgModule({
  declarations: [
    ObjectActionsComponent,
    ArchiveLeaseComponent,
    ArchiveCompanyAndContactComponent,
  ],

  imports: [
    CommonModule,
    DxPopupModule,
    DxDataGridModule,
    DxLoadPanelModule,
    DropdownModule,
    DxTooltipModule,
    DxTemplateModule,
    DxCheckBoxModule,
    DxButtonModule,
    DxCheckBoxModule,
    ButtonModule,
    SearchModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    ModalModule,
    FontAwesomeModule,
  ],
  exports: [],
  providers: [ArchiveActionService, ObjectActionsService],
})
export class ObjectActionsModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(ObjectActionsComponent, {
      injector: this.injector,
    });

    customElements.define('mango-object-actions-component', el);
  }
}
