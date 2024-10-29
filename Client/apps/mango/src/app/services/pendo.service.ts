import { Inject, Injectable } from '@angular/core';
import { CSP_NONCE } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PendoService {
  private _nonce: string;

  constructor(@Inject(CSP_NONCE) private nonce: string) {
    this._nonce = nonce;
  }

  initialize(user: any, account: any): void {
    if (typeof (window as any).pendo !== 'undefined') {
      (window as any).pendo.initialize({
        visitor: user,
        account: account,
        inlineStyleNonce: this._nonce,
      });
    } else {
      console.error('Pendo is not loaded.');
    }
  }
}
