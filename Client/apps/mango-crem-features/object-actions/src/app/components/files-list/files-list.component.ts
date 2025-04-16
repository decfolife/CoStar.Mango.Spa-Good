import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {
  FileItem,
  FilesService,
} from '@files-list/shared/services/files.service';
import {
  PageHeaderComponent,
  ButtonModule,
} from '@mango/ui-shared/lib-ui-elements';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { ContactPreferences } from 'libs/data-models/lib-data-models/src/lib/models/contact.interface';
import {
  DxFileManagerComponent,
  DxFileManagerModule,
} from 'devextreme-angular/ui/file-manager';
import { Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'mango-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.scss'],
  standalone: true,
  imports: [PageHeaderComponent, ButtonModule, DxFileManagerModule],
})
export class FilesListComponent implements OnInit, OnDestroy {
  objectTypeId: number;
  objectId: number;
  objectName: string;
  objectType: string;
  subs: Subscription = new Subscription();
  subs2: Subscription = new Subscription();
  contactPrefs: ContactPreferences;
  dateFormat = 'MM/dd/yyyy';
  fileItems: FileItem[];
  selectedFolderId: number;
  selectedFolderPath: string;
  rootPath: string;
  rootFolderId: number;
  folderList: any[];
  fileDetItems: [];
  rootFolderName: string;
  testData: any;
  public fileItemsTemp$: Observable<FileItem[]>;
  @ViewChild(DxFileManagerComponent, { static: false })
  fileManager: DxFileManagerComponent;

  constructor(
    private route: ActivatedRoute,
    private facade: MangoAppFacade,
    private filesService: FilesService
  ) {
    this.objectTypeId = Number(this.route.snapshot.queryParamMap.get('otid'));
    this.objectId = Number(this.route.snapshot.queryParamMap.get('oid'));

    this.getFoldersList();
  }

  async ngOnInit(): Promise<void> {
    this.subs.add(
      this.route.params.subscribe((params) => {
        const queryParams = this.toLowerParams(this.route.snapshot.queryParams);
        this.getTitle(this.objectId, this.objectTypeId);
      })
    );
    this.getFoldersList();
    this.getUserprefs();
  }

  getFoldersList() {
    this.subs.add(
      this.filesService
        .getFolderList(this.objectTypeId, this.objectId)
        .subscribe((response) => {
          if (response.success) {
            this.fileItems = response.data.items;
            this.rootFolderName = response.data.name;
            this.rootFolderId = response.data.folderId;
            this.rootPath = response.data.filePath;
          }
        })
    );
  }

  getUserprefs() {
    this.subs.add(
      this.facade.contactRecord$.subscribe(
        (contactRecord) => (this.contactPrefs = contactRecord.preferences)
      )
    );
    this.dateFormat = this.contactPrefs.contactDatesEU
      ? 'dd.MM.yyyy hh:mm:ss a'
      : 'MM/dd/yyyy hh:mm:ss a';
  }

  getTitle(objectID, objectTypeID) {
    this.filesService
      .getObjectName(objectID, objectTypeID)
      .subscribe((objNameresponse) => {
        if (objNameresponse.success) {
          this.objectType = objNameresponse.data[0].objectType;
          this.objectName = objNameresponse.data[0].objectName;
        }
      });
  }

  private toLowerParams(params: Params): Params {
    const lowerParams: Params = {};
    for (const key in params) {
      lowerParams[key.toLowerCase()] = params[key];
    }
    return lowerParams;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  clearFilters() {}

  onItemRenaming(e) {
    let newName = e.newName;
    let fileID = e.item.dataItem.isDirectory
      ? e.item.dataItem.folderId
      : e.item.dataItem.fileId;
    let itemType = e.item.dataItem.isDirectory ? 'Folder' : 'File';
    this.filesService.renameItem(newName, fileID, itemType).subscribe((res) => {
      console.log('rename res', res);
    });
  }

  onDirectoryChanged(e) {
    if (e.directory.dataItem) {
      this.selectedFolderPath = e.directory.dataItem.filePath;
      this.selectedFolderId = e.directory.dataItem.folderId;
    } else {
      this.selectedFolderId = this.rootFolderId;
      this.selectedFolderPath = this.rootPath;
    }
  }

  onItemMoving(e) {
    let itemToMove = e.item.dataItem;
    let destinationFolderId;
    if (e.destinationDirectory.dataItem)
      destinationFolderId = e.destinationDirectory.dataItem.folderId;
    else destinationFolderId = this.rootFolderId;
    this.filesService
      .moveFile(
        itemToMove.isDirectory ? 'Folder' : 'File',
        itemToMove.isDirectory ? itemToMove.folderId : itemToMove.fileId,
        destinationFolderId
      )
      .subscribe((res) => {
        console.log('move res', res);
      });
  }

  onItemDeleting(e) {
    let itemToDelete = e.item.dataItem;
    this.filesService
      .deleteItem(
        itemToDelete.fileId,
        itemToDelete.isDirectory ? 'Folder' : 'File'
      )
      .subscribe((res) => {
        console.log('delete res', res);
      });
  }

  fileManager_onSelectionChanged(e) {
    if (e.selectedItems && e.selectedItems.length > 0) {
      this.selectedFolderId = e.selectedItems[0].dataItem.folderId;
      this.selectedFolderPath = e.selectedItems[0].dataItem.filePath;
    }
  }
  onFileUploading(e) {
    if (this.selectedFolderId == undefined || this.selectedFolderId == null) {
      this.selectedFolderId = this.rootFolderId;
    }
    if (
      this.selectedFolderPath == undefined ||
      this.selectedFolderPath == null
    ) {
      this.selectedFolderPath = this.rootPath;
    }

    this.uploadFile(
      'File',
      e.fileData.name,
      this.selectedFolderId,
      this.selectedFolderPath,
      e.fileData.size
    );
  }

  uploadFile(
    fileType: string,
    fileName: string,
    folderId: number,
    filePath: string,
    fileSize: number
  ) {
    this.filesService
      .uploadFile(
        fileType,
        this.objectTypeId,
        this.objectId,
        folderId,
        fileName,
        filePath,
        fileType == 'Folder' ? fileName : 'File Descr',
        'Identifier_N',
        'Comments_n',
        fileSize,
        0,
        fileType == 'Folder' ? '' : fileName,
        0,
        1
      )
      .subscribe((res) => {
        console.log('res', res);
      });
  }

  onDirectoryCreating(e) {
    if (this.selectedFolderId == undefined || this.selectedFolderId == null) {
      this.selectedFolderId = this.rootFolderId;
    }
    if (
      this.selectedFolderPath == undefined ||
      this.selectedFolderPath == null
    ) {
      this.selectedFolderPath = this.rootPath;
    }
    this.uploadFile(
      'Folder',
      e.name,
      this.selectedFolderId,
      this.selectedFolderPath + e.name + '/',
      0
    );
  }
}
