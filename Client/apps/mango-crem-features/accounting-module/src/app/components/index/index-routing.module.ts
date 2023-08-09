import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from '../../app.component';
import { AccountingDashboardComponent } from '../../components/dashboard/accounting-dashboard.component';
import { AccountingListpageComponent } from '../../components/listpage/accounting-listpage/accounting-listpage.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AccountingDashboardComponent,
    canActivate: [CanActivateGuard],
  },
  { path: 'events', component: AccountingListpageComponent },
  { path: 'accountingevents', component: AccountingListpageComponent }, // todo: remove once fully moved to MangoSpa
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanActivateGuard],
})
export class IndexRoutingModule {}
