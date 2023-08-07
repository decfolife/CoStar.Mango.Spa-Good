import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  {
    path: '',
    children: [
      {
        path: 'group-maintenance',
        loadChildren: () => import('../group-maintenance/group-maintenance.module')
          .then(m => m.GroupMaintenanceModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule { }
