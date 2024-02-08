import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@mango/ui-shared/lib-ui-elements';
import { MangoDialogComponent } from './mango-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [MangoDialogComponent],
  imports: [
    CommonModule, ButtonModule, DragDropModule, MatIconModule,
  ],
  exports: [MangoDialogComponent]
})
export class MangoDialogModule {
}
