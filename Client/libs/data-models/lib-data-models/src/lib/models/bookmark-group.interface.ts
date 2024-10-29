import { Bookmark } from './bookmark.interface';

export class BookmarkGroup {
  constructor(
    public objectTypeId: number,
    public objectTypeName: string,
    public bookmarks: Bookmark[]
  ) {}
}
