import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ButtonModule } from '../button';
import { MatIconModule } from '@angular/material/icon';
import { TooltipBasicModule } from '../tooltip-basic/tooltip-basic.module';

@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    DragDropModule,
    ButtonModule,
    MatIconModule,
    TooltipBasicModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ModalComponent],
})
export class ModalModule {}
