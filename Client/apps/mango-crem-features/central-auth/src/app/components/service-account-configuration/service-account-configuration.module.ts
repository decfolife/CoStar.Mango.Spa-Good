import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceAccountConfigurationComponent } from './service-account-configuration.component';
import { ServiceAccountApiKeysComponent } from './service-account-api-keys/service-account-api-keys.component';
import { ServiceAccountSitesComponent } from './service-account-sites/service-account-sites.component';
import { ServiceAccountEndpointsComponent } from './service-account-endpoints/service-account-endpoints.component';
import { ServiceAccountHistoryComponent } from './service-account-history/service-account-history.component';
import { DxCheckBoxModule, DxDataGridModule, DxLoadPanelModule, DxPopupModule, DxSelectBoxModule, DxTooltipModule } from 'devextreme-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { LoaderModule } from '@mango/ui-shared/cosmos';
import { DropdownModule } from '@mango/ui-shared/lib-ui-elements';
import { CremHeaderModule } from 'libs/ui-shared/lib-ui-shared/src/lib/crem-header/crem-header.module';
import { LibUiSharedModule } from '@mango/ui-shared/lib-ui-shared';
import { NavbarModule } from '../navbar/navbar.module';

@NgModule({
  declarations: [
    ServiceAccountConfigurationComponent,
    ServiceAccountApiKeysComponent,
    ServiceAccountSitesComponent,
    ServiceAccountEndpointsComponent,
    ServiceAccountHistoryComponent
  ],
  exports: [ServiceAccountConfigurationComponent],
  imports: [
    CommonModule,
    DxLoadPanelModule,
    NavbarModule,
    RouterModule,
    ReactiveFormsModule,
    LibDataModelsModule,
    LibUiSharedModule,
    DxSelectBoxModule,
    MatCardModule,
    MatTooltipModule,
    MatMenuModule,
    DxDataGridModule,
    DxCheckBoxModule,
    DropdownModule,
    DxTooltipModule,
    DxPopupModule,
    DxLoadPanelModule,
    CremHeaderModule,
    LoaderModule
  ]
})
export class ServiceAccountConfigurationModule { }
