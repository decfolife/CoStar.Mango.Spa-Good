import { Component, Input, OnInit } from '@angular/core';

import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { mdiChevronDown, mdiChevronRight } from '@mdi/js';
import { LeftNavService } from './left-nav.service';

export interface CurrentItem {
  Id: string;
  Text: string;
  Href: string;
  Children?: CurrentItem[];
}

@Component({
  selector: 'crem-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.scss'],
  providers: [LeftNavService],
})
export class LeftNavComponent {
  currentItems;

  itemSource = new MatTreeNestedDataSource<CurrentItem>();
  treeControl: NestedTreeControl<CurrentItem>;
  mdiChevronRight = mdiChevronRight;
  mdiChevronDown = mdiChevronDown;
  svg: string = mdiChevronRight;

  constructor(public leftNavService: LeftNavService) {
    this.treeControl = new NestedTreeControl<CurrentItem>(this._getChildren);

    leftNavService.GetMenu().subscribe((results) => {
      this.currentItems = results;
      //  this.currentItems.map((currentItem:CurrentItem)=>{
      //   currentItem = {
      //     Id : (currentItem as any).Id,
      //     Text: (currentItem as any).Text,
      //     Href: (currentItem as any).Href,
      //     Children: (currentItem as any).Children.length>0 ? (currentItem as any).Children : null,

      //   };
      this.itemSource.data = this.currentItems;
      console.log(this.currentItems);
      console.log(this.treeControl);
      console.log(this.itemSource.data);
    });
  }
  hasChild = (_: Number, currentItem: CurrentItem) =>
    currentItem.Children.length > 0;

  _getChildren = (currentItem: CurrentItem) => currentItem.Children;
}
