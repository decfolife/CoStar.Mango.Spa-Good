
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DxPopoverModule,DxButtonModule, DxTemplateModule } from 'devextreme-angular';
import { EnvInfoChipComponent } from './env-info-chip.component';


@NgModule({
  declarations: [EnvInfoChipComponent],
  imports: [
    CommonModule,
    DxButtonModule,
    DxPopoverModule,
    DxTemplateModule
  ],
  exports: [EnvInfoChipComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EnvInfoChipModule { }
