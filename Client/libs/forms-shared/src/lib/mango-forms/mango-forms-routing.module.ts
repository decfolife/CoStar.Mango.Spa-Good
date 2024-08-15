import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRenderFormComponent } from '@forms/admin-render-forms/admin-render-form.component';
import { DynamicFormsListComponent } from '@forms/admin-render-forms/dynamic-form-list/dynamic-form-list.component';
import { DynamicFormComponent } from '@forms/admin-render-forms/dynamic-form/dynamic-form.component';
import { DynamicFormClearStateGuard } from './dynamic-form-clear-state.guard';
import { RenderFormComponent } from '@forms/render-form/render-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'render-form', pathMatch: 'full' },
  { path: 'render-form', component: RenderFormComponent, canActivate: [DynamicFormClearStateGuard], data: { breadCrumb: {label: " ", append: true, activeLink: " " }}},
  { path: 'admin-forms', component: AdminRenderFormComponent, data: { moduleId: 6, breadCrumb: {label: "Forms Maintenance", append: true} },
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: DynamicFormsListComponent, canActivate: [DynamicFormClearStateGuard] , data: { moduleId: 6 }},
      { path: 'dynamic-form', component: DynamicFormComponent, canActivate: [DynamicFormClearStateGuard] , data: { moduleId: 6, breadCrumb: {label: "Configure Form", append: true, activeLink: "Forms Maintenance" } }},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MangoFormsRoutingModule { }
