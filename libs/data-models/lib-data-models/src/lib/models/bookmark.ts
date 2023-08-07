export class Bookmark {

  constructor(
    public id: number,
    public objectID: number,
    public objectTypeID: number,
    public objectTypeTypeID: number,
    public objectType: String,
    public isFavorite: Boolean,
    public isRecent: Boolean,
    public name: String,
    public path: String,
  ) {}

}