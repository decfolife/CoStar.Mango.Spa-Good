import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsSegmentComponent } from './reports-segment.component';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { DropdownModule, ButtonModule, LoaderModule, FavoriteIconModule } from '@mango/ui-shared/lib-ui-elements'
import { MatIconModule } from '@angular/material/icon';
import { DxDataGridModule, DxTooltipModule } from 'devextreme-angular';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    ReportsSegmentComponent
  ],
  imports: [
    CommonModule,
    SearchModule,
    DropdownModule,
    ButtonModule,
    MatIconModule,
    DxDataGridModule,
    MatMenuModule,
    MatButtonToggleModule,
    LoaderModule,
    DxTooltipModule,
    FavoriteIconModule,
    RouterModule.forChild([
      {
        path: '',
        data: { pageTitle: 'Reports Segment' },
        component: ReportsSegmentComponent
      }
    ])
  ],
  exports: [ReportsSegmentComponent],
})
export class ReportsSegmentModule { }
