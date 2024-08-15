import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ButtonModule } from '../button';
import { MatIconModule } from '@angular/material/icon';
import { TooltipModule } from '../tooltip/tooltip.module';

@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    DragDropModule,
    ButtonModule,
    MatIconModule,
    TooltipModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ModalComponent],
})
export class ModalModule {}
