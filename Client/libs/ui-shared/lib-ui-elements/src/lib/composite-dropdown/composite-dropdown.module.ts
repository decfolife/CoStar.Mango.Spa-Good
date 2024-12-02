import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CompositeDropdownComponent } from './composite-dropdown.component';

import { ErrorTooltipComponent } from '../error-tooltip';
import { IconModule } from '../icon';

@NgModule({
  declarations: [CompositeDropdownComponent],
  imports: [
    CommonModule,
    IconModule,
    MatExpansionModule,
    ErrorTooltipComponent,
  ],
  exports: [CompositeDropdownComponent],
})
export class CompositeDropdownModule {}
