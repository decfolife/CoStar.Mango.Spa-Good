import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'convertPlaintextToHtml', pure: false })
export class PlaintextToHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(data): SafeHtml {
    return data.replace(/(?:\r\n|\n|\\r\\n|\\n)/g, '<br>');
  }
}