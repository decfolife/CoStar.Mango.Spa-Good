import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CompositeDropdownComponent } from './composite-dropdown.component';
import { MatExpansionModule } from '@angular/material/expansion';

import { IconModule } from '../icon';

@NgModule({
  declarations: [CompositeDropdownComponent],
  imports: [
    CommonModule,
    IconModule,
    MatExpansionModule],
  exports: [
    CompositeDropdownComponent
  ],
})
export class CompositeDropdownModule {}
