import { Component } from '@angular/core';
import { Link } from '@mango/data-models/lib-data-models';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'index-root',
  templateUrl: './index.component.html',
})
export class IndexComponent {
  links: Link[];

  constructor(public service: SidenavService) {
    this.links = service.getNavigationList();
  }
}
