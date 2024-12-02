import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxDataGridModule } from 'devextreme-angular/ui/data-grid';
import { DxBulletModule } from 'devextreme-angular/ui/bullet';
import {
  CustomTemplateDirective,
  SimpleGridComponent,
} from './simple-grid.component';
import { DxLoadPanelModule, DxTemplateModule } from 'devextreme-angular';
import { ButtonModule } from '../button';
import { CremModalAwareGridDirective } from './modal-aware-grid.directive';

@NgModule({
  imports: [
    CommonModule,
    DxDataGridModule,
    DxBulletModule,
    ButtonModule,
    DxTemplateModule,
    DxLoadPanelModule,
  ],
  declarations: [
    SimpleGridComponent,
    CustomTemplateDirective,
    CremModalAwareGridDirective,
  ],
  exports: [
    SimpleGridComponent,
    CustomTemplateDirective,
    CremModalAwareGridDirective,
  ],
})
export class SimpleGridModule {}
