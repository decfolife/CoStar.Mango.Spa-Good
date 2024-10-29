import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { CremViewMenuComponent } from './crem-view-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DxScrollViewModule } from 'devextreme-angular';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [CremViewMenuComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    FontAwesomeModule,
    DxScrollViewModule,
    MatExpansionModule,
    MatListModule,
  ],
  exports: [CremViewMenuComponent],
})
export class CremViewMenuModule {}
