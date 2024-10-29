import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BudgetCategoryComponent } from './budget-category.component';
import { BudgetCategoryService } from './budget-category.service';
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
import { UserDeletionComponent } from '../index/modal/user-deletion/user-deletion.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [BudgetCategoryComponent, UserDeletionComponent],

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
        data: { pageTitle: 'Budget Category' },
        component: BudgetCategoryComponent,
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [BudgetCategoryService, DatePipe],
})
export class BudgetCategoriesModule {}
