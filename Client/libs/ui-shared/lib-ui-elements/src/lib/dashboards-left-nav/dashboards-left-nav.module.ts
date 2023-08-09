import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DashboardsLeftNavComponent } from './dashboards-left-nav.component';
import {MatExpansionModule} from '@angular/material/expansion'



@NgModule({
  declarations: [DashboardsLeftNavComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatExpansionModule
  ],
  exports: [DashboardsLeftNavComponent]
})
export class DashboardsLeftNavModule {
}
