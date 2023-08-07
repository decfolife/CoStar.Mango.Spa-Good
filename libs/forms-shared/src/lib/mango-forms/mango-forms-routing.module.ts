import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditFormComponent } from '../edit-form/edit-form.component';
import { RenderFormComponent } from '../render-form/render-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'render-form', pathMatch: 'full' },
  { path: 'render-form', component: RenderFormComponent, data: { breadCrumb: {label: "Render Form", append: true} },},
  { path: 'edit-form', component: EditFormComponent, data: { breadCrumb: {label: "Edit Form", append: true} },}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MangoFormsRoutingModule { }
