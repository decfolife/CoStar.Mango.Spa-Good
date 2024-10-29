import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountingSettingsComponent } from '../accounting-settings/accounting-settings.component';

const routes: Routes = [
  {
    path: '',
    component: AccountingSettingsComponent,
    data: {
      breadCrumb: {
        label: 'Settings',
        append: true,
        activeLink: 'Accounting Settings',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule {}
