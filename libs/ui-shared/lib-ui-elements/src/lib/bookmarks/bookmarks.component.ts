/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BookmarkGroup } from '@mango/data-models/lib-data-models';
import { environment } from 'apps/mango/src/environments/environment.local';

@Component({
  selector: 'crem-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent {
  @ViewChild('recentDrawer', { static: true }) recentDrawer: MatDrawer;
  @Input() bookmarkGroups: BookmarkGroup[] | null = null;
  @Input() useRouterOutletTag: boolean;

  constructor(private router: Router) {}

  toggleBookmarkDrawer(){
    this.recentDrawer.toggle();
  }

  private goToBookmarkUrl(objectTypeId: number, bm: any){
    if(environment.isRestful) {
      if(objectTypeId === 7) { null }
      else {
        this.router.navigate(
          ['crem/forms/render-form'],
          {
            queryParams: { fid: 312, oid: bm.objectID, otid: bm.objectTypeID, ottid: bm.objectTypeTypeID }
          });
      }
    }
    else {
      if(objectTypeId === 7) { //Report
        window.open(bm.path);
      }else {
        document.location.href = bm.path;
      }
    }
  }
}