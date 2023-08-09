import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewButtonComponent } from './view-button.component';

@NgModule({
  declarations: [ViewButtonComponent],
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ViewButtonComponent],
})
export class ViewButtonModule {}
