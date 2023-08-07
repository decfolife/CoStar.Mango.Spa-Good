import { Injector, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftNavComponent } from './left-nav.component';

import { MatTreeModule } from '@angular/material/tree';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LeftNavService } from './left-nav.service';
import { IconModule } from '../icon';

@NgModule({
  declarations: [LeftNavComponent],
  imports: [CommonModule, MatTreeModule, MatSidenavModule, IconModule],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [LeftNavService],
  exports: [LeftNavComponent],
})
export class LeftNavModule {}
