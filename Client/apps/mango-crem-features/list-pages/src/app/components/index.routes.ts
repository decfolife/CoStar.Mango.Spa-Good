import { ListPageComponent } from './listpage/list-page.component';
import { ListPageTestComponent } from './listpage/list-page-test/list-page-test.component';
import { Routes } from '@angular/router';

export const ROUTES: Routes = [
  {
    path: '',
    component: ListPageComponent,
    pathMatch: 'full',
    data: {
      breadCrumb: { append: false },
    },
  },
  {
    path: 'listpagetest',
    component: ListPageTestComponent,
  },
];
