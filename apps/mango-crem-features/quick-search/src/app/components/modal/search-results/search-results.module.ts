import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoaderModule, ModalModule } from '@mango/ui-shared/lib-ui-elements';
import { searchResultsComponent } from './search-results.component';
import { DxDataGridModule, DxTabPanelModule  } from 'devextreme-angular';
import { MatDividerModule } from '@angular/material/divider';
import { QuickSearchService } from '../../../services/quick-search.service';

@NgModule({
  declarations: [searchResultsComponent],
  imports: [
    CommonModule,
    DxDataGridModule,
    DxTabPanelModule,
    LoaderModule,
    ModalModule,
    MatDividerModule
  ],
  providers: [
    QuickSearchService
  ],
  exports: [searchResultsComponent],
  bootstrap: [],
})

export class searchResultsModule {}
