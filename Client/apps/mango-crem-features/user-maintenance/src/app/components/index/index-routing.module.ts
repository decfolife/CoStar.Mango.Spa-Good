import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  {
    path: '',
    children: [
      {
        path: 'user-maintenance',
        loadChildren: () => import('../user-maintenance/user-maintenance.module')
          .then(m => m.UserMaintenanceModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule { }
