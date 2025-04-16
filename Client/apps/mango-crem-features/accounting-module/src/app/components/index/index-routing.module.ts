import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from '../../app.component';
import { AccountingListpageComponent } from '../../components/listpage/accounting-listpage/accounting-listpage.component';
import { DashboardWrapperComponent } from '../dashboard/dashboard-wrapper/dashboard-wrapper.component';

const routes: Routes = [
  {
    path: 'accountingevents',
    title: 'Accounting Events',
    component: AccountingListpageComponent,
    data: {
      breadCrumb: { label: 'Events', append: true, activeLink: 'Events' },
    },
  },
  {
    path: 'dashboard',
    component: DashboardWrapperComponent,
    // title: 'Accounting Dashboard',
    data: {
      breadCrumb: { label: 'Dashboard', append: true, activeLink: 'Dashboard' },
    },
  },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CanActivateGuard],
})
export class IndexRoutingModule {}
