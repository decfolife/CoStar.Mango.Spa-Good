import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  DxButtonModule,
  DxFileManagerComponent,
  DxFileManagerModule,
  DxTemplateModule,
} from 'devextreme-angular';

import { MatDialogRef } from '@angular/material/dialog';
import {
  FILES_UPLOAD_SUCCESS_MSG,
  GENERIC_UPLOAD_ERR_MSG,
  PROJECT_TASKS_UPLOAD_EXTENSIONS,
  TASK_INFO_FILE_ACTIONS,
  TaskFileSystemItem,
  ToastState,
} from '@mango/data-models/lib-data-models';
import {
  ButtonModule,
  CremFormsModule,
  CremToastService,
  IconModule,
  InputComponent,
  LoaderModule,
  ModalModule,
} from '@mango/ui-shared/lib-ui-elements';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { TaskInfoUIService } from '@project-dashboard/services/task-info-ui.service';
import { ProjectTasksFilesUtility } from '@project-dashboard/utilities/project-task-files.utility';
import {
  ContextMenuItemClickEvent,
  ContextMenuShowingEvent,
  CurrentDirectoryChangedEvent,
  SelectionChangedEvent,
} from 'devextreme/ui/file_manager';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { delay, filter, map, switchMap, take, tap } from 'rxjs/operators';
import { AddFolderPopupComponent } from '../add-folder-popup/add-folder-popup.component';
import { FilesListComponent } from '../files-list/files-list.component';

@Component({
  selector: 'tasks-upload-files',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CremFormsModule,
    InputComponent,
    ButtonModule,
    DxTemplateModule,
    IconModule,
    LoaderModule,
    DxFileManagerModule,
    DxButtonModule,
    AddFolderPopupComponent,
    FilesListComponent,
    ModalModule,
  ],
  templateUrl: './upload-popup.component.html',
  styleUrls: ['./upload-popup.component.scss'],
})
export class UploadPopupComponent implements OnInit, OnDestroy {
  @ViewChild('fileUpload') fileUpload: ElementRef;
  @ViewChild('fileManager') fileManager: DxFileManagerComponent;

  folders$: Observable<TaskFileSystemItem[]>;
  initialPath$: Observable<string>;
  uploadFilesReady$: Observable<boolean>;
  createFolderInProgres$: Observable<boolean>;
  uploadFilesInProgres$: Observable<boolean>;
  selectedFiles$: Observable<File[]>;

  parsedFolders: TaskFileSystemItem[] = [];
  subs: Subscription[] = [];

  FILE_ACTIONS = TASK_INFO_FILE_ACTIONS;
  allowedFileExtensions: string = PROJECT_TASKS_UPLOAD_EXTENSIONS;
  toolbarSettings: any = {
    items: [],
    fileSelectionItems: [],
  };

  mainFolder: TaskFileSystemItem;

  constructor(
    private taskInfoUIService: TaskInfoUIService,
    private toastService: CremToastService,
    private dashboardService: DashboardService,
    private facade: MangoAppFacade,
    private dialogRef: MatDialogRef<UploadPopupComponent>
  ) {
    this.generateFormData = this.generateFormData.bind(this);
    this.onFileUploadSuccess = this.onFileUploadSuccess.bind(this);
    this.onFileUploadError = this.onFileUploadError.bind(this);
  }

  ngOnInit(): void {
    this.folders$ = this.taskInfoUIService.folders$;
    this.uploadFilesInProgres$ = this.taskInfoUIService.uploadFilesInProgress$;
    this.createFolderInProgres$ =
      this.taskInfoUIService.createFolderInProgress$;
    this.uploadFilesReady$ = this.taskInfoUIService.selectedFiles$.pipe(
      map((files) => !!files && files.length > 0)
    );
    this.selectedFiles$ = this.taskInfoUIService.selectedFiles$.pipe(
      filter((selectedFiles) => !!selectedFiles)
    );
    this.initialPath$ = this.facade.clientKey$.pipe(
      filter((clientKey) => !!clientKey),
      map((clientKey) => `/vpdocuments/${clientKey.toUpperCase()}`)
    );

    this.subs.push(
      this.loadFileManagerData().subscribe(),
      this.updateFileManagerTreeView().subscribe()
    );
  }

  updateFileManagerTreeView(): Observable<TaskFileSystemItem[]> {
    return this.taskInfoUIService.folders$.pipe(
      filter((folders) => !!folders && folders.length > 0),
      map((folders) =>
        ProjectTasksFilesUtility.buildTreeFromFoldersList(folders)
      ),
      switchMap((tree) => this.findTaskRootInTree(tree)),
      tap((tree) => (this.parsedFolders = tree)),
      delay(1000),
      tap((_) => this.fileManager?.instance.refresh())
    );
  }

