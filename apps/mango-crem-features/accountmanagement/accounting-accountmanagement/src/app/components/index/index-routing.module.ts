import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountingSettingsComponent } from '../accounting-settings/accounting-settings.component';
import { PortfolioDropdownComponent } from '../portfolio-dropdown/portfolio-dropdown.component';
import { IndexComponent } from './index.component';

const routes: Routes = [
  {
     path: '', 
     component: IndexComponent,
     children: [
      { path: '', component: AccountingSettingsComponent },
      { path: 'accountingsettings', component: AccountingSettingsComponent }, // todo: remove once fully moved to MangoSpa, redundant
      { path: 'portfoliodropdown', component: PortfolioDropdownComponent },
     ]    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule {}
