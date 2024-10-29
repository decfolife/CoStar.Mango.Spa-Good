import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'accounting-history', pathMatch: 'full' },
  {
    path: 'accounting-history',
    loadComponent: () =>
      import(
        './components/accounting-history/accounting-history.component'
      ).then((mod) => mod.AccountingHistoryComponent),
    data: {
      breadCrumb: { label: 'History', append: true, activeLink: 'History' },
    },
  },
  { path: '', redirectTo: 'accounting-history', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
