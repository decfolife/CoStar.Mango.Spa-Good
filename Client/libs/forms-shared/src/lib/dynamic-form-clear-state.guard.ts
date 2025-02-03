import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { DynamicFormsFacade } from '@forms/+state/dynamic-forms.facade';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormClearStateGuard implements CanActivate {
  constructor(
    private readonly store: Store,
    private readonly actions$: Actions,
    private readonly router: Router,
    private dynamicFormsFacade: DynamicFormsFacade
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.dynamicFormsFacade.clearDynamicFormsState();
    return true;
  }
}
