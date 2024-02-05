

import { NgModule} from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { ButtonModule, DropdownModule, ModalModule } from '@mango/ui-shared/lib-ui-elements';
import { DxDataGridModule, DxLoadPanelModule, DxCheckBoxModule } from 'devextreme-angular';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ServiceAccountsComponent } from '../service-accounts/service-accounts.component';
import { ClientDeliveryService } from '../../services/client-delivery.service';
import { UserMaintenanceService } from '../../../../../user-maintenance/src/app/components/user-maintenance/user-maintenance.service';
import { IndexRoutingModule } from '../index/index-routing.module';
import { ServiceAccountDetailsComponent } from '../../components/service-account-details/service-account-details.component';
import { AddServiceAccountComponent } from '../../components/add-service-account/add-service-account.component';
import { UpdateServiceAccountComponent } from '../update-service-account/update-service-account.component';
import { ResetPasswordConfirmationComponent } from '../../components/reset-password-confirmation/reset-password-confirmation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ServiceAccountsComponent,
    ServiceAccountDetailsComponent,
    AddServiceAccountComponent,
    UpdateServiceAccountComponent,
    ResetPasswordConfirmationComponent,
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    SearchModule,
    ButtonModule,
    DxDataGridModule,
    DxLoadPanelModule,
    DxCheckBoxModule,
    ModalModule,
    MatMenuModule,
    MatButtonModule,
    FontAwesomeModule,
    MatDialogModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatIconModule
  ],
  exports: [RouterModule],
  providers: [
    ClientDeliveryService,
    UserMaintenanceService,
    DatePipe
  ],
})
export class IndexModule { }
