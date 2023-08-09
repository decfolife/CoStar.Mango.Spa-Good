import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    MatMenuModule,
    FontAwesomeModule
  ],
  exports: [NavbarComponent]
})
export class NavbarModule { }