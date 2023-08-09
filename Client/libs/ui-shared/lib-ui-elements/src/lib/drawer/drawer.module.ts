import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { DrawerComponent } from './drawer.component';

import { DxButtonModule } from 'devextreme-angular/ui/button';
import { DxDrawerModule } from 'devextreme-angular/ui/drawer';
import { DxRadioGroupModule } from 'devextreme-angular/ui/radio-group';
import { DxToolbarModule } from 'devextreme-angular/ui/toolbar';
import { CommonModule } from '@angular/common';
import { DxTreeViewModule } from 'devextreme-angular/ui/tree-view';
import { DxListModule } from 'devextreme-angular/ui/list';

@NgModule({
  imports: [
    CommonModule,
    DxButtonModule,
    DxDrawerModule,
    DxListModule,
    DxTreeViewModule,
    DxRadioGroupModule,
    DxToolbarModule,
  ],
  declarations: [DrawerComponent],
})
export class DrawerModule {}
