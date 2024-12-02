import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'object-reactivation',
    loadComponent: () =>
      import(
        './components/object-reactivation/object-reactivation.component'
      ).then((mod) => mod.ObjectReactivationComponent),
  },
  { path: '', redirectTo: 'object-reactivation', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
