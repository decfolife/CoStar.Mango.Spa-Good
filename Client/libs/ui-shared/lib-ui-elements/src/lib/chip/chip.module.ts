
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import {DxButtonModule, DxTemplateModule } from 'devextreme-angular';
import { ChipComponent } from './chip.component';

@NgModule({
  declarations: [ChipComponent],
  imports: [
    CommonModule,
    DxButtonModule,
    DxTemplateModule,
    MatTooltipModule,
    HttpClientModule  ],
  exports: [ChipComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ChipModule {

}
