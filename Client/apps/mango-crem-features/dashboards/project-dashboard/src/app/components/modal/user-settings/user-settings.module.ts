import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalModule } from '@mango/ui-shared/lib-ui-elements';
import { MatTabsModule } from '@angular/material/tabs';
import { UserSettingsComponent } from './user-settings.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [UserSettingsComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    MatSlideToggleModule,
    FormsModule,
    ModalModule,
    DragDropModule,
  ],
  exports: [UserSettingsComponent],
  bootstrap: [],
})
export class UserSettingsModule {}
