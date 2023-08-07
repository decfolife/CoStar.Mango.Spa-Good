import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteIconComponent } from './favorite-iconcomponent';


@NgModule({
  declarations: [FavoriteIconComponent],
  imports: [
    CommonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [FavoriteIconComponent],
})
export class FavoriteIconModule {}
