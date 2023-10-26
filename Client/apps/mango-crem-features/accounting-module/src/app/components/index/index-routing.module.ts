import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from '../../app.component';
import { AccountingDashboardComponent } from '../../components/dashboard/accounting-dashboard.component';
import { AccountingListpageComponent } from '../../components/listpage/accounting-listpage/accounting-listpage.component';
import { DashboardWrapperComponent } from '../dashboard/dashboard-wrapper/dashboard-wrapper.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: AccountingDashboardComponent,
    data: {
      breadCrumb: { label: 'Dashboard', append: true, activeLink: 'Dashboard' }
    },
    canActivate: [CanActivateGuard],
  },
  {
    path: 'accountingevents', component: AccountingListpageComponent,
    data: {
      breadCrumb: { label: 'Events', append: true, activeLink: 'Events' }
    },
  },
  {
    path: 'updated-dashboard', component: DashboardWrapperComponent,
    data: {
      breadCrumb: { label: 'Dashboard', append: true, activeLink: 'Dashboard' }
    },
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanActivateGuard],
})
export class IndexRoutingModule { }
