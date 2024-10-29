import { LibUiSharedModule } from '@mango/ui-shared/lib-ui-shared';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';
import { CardModule } from '@mango/ui-shared/lib-ui-elements';
import { TextFieldModule } from '@mango/ui-shared/cosmos';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { DxPopoverModule } from 'devextreme-angular';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    CardModule,
    ReactiveFormsModule,
    ResetPasswordRoutingModule,
    LibDataModelsModule,
    LibUiSharedModule,
    TextFieldModule,
    MatButtonModule,
    FormsModule,
    DxPopoverModule,
    MatPasswordStrengthModule,
  ],
  exports: [ResetPasswordComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [ResetPasswordComponent],
})
export class ResetPasswordModule {}
