import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule, ModalModule } from '@mango/ui-shared/lib-ui-elements';
import { EmulateUserPopupComponent } from './emulate-user-popup.component';
import { EmulateUserAppModule } from 'apps/mango-crem-features/micro-components/src/app/emulate-user/emulate-user.module';

@NgModule({
  declarations: [EmulateUserPopupComponent],
  imports: [
    CommonModule,
    ModalModule,
    EmulateUserAppModule,
    ButtonModule
  ],
  exports: [EmulateUserPopupComponent],
  bootstrap: [],
})
export class EmulateUserPopupModule {}
