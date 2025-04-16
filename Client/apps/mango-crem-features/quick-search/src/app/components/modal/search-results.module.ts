import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CremTabItemComponent,
  CremTabsComponent,
  LoaderModule,
  ModalModule,
  CremEmptyStateComponent,
} from '@mango/ui-shared/lib-ui-elements';
import { searchResultsComponent } from './search-results.component';
import { DxDataGridModule, DxTabPanelModule } from 'devextreme-angular';
import { MatDividerModule } from '@angular/material/divider';
import { QuickSearchService } from '../../services/quick-search.service';

@NgModule({
  declarations: [searchResultsComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxTabPanelModule,
    LoaderModule,
    ModalModule,
    MatDividerModule,
    CremTabsComponent,
    CremTabItemComponent,
    CremEmptyStateComponent,
  ],
  providers: [QuickSearchService],
  exports: [searchResultsComponent],
  bootstrap: [],
})
export class searchResultsModule {}
