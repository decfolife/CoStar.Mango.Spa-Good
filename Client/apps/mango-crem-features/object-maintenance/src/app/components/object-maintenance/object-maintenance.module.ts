import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ObjectMaintenanceComponent } from './object-maintenance.component';
import { ObjectMaintenanceService } from './object-maintenance.service';
import { SearchModule } from '@mango/ui-shared/cosmos';
import {
  ButtonModule,
  DropdownModule,
  ModalModule,
} from '@mango/ui-shared/lib-ui-elements';
import { DxDataGridModule, DxLoadPanelModule } from 'devextreme-angular';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ObjectMaintenanceComponent],

  imports: [
    CommonModule,
    SearchModule,
    ButtonModule,
    DropdownModule,
    DxDataGridModule,
    DxLoadPanelModule,
    ModalModule,
    MatMenuModule,
    MatButtonModule,
    FontAwesomeModule,
    MatDialogModule,
    RouterModule.forChild([
      {
        path: '',
        data: {
          pageTitle: 'Objects',
          breadCrumb: { label: 'Object Maintenance', append: true },
        },
        component: ObjectMaintenanceComponent,
      },
      {
        path: ':OTID',
        data: {
          pageTitle: 'Objects',
          breadCrumb: { label: 'Object Maintenance', append: true },
        },
        component: ObjectMaintenanceComponent,
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [ObjectMaintenanceService],
})
export class ObjectMaintenanceModule {}
