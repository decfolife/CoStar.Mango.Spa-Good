import { Pipe, PipeTransform } from '@angular/core';

/**
 * Used to transform strings like names into safe for HTML values
 * e.g. 'Lease Template! #5' -> 'lease-template-5'
 *
 * @export
 * @class SlugifyPipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'slugify',
})
export class SlugifyPipe implements PipeTransform {
  transform(value: any): string {
    if (typeof value !== 'string') {
      console.warn('SlugifyPipe: Expected a string but received', value);
      return '';
    }
    const str = value
      .trim()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase();
    return str;
  }
}
