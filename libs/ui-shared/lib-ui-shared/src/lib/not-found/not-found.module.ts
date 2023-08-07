import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  imports: [MatIconModule],
  declarations: [NotFoundComponent],
  exports: [NotFoundComponent]
})
export class NotFoundModule {}
