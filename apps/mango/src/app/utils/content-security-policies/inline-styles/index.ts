import { NgModule } from '@angular/core';
import { CustomStylesHost } from './shared_styles_host';
import { ɵDomSharedStylesHost } from '@angular/platform-browser';

/**
 * CSP nonce value is injected into the DOM via a meta tag. This class
 * provides a custom implementation of the `ɵSharedStylesHost` that
 * adds the nonce to all style tags.
 * It also removes the meta tag from the DOM after the nonce has been
 * extracted.
 * This is a solution for Angular 15.x, which does not support the
 * `nonce` attribute on style tags.
 * @export CSPModuleInlineStyles
 */
@NgModule({
  providers: [
    { provide: 'cspMetaSelector', useValue: 'meta[name="CSP-NONCE"]' },
    { provide: ɵDomSharedStylesHost, useClass: CustomStylesHost },
  ],
})
export class CSPModuleInlineStyles {}