import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CremShareViewPopupComponent } from './crem-share-view-popup.component';
import { DxDataGridModule, DxPopupModule, DxToolbarModule } from 'devextreme-angular';
import { CremShareViewPopupService } from 'libs/core-shared/src/lib/services/list-page-services/crem-share-view-popup.service';


@NgModule({
  declarations: [CremShareViewPopupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,  
    DxDataGridModule, 
    DxPopupModule,
    DxToolbarModule,
  ],
  exports: [CremShareViewPopupComponent],
  providers: [CremShareViewPopupService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [CremShareViewPopupComponent],
})
export class CremShareViewPopupModule {}