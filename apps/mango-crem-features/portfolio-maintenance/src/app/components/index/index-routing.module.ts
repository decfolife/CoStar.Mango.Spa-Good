import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  {
    path: '',
    children: [
      {
        path: 'portfolio-maintenance',
        loadChildren: () => import('../portfolio-maintenance/portfolio-maintenance.module')
          .then(m => m.PortfolioMaintenanceModule)
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule { }
