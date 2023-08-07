import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MangoFormsComponent } from './mango-forms/mango-forms.component';
import { RenderFormComponent } from './render-form/render-form.component';
import { EditFormComponent } from './edit-form/edit-form.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    MangoFormsComponent,
    RenderFormComponent,
    EditFormComponent
  ],
  exports: [
    MangoFormsComponent,
    RenderFormComponent,
    EditFormComponent
  ],
})
export class FormsSharedModule {}
