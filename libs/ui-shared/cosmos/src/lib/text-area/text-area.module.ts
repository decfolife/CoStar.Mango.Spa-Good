import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAreaComponent } from './text-area.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [TextAreaComponent],
  imports: [CommonModule, MatInputModule, MatFormFieldModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [TextAreaComponent],
})
export class TextAreaModule {}
