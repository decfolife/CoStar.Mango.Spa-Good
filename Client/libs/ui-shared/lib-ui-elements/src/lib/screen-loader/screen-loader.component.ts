import { Component, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Template } from 'devextreme/core/templates/template';

@Component({
  /**
   * Component Selector
   */
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'crem-screen-loader',
  templateUrl: './screen-loader.component.html',
  styleUrls: ['./screen-loader.component.scss'],
})
/**
 * Creates a loading overlay based on the state manager (NgRx)
 * @class ScreenLoadingComponent
 * @implements {OnInit}
 * @param {boolean} loading: Show/hide the component using classes
 * @param {String} color: mode 'light' or 'dark'
 * @param {boolean} showLogo: show/hides the element
 * @param {String} tagline: Under the logo, company's subdivision or tagline
 * @param {string} text: shows under the tagline, it can be used to replace the spinner for text Eg. 'Loading...'
 * @param {boolean} showSpinner: show/hides the element
 */
export class ScreenLoaderComponent {

  @Input() loading: boolean;
  @Input() color: string;
  @Input() showLogo = true;
  @Input() tagline: string;
  @Input() showSpinner = true;
  @Input() text: string;

  public getCssClasses() {
    return {
      'loading-screen': true,
      fullscreen: true,
      light: this.color === 'light',
      dark: this.color === 'dark',
      gray: this.color === 'gray',
      loading: this.loading,
      loaded: !this.loading,
    }
  }
}
