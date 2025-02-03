import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizeHtmlPipe } from './sanitizeHtml.pipe';
import { SlugifyPipe } from './slugify.pipe';

@NgModule({
  declarations: [SanitizeHtmlPipe, SlugifyPipe],
  imports: [CommonModule],
  exports: [SanitizeHtmlPipe, SlugifyPipe],
})
export class CremPipesModule {}
