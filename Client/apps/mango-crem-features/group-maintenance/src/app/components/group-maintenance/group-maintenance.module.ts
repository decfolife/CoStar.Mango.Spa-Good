import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GroupMaintenanceComponent } from './group-maintenance.component';
import { GroupMaintenanceService } from './group-maintenance.service';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { DxDataGridModule, DxLoadPanelModule, DxTemplateModule, DxTooltipModule, DxTreeListModule } from 'devextreme-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule, DropdownModule } from '@mango/ui-shared/lib-ui-elements';

@NgModule({
  declarations: [
    GroupMaintenanceComponent,
  ],

  imports: [
    CommonModule,
    DxTreeListModule,
    DxDataGridModule,
    DxLoadPanelModule,
    DropdownModule,
    DxTooltipModule,
    DxTemplateModule,
    ButtonModule,
    SearchModule,
    MatMenuModule,
    MatButtonModule,
    FontAwesomeModule,
    RouterModule.forChild([
      {
        path: '',
        data: { pageTitle: 'Security Groups', breadCrumb: { label: 'Group Maintenance', append: true } },
        component: GroupMaintenanceComponent,
      }
    ])
  ],
  exports: [RouterModule],
  providers: [
    GroupMaintenanceService,
    DatePipe
  ]
})
export class GroupMaintenanceModule { }