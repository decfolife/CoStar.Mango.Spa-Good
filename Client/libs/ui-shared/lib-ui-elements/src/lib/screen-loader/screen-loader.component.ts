import { Component, Input } from '@angular/core';

@Component({
  selector: 'crem-screen-loader',
  templateUrl: './screen-loader.component.html',
  styleUrls: ['./screen-loader.component.scss'],
})
/**
 * Creates a loading overlay based on the state manager (NgRx)
 * @class ScreenLoadingComponent
 * @implements {OnInit}
 */
export class ScreenLoaderComponent {

  /**
   * Show/hide the component using classes
   *
   * @type {boolean}
   * @memberof ScreenLoaderComponent
   */
  @Input() loading: boolean;
  /**
   * mode 'light' or 'dark'
   *
   * @type {string}
   * @memberof ScreenLoaderComponent
   */
  @Input() color: string;
  /**
   * show/hides the element
   *
   * @memberof ScreenLoaderComponent
   */
  @Input() showLogo = true;
  /**
   * Under the logo, company's subdivision or tagline
   *
   * @type {string}
   * @memberof ScreenLoaderComponent
   */
  @Input() tagline: string;
  /**
   * show/hides the graphic element
   *
   * @memberof ScreenLoaderComponent
   */
  @Input() showSpinner = true;
  /**
   * shows under the tagline, it can be used to replace the spinner for text Eg. 'Loading...'
   *
   * @type {string}
   * @memberof ScreenLoaderComponent
   */
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
