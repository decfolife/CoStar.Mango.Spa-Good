import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { MatCardModule } from '@angular/material/card';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { CardHeaderDirective } from './cardHeader.directive';
import { DropdownModule } from '../dropdown';
import { IconModule } from '../icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CardHeaderDirective, CardComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    SearchModule,
    DropdownModule,
    IconModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [CardHeaderDirective, CardComponent],
})
export class CardModule {}
