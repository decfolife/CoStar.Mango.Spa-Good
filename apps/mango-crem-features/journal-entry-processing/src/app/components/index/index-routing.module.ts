import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalEntriesToApproveComponent } from '../journal-entries-to-approve/journal-entries-to-approve.component';
import { IndexComponent } from './index.component';

const routes: Routes = [
  { path: '', component: IndexComponent},
  {
    path: '',
    children: [
      {
        path: 'journal-entries-to-approve',
        loadChildren: () => import('../journal-entries-to-approve/journal-entries-to-approve.module')
          .then(m => m.JournalEntriesToApproveModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexRoutingModule { }
