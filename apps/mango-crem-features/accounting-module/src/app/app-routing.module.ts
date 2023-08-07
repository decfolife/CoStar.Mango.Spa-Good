import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from './app.component';
import { AccountingDashboardComponent } from './components/dashboard/accounting-dashboard.component';
import { AccountingListpageComponent } from './components/listpage/accounting-listpage/accounting-listpage.component';

const routes: Routes = [
  { path: 'dashboard', component: AccountingDashboardComponent, canActivate: [ CanActivateGuard ] },
  { path: 'accountingevents', component: AccountingListpageComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ CanActivateGuard ]
})
export class AppRoutingModule { }
