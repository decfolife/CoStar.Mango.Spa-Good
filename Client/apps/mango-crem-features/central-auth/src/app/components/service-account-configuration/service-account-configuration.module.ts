import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceAccountConfigurationComponent } from './service-account-configuration.component';
import { ServiceAccountApiKeysComponent } from './service-account-api-keys/service-account-api-keys.component';
import { ServiceAccountSitesComponent } from './service-account-sites/service-account-sites.component';
import { ServiceAccountEndpointsComponent } from './service-account-endpoints/service-account-endpoints.component';
import { ServiceAccountHistoryComponent } from './service-account-history/service-account-history.component';
import { GenerateApiKeyConfirmationComponent } from './generate-apikey-confirmation/generate-apikey-confirmation.component';
import { CopyClipboardMessageComponent } from './copy-clipboard-message/copy-clipboard-message.component';
import { DxDataGridModule } from 'devextreme-angular';
import { MatCardModule } from '@angular/material/card';
import { NavbarModule } from '../navbar/navbar.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CremHeaderModule } from 'libs/ui-shared/lib-ui-shared/src/lib/crem-header/crem-header.module';
import { ModalModule } from '@mango/ui-shared/lib-ui-elements';

@NgModule({
  declarations: [
    ServiceAccountConfigurationComponent,
    ServiceAccountApiKeysComponent,
    ServiceAccountSitesComponent,
    ServiceAccountEndpointsComponent,
    ServiceAccountHistoryComponent,
    GenerateApiKeyConfirmationComponent,
    CopyClipboardMessageComponent
  ],
  exports: [ServiceAccountConfigurationComponent],
  imports: [
    CommonModule,
    NavbarModule,
    MatCardModule,
    DxDataGridModule,
    MatSlideToggleModule,
    ModalModule
  ]
})
export class ServiceAccountConfigurationModule { 
  
}
