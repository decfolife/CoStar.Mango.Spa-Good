import { LibUiSharedModule } from '@mango/ui-shared/lib-ui-shared';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AdminModule } from '../admin/admin.module';

import { IndexComponent } from './index.component';
import { IndexRoutingModule } from './index.routing.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule, 
    AdminModule, 
    IndexRoutingModule, 
    LibUiSharedModule,
    ToastrModule.forRoot({
      timeOut: 8000,
      positionClass: 'toast-top-right',
      progressBar: true,
      closeButton: false
    }),
  ],
  providers: [],
  bootstrap: [IndexComponent],
})
export class IndexModule {}
