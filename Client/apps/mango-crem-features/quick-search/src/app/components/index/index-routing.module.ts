import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';

const routes: Routes = [
  {
    path: '',
    title: 'Search Results',
    component: IndexComponent,
    data: {
      breadCrumb: {
        label: 'Search Results',
        append: true,
        activeLink: 'Results Results',
      },
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule {}
