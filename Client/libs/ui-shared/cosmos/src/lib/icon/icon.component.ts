/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'cs-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class IconComponent implements OnInit {
  iconCat: string;
  iconArray: string[];
 @Input() href: string;

  @Input() fill: '#0559b3' | '#fff' | '#000';
  @Input() icon: string;
  iconClass: string[];
  ngOnInit() {
    this.iconClass = [`icon-${this.icon}`, `icon-${this.icon}-dims`];
    if (this.icon !== null || this.icon !== undefined) {
      this.iconArray = this.icon.split('-');
      this.iconCat = this.iconArray[0];
    }
    this.href = `./icons/${this.iconCat}-icons.svg#${this.icon}`;
  }
}
