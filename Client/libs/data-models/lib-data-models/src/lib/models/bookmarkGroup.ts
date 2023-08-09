import { Bookmark } from "./bookmark";

export class BookmarkGroup {
  constructor(
    public objectTypeId: number,
    public objectTypeName: string,
    public bookmarks: Bookmark[],
  ) {}
}