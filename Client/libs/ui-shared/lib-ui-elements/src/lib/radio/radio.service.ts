import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CremRadioService {
  private _selected$ = new BehaviorSubject<any>(null);
  private _disabled$ = new BehaviorSubject<boolean>(false);
  private _name$ = new BehaviorSubject<string>(null);

  selected$: Observable<any> = this._selected$.asObservable();
  disabled$: Observable<boolean> = this._disabled$.asObservable();
  name$: Observable<string> = this._name$.asObservable();

  select(value: any): void {
    this._selected$.next(value);
  }

  setDisabled(value: boolean): void {
    this._disabled$.next(value);
  }

  setName(name: string): void {
    this._name$.next(name);
  }
}
