/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconComponent } from './icon.component';
import { DomSanitizer } from '@angular/platform-browser';


@NgModule({
  declarations: [IconComponent],
  imports: [CommonModule],
  exports: [IconComponent],
})
export class IconModule{
 constructor(private sanitizer: DomSanitizer){
   this.sanitizer.bypassSecurityTrustResourceUrl('./icons/brand-icons.svg')
 }
}
