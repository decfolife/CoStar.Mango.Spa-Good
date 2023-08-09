import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ListErrorsComponent } from './list-errors.component';

@NgModule({
  declarations: [ListErrorsComponent],
  imports: [CommonModule, RouterModule],
  exports: [ListErrorsComponent],
})
export class ListErrorsModule {}
