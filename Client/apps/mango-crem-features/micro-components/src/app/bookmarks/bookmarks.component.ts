import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BookmarksService } from 'apps/mango-crem-features/micro-components/src/app/services/bookmarks.service';
import { BookmarkGroup } from 'libs/data-models/lib-data-models/src/lib/models/bookmarkGroup';
import { BookmarksComponent } from 'libs/ui-shared/lib-ui-elements/src/lib/bookmarks/bookmarks.component';

@Component({
  selector: 'mango-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss'],
})
export class BookmarksAppComponent implements AfterViewInit {
  @ViewChild('cremBookmark', { static: true })
  cremBookmarkComponent: BookmarksComponent;

  bookmarkGroups: BookmarkGroup[] = null;

  constructor(private bookmarksService: BookmarksService) {}

  ngAfterViewInit(): void {
    window.addEventListener(
      'ToogleBookmarkDrawer',
      this.openCloseBookmarkDrawer.bind(this)
    );
  }

  private openCloseBookmarkDrawer() {
    if (
      !this.cremBookmarkComponent.recentDrawer.opened &&
      this.bookmarkGroups === null
    ) {
      this.bookmarksService.createBookmarkList().subscribe((res) => {
        this.bookmarkGroups = res;
      });
    }

    this.cremBookmarkComponent.toggleBookmarkDrawer();
  }
}
