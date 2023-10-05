import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from '../../app.component';
import { AccountingDashboardComponent } from '../../components/dashboard/accounting-dashboard.component';
import { AccountingListpageComponent } from '../../components/listpage/accounting-listpage/accounting-listpage.component';
import { DashboardWrapperComponent } from '../dashboard/dashboard-wrapper/dashboard-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: AccountingDashboardComponent,
    canActivate: [CanActivateGuard],
  },
  { path: 'accountingevents', component: AccountingListpageComponent },
  { path: 'updated-dashboard', component: DashboardWrapperComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanActivateGuard],
})
export class IndexRoutingModule {}
