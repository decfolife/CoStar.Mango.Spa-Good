import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarComponent } from './navbar.component';

// TODO: The 'crem-icon' should be utilized instead of directly using the FontAwesome library.
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

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