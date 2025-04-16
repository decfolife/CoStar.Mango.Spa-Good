import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { MangoAppFacade } from '../+state/app/app.facade';
import { filter, take, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

/**
 * Create Title using the official TitleStrategy
 * @see https://angular.dev/api/router/TitleStrategy
 *
 * @export
 * @class TemplatePageTitleStrategy
 * @extends {TitleStrategy}
 */
@Injectable({ providedIn: 'root' })
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title, public facade: MangoAppFacade) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);

    (title ? of(title) : this._getTitleFromBreadcrumbs()).subscribe((title) => {
      this.title.setTitle(
        `${title ? title + ' - ' : ''}CoStar Real Estate Manager`
      );
    });
  }

  /**
   * Generates a title from breadcrumbs.
   * This should be used only as a last resort.
   * Prefer defining the page title in the `app-routing` module instead.
   *
   * @returns {Observable<string>} An observable that emits the generated title.
   * @memberof TemplatePageTitleStrategy
   */
  _getTitleFromBreadcrumbs(): Observable<string> {
    return this.facade.breadcrumbs$.pipe(
      filter(
        (breadcrumbs) => breadcrumbs !== null && breadcrumbs !== undefined
      ),
      take(1), // Automatically closes the sub after getting the breadcrumb's value
      map((breadcrumbs) => breadcrumbs.map((e) => e.label).join(' ')),
      catchError((error) => {
        console.warn('Error generating page title: ', error);
        return of('');
      })
    );
  }
}
