import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
;
import { MatSidenavModule } from '@angular/material/sidenav';
import { SideNavService } from './side-nav.service';
import { SideNavComponent } from './side-nav.component';


@NgModule({
  declarations: [SideNavComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
  ],
  exports: [SideNavComponent],
  providers: [SideNavService]
})
export class SideNavModule {
}
