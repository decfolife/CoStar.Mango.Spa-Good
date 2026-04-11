import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DxDataGridModule } from 'devextreme-angular';
import { SearchModule } from '@mango/ui-shared/cosmos';
import {
  ButtonModule,
  SkeletonModule,
} from '@mango/ui-shared/lib-ui-elements';
import { PageHeaderComponent } from '@mango/ui-shared/lib-ui-elements';
import { AiListPageComponent } from './ai-list-page.component';

@NgModule({
  declarations: [AiListPageComponent],
  imports: [
    CommonModule,
    RouterModule,
    DxDataGridModule,
    SearchModule,
    ButtonModule,
    SkeletonModule,
    PageHeaderComponent,
  ],
  exports: [AiListPageComponent],
})
export class AiListPageModule {}
