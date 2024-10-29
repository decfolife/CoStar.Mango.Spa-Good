import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BreadCrumb } from '@mango/data-models/lib-data-models';

@Component({
  selector: 'display-breadcrumbs',
  templateUrl: './display-breadcrumbs.component.html',
  styleUrls: ['./display-breadcrumbs.component.scss'],
})
export class DisplayBreadcrumbsComponent {
  @Input() breadcrumbs: BreadCrumb[];
  @Output() navigateToBreadcrumb = new EventEmitter();

  public delineator = '»';

  breadcrumbClicked(breadcrumb: BreadCrumb) {
    this.navigateToBreadcrumb.emit(breadcrumb);
  }
}
