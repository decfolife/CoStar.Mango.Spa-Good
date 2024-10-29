import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'ledgers', pathMatch: 'full' },
  {
    path: 'export-history/JEtoExport',
    loadComponent: () =>
      import('./components/export-history/export-history.component').then(
        (mod) => mod.ExportHistoryComponent
      ),
    data: {
      integrationType: 'JEtoExport',
      breadCrumb: {
        label: 'Export History',
        append: true,
        activeLink: 'Export History',
      },
    },
  },
  {
    path: 'export-history/AP',
    loadComponent: () =>
      import('./components/export-history/export-history.component').then(
        (mod) => mod.ExportHistoryComponent
      ),
    data: {
      integrationType: 'AP',
      breadCrumb: {
        label: 'AP Export History',
        append: true,
        activeLink: 'AP Export History',
      },
    },
  },
  {
    path: 'export-history/AR',
    loadComponent: () =>
      import('./components/export-history/export-history.component').then(
        (mod) => mod.ExportHistoryComponent
      ),
    data: {
      integrationType: 'AR',
      breadCrumb: {
        label: 'AR Export History',
        append: true,
        activeLink: 'AR Export History',
      },
    },
  },
  { path: '', redirectTo: 'ledgers', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
