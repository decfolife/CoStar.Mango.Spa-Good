import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccordionComponent } from './accordion.component';

import { IconModule } from '../icon';

@NgModule({
  declarations: [AccordionComponent],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [
    AccordionComponent
  ],
})
export class AccordionModule {}
