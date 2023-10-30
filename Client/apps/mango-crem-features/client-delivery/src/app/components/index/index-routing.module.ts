import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceAccountsComponent } from '../../components/service-accounts/service-accounts.component';

const routes: Routes = [
  { 
    path: '', 
    component: ServiceAccountsComponent
   },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule { }
