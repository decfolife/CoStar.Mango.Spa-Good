import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import {
  DxButtonModule,
  DxDataGridModule,
  DxLoadPanelModule,
  DxPopupModule,
  DxScrollViewModule,
  DxSelectBoxModule,
  DxTextBoxModule,
} from 'devextreme-angular';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';

import { DataFieldFormatEditorComponent } from '../data-field-format-editor/data-field-format-editor.component';
import { DataSetGridComponent } from '../data-set-grid/data-set-grid.component';
import { DataSetsComponent } from '../data-sets/data-sets.component';
import { DetailGridComponent } from '../detail-grid/detail-grid.component';

import { DataSetDictionaryService } from '../../services/data-set-dictionary.service';

@NgModule({
  declarations: [
    DataFieldFormatEditorComponent,
    DataSetGridComponent,
    DataSetsComponent,
    DetailGridComponent,
    IndexComponent,
  ],
  imports: [
    CommonModule,
    DxButtonModule,
    DxDataGridModule,
    DxPopupModule,
    DxScrollViewModule,
    DxSelectBoxModule,
    DxTextBoxModule,
    DxLoadPanelModule,
    HttpClientModule,
    IndexRoutingModule,
  ],
  providers: [DataSetDictionaryService],
})
export class IndexModule {}
