import { LibUiSharedModule } from '@mango/ui-shared/lib-ui-shared';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { PasswordResetRequestComponent } from './password-reset-request.component';
import { CardModule } from '@mango/ui-shared/lib-ui-elements';
import { IconModule, TextFieldModule } from '@mango/ui-shared/cosmos';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordResetRequestRoutingModule } from './password-reset-request-routing.module';

@NgModule({
  declarations: [PasswordResetRequestComponent],
  imports: [
    PasswordResetRequestRoutingModule,
    CommonModule,
    CardModule,
    TextFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    DxTextBoxModule,
    LibUiSharedModule
  ],
  exports: [PasswordResetRequestComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [PasswordResetRequestComponent],
})
export class PasswordResetRequestModule {
}
