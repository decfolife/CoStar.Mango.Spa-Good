import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { SidenavService } from '../../services/sidenav.service';
import { LibUiElementsModule } from 'libs/ui-shared/lib-ui-elements/src/lib/lib-ui-elements.module';
import { AccountingSettingsComponent } from '../accounting-settings/accounting-settings.component';
import { PortfolioDropdownComponent } from '../portfolio-dropdown/portfolio-dropdown.component';
import { MeasureEventSettingsComponent } from '../measure-event-settings/measure-event-settings.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DevExtremeModule, DxDataGridModule, DxFormModule, DxLoadPanelModule, DxSwitchModule, DxValidationGroupModule } from 'devextreme-angular';


@NgModule({
  declarations: [
    IndexComponent,
    AccountingSettingsComponent,
    PortfolioDropdownComponent,
    MeasureEventSettingsComponent,
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
    MatTabsModule,
    FontAwesomeModule,
    DxDataGridModule,
    DxFormModule,
    DxSwitchModule,
    DxValidationGroupModule,
    DevExtremeModule,
    DxLoadPanelModule
  ],
  providers: [
    SidenavService,
  ],
})
export class IndexModule {}
