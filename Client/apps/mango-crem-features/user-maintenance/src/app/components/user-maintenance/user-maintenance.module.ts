import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserMaintenanceComponent } from './user-maintenance.component';
import { UserMaintenanceService } from './user-maintenance.service';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { ButtonModule, DropdownModule, ModalModule } from '@mango/ui-shared/lib-ui-elements';
import { DxDataGridModule, DxLoadPanelModule } from 'devextreme-angular';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserDeletionComponent } from '../index/modal/user-deletion/user-deletion.component';
import {  MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    UserMaintenanceComponent,
    UserDeletionComponent
  ],

  imports: [
    CommonModule,
    SearchModule,
    ButtonModule,
    DxDataGridModule,
    DxLoadPanelModule,
    ModalModule,
    MatMenuModule,
    MatButtonModule,
    FontAwesomeModule,
    MatDialogModule,
    DropdownModule,
    RouterModule.forChild([
      {
        path: '',
        data: { pageTitle: 'Users' },
        component: UserMaintenanceComponent,
      }
    ])
  ],
  exports: [RouterModule],
  providers: [
    UserMaintenanceService,
    DatePipe
  ]
})
export class UserMaintenanceModule { }