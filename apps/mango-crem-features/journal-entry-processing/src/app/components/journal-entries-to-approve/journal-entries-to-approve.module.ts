import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SearchModule } from '@mango/ui-shared/cosmos';
import { DxDataGridModule, DxLoadPanelModule, DxTemplateModule, DxTooltipModule, DxTreeListModule } from 'devextreme-angular';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule, DropdownModule } from '@mango/ui-shared/lib-ui-elements';
import { JournalEntriesToApproveComponent } from './journal-entries-to-approve.component';
import { JournalEntriesToApproveService } from './journal-entries-to-approve.service';

@NgModule({
  declarations: [
    JournalEntriesToApproveComponent,
  ],

  imports: [
    CommonModule,
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
        component: JournalEntriesToApproveComponent,
      }
    ])
  ],
  exports: [RouterModule],
  providers: [
    JournalEntriesToApproveService,
  ]
})
export class JournalEntriesToApproveModule { }