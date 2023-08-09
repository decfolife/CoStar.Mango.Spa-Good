import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortfolioMaintenanceComponent } from './portfolio-maintenance.component';
import { PortfolioMaintenanceService } from './portfolio-maintenance.service';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { DxCheckBoxModule, DxDataGridModule, DxLoadPanelModule, DxTemplateModule, DxTooltipModule, DxTreeListModule } from 'devextreme-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule, DropdownModule, ModalModule } from '@mango/ui-shared/lib-ui-elements';
import { MatDialogModule } from '@angular/material/dialog';
import { HierarchyDeletionComponent } from '../index/modal/user-deletion/hierarchy-deletion.component';
import { ViewGroupContactsComponent } from './modals/view-group-contacts/view-group-contacts.component';

@NgModule({
  declarations: [
    PortfolioMaintenanceComponent,
    HierarchyDeletionComponent,
    ViewGroupContactsComponent,
  ],

  imports: [
    CommonModule,
    DxTreeListModule,
    DxDataGridModule,
    DxLoadPanelModule,
    DropdownModule,
    DxTooltipModule,
    DxTemplateModule,
    DxCheckBoxModule,
    ButtonModule,
    SearchModule,
    ModalModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    FontAwesomeModule,
    RouterModule.forChild([
      {
        path: '',
        data: { pageTitle: 'Portfolios' },
        component: PortfolioMaintenanceComponent,
      }
    ])
  ],
  exports: [RouterModule],
  providers: [
    PortfolioMaintenanceService,
    DatePipe
  ]
})
export class PortfolioMaintenanceModule { }