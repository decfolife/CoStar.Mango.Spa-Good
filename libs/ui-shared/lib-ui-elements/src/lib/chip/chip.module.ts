
import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



import { DxPopoverModule,DxButtonModule, DxTemplateModule } from "devextreme-angular";
import { ChipComponent } from './chip.component';

@NgModule({
  declarations: [ChipComponent],
  imports: [
    CommonModule,
    DxButtonModule,
    DxPopoverModule,
    DxTemplateModule
  ],
  exports: [ChipComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChipModule {

}
