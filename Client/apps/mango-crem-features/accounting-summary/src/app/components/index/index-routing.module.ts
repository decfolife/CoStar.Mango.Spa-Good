
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { AccountsSummaryComponent } from "../accounts-summary/accounts-summary.component";
import { AddEventComponent } from '../add-event/add-event.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: {
      breadCrumb: { label: 'Summary', append: false, activeLink: 'Accounting' }
    },
    children: [
      {
        path: '',
        component: AccountsSummaryComponent,
        data: {
          breadCrumb: { label: 'Summary', append: true, activeLink: 'Accounting' }
        }
      },
      {
        path: 'addEvent',
        component: AddEventComponent,
        data: {
          breadCrumb: { label: 'Add Event', append: true, activeLink: 'Accounting' }
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule { }
