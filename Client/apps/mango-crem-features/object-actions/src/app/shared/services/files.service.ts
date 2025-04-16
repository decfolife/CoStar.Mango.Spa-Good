import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { Api } from '@mango/data-models/lib-data-models';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

export class FileItem {
  fileId: number;
  name: string;
  isDirectory: boolean;
  size?: number;
  filePath?: string;
  folderId?: number;
  identifier?: string;
  description?: string;
  comments?: string;
  createdBy?: string;
  path?: string;
  items?: FileItem[];
}

@Injectable({
  providedIn: 'root',
})
export class FilesService extends EndpointService {
  private apiUrl: string;
  private fileManagerUrl: string;

  constructor(protected http: HttpClient, facade: MangoAppFacade) {
    super(http, facade);
    this.apiUrl = UtilitiesService.getBaseApiUrl(Api.objectActions);
    this.fileManagerUrl = UtilitiesService.getBaseApiUrl(Api.fileManager);
  }

  getObjectName(objectID: number, objectTypeID: number) {
    return this.callHttpGet(
      `${this.apiUrl}objecthistory/getObjectName?OID=${objectID}&OTID=${objectTypeID}`,
      'GetObjectName'
    );
  }

  getFolderList(OTID: number, objectID: number) {
    return this.callHttpGet(
      `${this.fileManagerUrl}fileManager/getfiledetails?OTID=${OTID}&OID=${objectID}`,
      'GetFileDetails'
    );
  }

  uploadFile(
    itemType: string,
    otid: number,
    oid: number,
    parentID: number,
    name: string,
    path: string,
    description: string,
    identifier: string,
    comments: string,
    size: number,
    trackChanges: number,
    userName: string,
    prevVersionID: number,
    published: number
  ) {
    return this.callHttpPost(
      `${this.fileManagerUrl}fileManager/uploadfilefolder`,
      'UploadFileFolder',
      {
        itemType,
        otid,
        oid,
        parentID,
        name,
        path,
        description,
        identifier,
        comments,
        size,
        trackChanges,
        userName,
        prevVersionID,
        published,
      }
    );
  }

  renameItem(newName: string, fileID: number, itemType: string) {
    return this.callHttpPost(
      `${this.fileManagerUrl}fileManager/renamefilefolder`,
      'RenameFileFolder',
      { newName, fileID, itemType }
    );
  }

  moveFile(fileType: string, fileID: number, parentID: number) {
    return this.callHttpPost(
      `${this.fileManagerUrl}fileManager/movefilefolder`,
      'MoveFileFolder',
      {
        fileType,
        fileID,
        parentID,
      }
    );
  }

  deleteItem(fileID: number, fileType: string) {
    return this.callHttpDeleteWithBody(
      `${this.fileManagerUrl}fileManager/deletefilefolder`,
      'DeleteFileFolder',
      {
        fileID,
        fileType,
      }
    );
  }

  getFileItems(): FileItem[] {
    // console.log(
    //   'URL',
    //   'http://localhost:54804/api/fileManager/uploadFiles',
    //   'UploadFiles'
    // );
    return []; //'fileItems_New;
  }
}
