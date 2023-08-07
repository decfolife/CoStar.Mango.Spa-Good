import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleComponent } from './toggle.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [ToggleComponent],
  imports: [CommonModule,
   MatSlideToggleModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ToggleComponent],
})
export class ToggleModule {}
