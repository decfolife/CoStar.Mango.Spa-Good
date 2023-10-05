import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountingListpageComponent } from './accounting-listpage.component';

const routes: Routes = [{ path: '', component: AccountingListpageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountingListpageRoutingModule {}
