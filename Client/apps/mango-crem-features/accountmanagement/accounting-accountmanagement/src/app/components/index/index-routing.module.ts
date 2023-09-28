import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountingSettingsComponent } from '../accounting-settings/accounting-settings.component';
import { PortfolioDropdownComponent } from '../portfolio-dropdown/portfolio-dropdown.component';
import { IndexComponent } from './index.component';

const routes: Routes = [
  { path: '', component: AccountingSettingsComponent },
  { path: 'portfoliodropdown', component: PortfolioDropdownComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule {}
