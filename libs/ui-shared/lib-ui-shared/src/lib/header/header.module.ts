import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '@mango/ui-shared/lib-ui-elements'
import { EmulateUserPopupModule } from './emulate-user-popup/emulate-user-popup.module';


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    EmulateUserPopupModule,
    RouterModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule, // TODO: Check if this is being used, this is being replaced with CREM IconModule OR crem-buttom
    IconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatMenuModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
