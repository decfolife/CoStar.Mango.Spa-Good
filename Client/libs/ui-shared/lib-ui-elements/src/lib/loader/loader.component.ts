import { Component, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Template } from 'devextreme/core/templates/template';

@Component({
  /**
   * Component Selector
   */
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'crem-loader',
  template: `<div class="spinner-3"></div>`,
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {}
