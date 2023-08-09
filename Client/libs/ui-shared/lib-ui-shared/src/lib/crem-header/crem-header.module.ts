import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CremHeaderComponent } from './crem-header.component';

@NgModule({
  declarations: [CremHeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [CremHeaderComponent]
})
export class CremHeaderModule { }
