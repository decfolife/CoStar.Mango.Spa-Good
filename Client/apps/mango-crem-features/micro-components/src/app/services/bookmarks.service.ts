import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Bookmark } from 'libs/data-models/lib-data-models/src/lib/models/bookmark';
import { BookmarkGroup } from 'libs/data-models/lib-data-models/src/lib/models/bookmarkGroup';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../../mango/src/environments/environment.local';
import { EndpointService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';



@Injectable({providedIn: 'root'})

export class BookmarksService  extends EndpointService{
  //Reports = 7
  //Projects = 1
  //Store = 2
  //Center = 3
  //Lease = 4
  //The order of the bookmark groups will be in the same order as the object type ids
  //in the bookmarkGroupsObjectTypeIdList array.
  private readonly bookmarkGroupsObjectTypeIdList: number[] = [7, 2, 4, 1, 3]

  private bookmarks: Bookmark[] = null;
  private redirectorLinks: any[] = null;

  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  createBookmarkList(): Observable<BookmarkGroup[]> {
    return combineLatest([
      this.getObjectTypeNames(this.bookmarkGroupsObjectTypeIdList),
       this.getBookmarks(true, true),
       this.getRedirectorLinkList(),
      this.getUserPreferenceHidePremise()
    ]).pipe(map (([objectTypeNameData, bookmarksData, redirectorLinksData,userPreferenceHidePremise ]) => {
      let bookmarkGroupList = [];
      let hidePremise = userPreferenceHidePremise.data
      this.redirectorLinks = redirectorLinksData.data;

      //If hidePremise is true do not add id 2(Store) to the bookmarkGroupList by filtering out the id
      let filteredBookmarkGroupsObjectTypeIdList = hidePremise ? 
          this.bookmarkGroupsObjectTypeIdList.filter(id => id !== 2) : 
          this.bookmarkGroupsObjectTypeIdList

      let reports = bookmarksData.data.reportsData.map(rd => new Bookmark(rd.reportID, null, null, null, rd.title, true, false, 
        rd.reportDesc, rd.reportURL));

      this.bookmarks = bookmarksData.data.bookmarksData.map(bd => new Bookmark(bd.bookmarkID, bd.objectID, bd.objectTypeID, bd.objectTypeTypeID, bd.objectType, true, false, 
        bd.bookmarkText, this.findUrl(bd.objectID, bd.objectTypeID, bd.objectTypeTypeID)));

      //Create the data for the bookmark groups
      if(bookmarksData.data) {
        filteredBookmarkGroupsObjectTypeIdList.forEach(id => {
            let objectTypeName = objectTypeNameData.data.find(otnd => otnd.objectTypeId === id).objectTypeName;
            let filteredBookmarks = id === 7 ? reports : this.filterBookmarks(objectTypeName);
            let favGroup = new BookmarkGroup(id, objectTypeName, filteredBookmarks);
            bookmarkGroupList.push(favGroup)
        });

        return bookmarkGroupList
      }
    }));  
  }

  getBookmarks(isbookmarks: boolean, isreports: boolean): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.bookmarks}Bookmarks/GetBookmarksAndReportsData/${isbookmarks}/${isreports}`;
      return this.callHttpGet(url, 'getBookmarks')
    }

    const url = environment.appUrls.bookmarks + 'GetBookmarksAndReportsData';
    return this.callHttpPost(url, 'getBookmarks', { isbookmarks, isreports })
  }

  getRedirectorLinkList(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.bookmarks}Bookmarks/GetRedirectorLinkList`;
      return this.callHttpGet(url, 'getRedirectorLinkList')
    }

    const url = `${environment.appUrls.bookmarks}GetRedirectorLinkList`;
    return this.callHttpPost(url, 'getRedirectorLinkList', null)
  }

  getObjectTypeNames(objectTypeIds: number[]): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.bookmarks}Bookmarks/GetObjectTypeNames`;
      return this.callHttpPost(url, 'getObjectTypeNames',  { objectTypeIds })
    }

    const url = environment.appUrls.bookmarks + 'GetObjectTypeNames';
    return this.callHttpPost(url, 'getObjectTypeNames', { objectTypeIds })
  }

  getUserPreferenceHidePremise(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.bookmarks}Bookmarks/GetUserPreferenceHidePremise`;
      return this.callHttpGet(url, 'getUserPreferenceHidePremise')
    }
    const url = `${environment.appUrls.bookmarks}GetUserPreferenceHidePremise`;
    return this.callHttpPost(url, 'getUserPreferenceHidePremise', {})
  }

  private filterBookmarks(object_type): Bookmark[] {
    return this.bookmarks.filter(
      (itm) => itm.objectType == object_type
    );
  }

  private findUrl(objectId: number, objectTypeId: number, objectTypeTypeId: number): string {
    let found = this.redirectorLinks.find(
      x => x.objectTypeId === objectTypeId && x.objectTypeTypeId === objectTypeTypeId
    );

    found = found ?? this.redirectorLinks.find(x => x.objectTypeId === objectTypeId);

    let urlLink = found ? found.urlLink : 'not found'; 
    urlLink = urlLink
      .replace(/\[OID\]/, objectId)
      .replace(/\[OTID\]/, objectTypeId)
      .replace(/\[OTTID\]/, objectTypeTypeId);
    
    return urlLink;
  }
}

