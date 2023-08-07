import {
  NgModule,
  Component,
  ViewChild,
  Input,
  ContentChildren,
  TemplateRef,
} from '@angular/core';

import { DxDrawerComponent } from 'devextreme-angular';
import { DrawerService, Item } from './drawer.service';

@Component({
  selector: 'crem-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent {
  @ViewChild(DxDrawerComponent, { static: false }) drawer: DxDrawerComponent;
  @Input() navigation: Item[];

  @ContentChildren('items', { descendants: true }) items: TemplateRef<any>;
  showSubmenuModes: string[] = ['slide', 'expand'];
  positionModes: string[] = ['left', 'right'];
  showModes: string[] = ['push', 'shrink', 'overlap'];
  text: string;
  selectedOpenMode: string = 'shrink';
  selectedPosition: string = 'left';
  selectedRevealMode: string = 'slide';
  isDrawerOpen: Boolean = true;
  elementAttr: any;

  constructor(service: DrawerService) {
    this.text = service.getContent();
    this.navigation = service.getNavigationList();
  }

  toolbarContent = [
    {
      widget: 'dxButton',
      location: 'before',
      options: {
        icon: 'menu',
        onClick: () => (this.isDrawerOpen = !this.isDrawerOpen),
      },
    },
  ];
}
