import { ContactSelectModule } from './../contact-select/contact-select.module';
import { DxTextBoxModule } from 'devextreme-angular/ui/text-box';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { CardModule } from '@mango/ui-shared/lib-ui-elements';
import { IconModule, TextFieldModule } from '@mango/ui-shared/cosmos';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    CardModule,
    MatCardModule,
    TextFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    IconModule,
    DxTextBoxModule,
    ContactSelectModule
  ],
  exports: [LoginComponent],
  providers: [],
  bootstrap: [LoginComponent],
})
export class LoginModule {
}
