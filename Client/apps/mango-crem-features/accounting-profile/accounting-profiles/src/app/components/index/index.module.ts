/* eslint-disable linebreak-style */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { createCustomElement } from '@angular/elements';

import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';

import {
  DxDataGridModule, DxFormComponent, DxFormModule, DxSwitchModule, DevExtremeModule, DxValidationGroupModule, DxLoadPanelModule,
} from 'devextreme-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfigurationService } from '../../services/configuration.service';
import { AmortizationProfilesComponent } from '../amortization-profiles/amortization-profiles.component';
import { DiscountRateProfilesComponent } from '../dr-profiles/discount-rate-profiles.component';
import { DiscountRateProfilesAddEditComponent } from '../dr-profiles/dr-profiles-add-edit/dr-profiles-add-edit.component';
import { JournalEntryProfilesComponent } from '../journal-entry-profiles/journal-entry-profiles.component';
import { PortfolioDropdownComponent } from '../portfolio-dropdown/portfolio-dropdown.component';
import { CommonModule } from '@angular/common';
import { LibUiElementsModule } from 'libs/ui-shared/lib-ui-elements/src/lib/lib-ui-elements.module';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { DiscountRateService } from '../../services/discount-rate.service';
import { PortfolioDropdownService } from '../../services/portfolio-dropdown.service';
import { BaseService } from '../../services/base.service';
import { SideNavModule } from 'libs/ui-shared/lib-ui-elements/src/lib/side-nav/side-nav.module';

@NgModule({
  declarations: [
    IndexComponent,
    AmortizationProfilesComponent,
    JournalEntryProfilesComponent,
    DiscountRateProfilesComponent,
    DiscountRateProfilesAddEditComponent,
    PortfolioDropdownComponent,
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    LibUiElementsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatSlideToggleModule,
    MatCardModule,
    FontAwesomeModule,
    SideNavModule,
    DxDataGridModule,
    DxFormModule,
    DxSwitchModule,
    DxValidationGroupModule,
    DevExtremeModule,
    DxLoadPanelModule,
  ],
  providers: [
    ConfigurationService,
    {
      provide: 'BASE_URL',
      useFactory: ConfigurationService.baseUrl,
    },
    DiscountRateService,
    PortfolioDropdownService,
    BaseService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [IndexComponent],
})
export class IndexModule {
  constructor(private injector: Injector) {}
}
