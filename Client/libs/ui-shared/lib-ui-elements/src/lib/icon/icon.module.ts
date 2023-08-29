import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';

// CSP configuration: Don't do inline styles (no default nonce support), import them manually
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

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