  loadFileManagerData(): Observable<TaskFileSystemItem[]> {
    return combineLatest([
      this.facade.clientKey$,
      this.taskInfoUIService.projectId$,
    ]).pipe(
      filter(([clientKey, projectId]) => !!clientKey && !!projectId),
      switchMap(([clientKey, projectId]) =>
        this.dashboardService.getTaskFolders(clientKey, projectId)
      ),
      filter((response) => !!response && !!response.data),
      map((response) =>
        response.data.map((f) =>
          ProjectTasksFilesUtility.mapFoldersToFileSystem(f)
        )
      ),
      tap((folders) => (this.parsedFolders = folders)),
      tap((folders: TaskFileSystemItem[]) =>
        this.taskInfoUIService.folders$.next(folders)
      )
    );
  }

  onMenuOrToolbarClick(e: ContextMenuItemClickEvent): void {
    this.taskInfoUIService.selectedFolder$.next(
      e.fileSystemItem.dataItem || this.mainFolder
    );
    switch (e.itemData.name) {
      case 'add_folder':
        this.taskInfoUIService.addFolderPopupVisible$.next(true);
        break;
      case 'upload_files':
        this.fileUpload.nativeElement.click();
        break;
    }
  }

  selectionChanged(event: SelectionChangedEvent): void {
    this.taskInfoUIService.selectedFolder$.next(
      event.selectedItems[0] ? event.selectedItems[0].dataItem : this.mainFolder
    );
  }

  onDirectoryChanged(event: CurrentDirectoryChangedEvent): void {
    this.taskInfoUIService.selectedFolder$.next(
      event.directory.dataItem || this.mainFolder
    );
  }

  uploadFiles(): void {
    this.taskInfoUIService.uploadFilesInProgress$.next(true);
    this.subs.push(
      combineLatest([
        this.taskInfoUIService.selectedFiles$.pipe(take(1)),
        this.taskInfoUIService.selectedFolder$.pipe(take(1)),
        this.taskInfoUIService.taskId$.pipe(take(1)),
      ])
        .pipe(
          filter(
            ([selectedFiles, selectedFolder, taskId]) =>
              !!selectedFiles && !!selectedFolder && !!taskId
          ),
          map(this.generateFormData),
          switchMap((formData) =>
            this.dashboardService.uploadTaskFiles(formData)
          ),
          tap(this.onFileUploadSuccess)
        )
        .subscribe(() => {}, this.onFileUploadError)
    );
  }

  generateFormData([files, folder, taskId]): FormData {
    const formData: FormData = new FormData();
    files.forEach((f) => formData.append('FilesToBeUploaded', f));
    formData.append('ObjectId', taskId as any);
    formData.append('ParentFolderId', folder.folderId);
    return formData;
  }

  onFileUploadSuccess(response: any): void {
    this.taskInfoUIService.uploadFilesInProgress$.next(false);
    this.toastService.show(
      FILES_UPLOAD_SUCCESS_MSG,
      'Success',
      ToastState.SUCCESS
    );
    this.taskInfoUIService.selectedFiles$.next([]);
    this.dialogRef.close();
  }

  onFileUploadError(err: any): void {
    this.taskInfoUIService.uploadFilesInProgress$.next(false);
    this.taskInfoUIService.selectedFiles$.next([]);
    this.toastService.show(
      err?.error?.errors?.FilesToBeUploaded[0] || GENERIC_UPLOAD_ERR_MSG,
      'Error',
      ToastState.ERROR
    );
  }

  filesSelected(event: any): void {
    const files: File[] = Array.from(event.target.files);
    const filesValid = ProjectTasksFilesUtility.validateFilesToUpload(
      files,
      this.toastService
    );
    if (filesValid) {
      this.taskInfoUIService.selectedFiles$.next(files);
    }
  }

  onFolderCreated(event: any): void {
    this.subs.push(
      this.loadFileManagerData()
        .pipe(tap((_) => this.fileManager.instance.refresh()))
        .subscribe()
    );
  }

  onContextMenuShowing(e: ContextMenuShowingEvent): void {
    e.cancel =
      e.viewArea === 'itemView' || e.event.type === 'dxcontextmenu'
        ? true
        : e.cancel; // Prevents the `Files` menu item from showing the context menu
  }

  onClose(): void {
    this.taskInfoUIService.selectedFiles$.next([]);
    this.dialogRef.close();
  }

  findTaskRootInTree(
    tree: TaskFileSystemItem[]
  ): Observable<TaskFileSystemItem[]> {
    return combineLatest([
      this.facade.clientKey$,
      this.taskInfoUIService.projectId$,
    ]).pipe(
      filter(([clientKey, projectId]) => !!clientKey && !!projectId),
      switchMap(([clientKey, projectId]) => {
        let rootMain = tree[0];
        let rootProject = rootMain;
        // Find client folder
        while (
          rootMain &&
          rootMain.name.toLocaleLowerCase() !== clientKey.toLocaleLowerCase()
        ) {
          rootMain = rootMain.items[0];
        }
        // Find project folder
        while (rootProject && rootProject.name !== `1_${projectId}`) {
          rootProject = rootProject.items[0];
        }
        // Find project subfolder
        while (
          rootProject &&
          rootProject.items[0] &&
          rootProject.items[0].name === `1_${projectId}`
        ) {
          rootProject = rootProject.items[0];
        }
        this.mainFolder = rootProject || rootMain;
        return of((rootProject || rootMain).items);
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
