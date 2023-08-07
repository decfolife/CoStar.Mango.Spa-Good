import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuard } from '../../services/guards/can-activate.guard';
import { CustomerSelectComponent } from '../customer-select/customer-select.component';
import { IndexComponent } from './index.component';

const routes: Routes = [
  {
    path: 'customer-selection',
    component: CustomerSelectComponent,
    canActivate: [CanActivateGuard],
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('../../components/reset-password/reset-password.module').then(
        (mod) => mod.ResetPasswordModule),
  },
  {
    path: 'password-reset-request',
    loadChildren: () =>
      import('../../components/password-reset-request/password-reset-request.module').then(
        (mod) => mod.PasswordResetRequestModule
      ),
  },
  {
    path: ':clientKey',
    component: IndexComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule { }
