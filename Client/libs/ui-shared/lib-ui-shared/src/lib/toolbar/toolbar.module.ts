import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ToolbarComponent } from './toolbar.component';
import { BookmarksModule } from '@mango/ui-shared/lib-ui-elements';
import { EnvInfoChipModule } from '../env-info-chip/env-info-chip.module';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    BookmarksModule,
    MatToolbarModule,
    EnvInfoChipModule
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule { }
