import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CostarSuiteHeaderComponent } from './costar-suite-header.component';

@NgModule({
  declarations: [CostarSuiteHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [CostarSuiteHeaderComponent]
})
export class CostarSuiteHeaderModule { }
