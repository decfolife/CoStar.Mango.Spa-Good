import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
// eslint-disable-next-line @nx/enforce-module-boundaries

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, MatButtonModule, MatBadgeModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ButtonComponent],
})
export class ButtonModule {}
