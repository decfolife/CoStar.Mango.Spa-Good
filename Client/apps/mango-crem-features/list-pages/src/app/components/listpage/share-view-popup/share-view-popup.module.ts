import { LibUiSharedModule } from '@mango/ui-shared/lib-ui-shared';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareViewPopupComponent } from './share-view-popup.component';

@NgModule({
  declarations: [ShareViewPopupComponent],
  imports: [CommonModule, ReactiveFormsModule, LibUiSharedModule, FormsModule],
  exports: [ShareViewPopupComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [ShareViewPopupComponent],
})
export class ShareViewPopupModule {}
