import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";

@Injectable()
export class CremRadioService {
  selected$ = new ReplaySubject<any>(1)
  disabled$ = new ReplaySubject<boolean>(1)
  name$ = new ReplaySubject<string>(1)

  select(value: any): void {
    this.selected$.next(value)
  }

  setDisabled(value: boolean): void {
    this.disabled$.next(value)
  }

  setName(name: string): void {
    this.name$.next(name)
  }
}