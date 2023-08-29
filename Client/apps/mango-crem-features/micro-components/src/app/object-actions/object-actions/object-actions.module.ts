import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { DxButtonModule, DxDataGridModule, DxLoadPanelModule, DxPopupModule, DxTemplateModule, DxTooltipModule } from 'devextreme-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ButtonModule, DropdownModule, LibUiElementsModule, ModalModule } from '@mango/ui-shared/lib-ui-elements';
import { ObjectActionsComponent } from './object-actions.component';
import { DxCheckBoxModule } from 'devextreme-angular';
import { createCustomElement } from '@angular/elements';
import { ArchiveActionService } from '../services/archive-action.service';
import { ArchiveCompanyAndContactComponent } from '../modal/archive-company-and-contact/archive-company-and-contact.component';
import { ArchiveLeaseComponent } from '../modal/archive-lease/archive-lease.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedService } from '../services/shared.service';

// TODO: The 'crem-icon' should be utilized instead of directly using the FontAwesome library.
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

@NgModule({
  declarations: [
    ObjectActionsComponent,
    ArchiveLeaseComponent,
    ArchiveCompanyAndContactComponent
  ],

  imports: [
    CommonModule,
    DxPopupModule,
    DxDataGridModule,
    DxLoadPanelModule,
    DxTemplateModule,
    DxCheckBoxModule,
    DxButtonModule,
    DxCheckBoxModule,
    ButtonModule,
    SearchModule,
    MatMenuModule,
    MatButtonModule,
    ModalModule,
    FontAwesomeModule,
    MatDialogModule
  ],
  exports: [ObjectActionsComponent, ArchiveLeaseComponent],
  providers: [
    ArchiveActionService,
    SharedService
  ]
})

export class ObjectActionsModule {
  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const el = createCustomElement(ObjectActionsComponent, { injector: this.injector });

    customElements.define('mango-object-actions-component', el);
  }
}