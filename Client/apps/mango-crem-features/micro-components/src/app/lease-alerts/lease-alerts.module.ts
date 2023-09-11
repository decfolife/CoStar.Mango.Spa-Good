import { Injector, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';

import {
  DevExtremeModule,
  DxDataGridModule,
  DxPopupModule,
  DxTextBoxModule,
  DxSwitchModule,
  DxSelectBoxModule,
} from 'devextreme-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LibUiElementsModule } from '@mango/ui-shared/lib-ui-elements';

import { LeaseAlertsComponent } from './lease-alerts.component';
import { AlertsGridComponent } from './alerts-grid/alerts-grid.component';
import { AlertsPopupComponent } from './alerts-popup/alerts-popup.component';
import { LeaseAlertsControlsComponent } from './lease-alerts-controls/lease-alerts-controls.component';
import { AlertsService } from './shared/service/alerts.service';

@NgModule({
  declarations: [
    LeaseAlertsComponent,
    AlertsGridComponent,
    AlertsPopupComponent,
    LeaseAlertsControlsComponent,
  ],
  exports: [LeaseAlertsControlsComponent],
  imports: [
    CommonModule,
    DevExtremeModule,
    DxDataGridModule,
    DxPopupModule,
    DxTextBoxModule,
    DxSwitchModule,
    DxSelectBoxModule,
    FontAwesomeModule,
    LibUiElementsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatSlideToggleModule,
  ],
  providers: [ AlertsService ]
})
export class LeaseAlertsModule {

  constructor(private injector: Injector) { }

  ngDoBootstrap() {
    const el = createCustomElement(LeaseAlertsComponent, { injector: this.injector });

    customElements.define('mango-alerts-root', el);
  }
}
