import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ButtonModule } from '../button';
import { IconModule } from '../icon';

@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    DragDropModule,
    ButtonModule,
    IconModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ModalComponent],
})
export class ModalModule {}
