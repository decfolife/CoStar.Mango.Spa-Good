import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'costar-property-lookup', pathMatch: 'full' },
  {
    path: 'costar-property-lookup',
    loadComponent: () =>
      import(
        './components/costar-property-lookup/costar-property-lookup.component'
      ).then((mod) => mod.CostarPropertyLookupComponent),
  },
  {
    path: 'costar-integration',
    loadComponent: () =>
      import(
        './components/costar-integration/costar-property-details/costar-property-details.component'
      ).then((mod) => mod.CostarPropertyDetailsComponent),
  },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
