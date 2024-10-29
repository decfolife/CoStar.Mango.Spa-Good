import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CremCurrentObjectTextComponent } from './crem-current-object-text.component';

@NgModule({
  declarations: [CremCurrentObjectTextComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [CremCurrentObjectTextComponent]
})
export class CremCurrentObjectTextModule { }
