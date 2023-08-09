import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { IconComponent } from './icon.component';

@NgModule({
  declarations: [IconComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [IconComponent],
})
export class IconModule {
  constructor() {
    import('@fortawesome/free-regular-svg-icons')
  }
}
