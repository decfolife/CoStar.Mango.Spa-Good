import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertChipComponent } from './alert-chip.component';
import { EnvInfoChipModule } from '@mango/ui-shared/lib-ui-shared';

@NgModule({
  declarations: [
    AlertChipComponent
  ],
  imports: [
    CommonModule,
    EnvInfoChipModule
  ],
  exports: [
    AlertChipComponent
  ]
})
export class AlertChipModule { }