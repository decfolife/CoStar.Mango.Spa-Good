import { Injectable } from '@angular/core';
import {
  TaskFileSystemItem,
  TaskFolder,
} from '@mango/data-models/lib-data-models';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskInfoUIService {
  projectId$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  taskId$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  folders$: BehaviorSubject<TaskFileSystemItem[]> = new BehaviorSubject<
    TaskFileSystemItem[]
  >([]);

  selectedFiles$: BehaviorSubject<File[]> = new BehaviorSubject<File[]>([]);

  createFolderInProgress$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  uploadFilesInProgress$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  addFolderPopupVisible$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  selectedFolder$: BehaviorSubject<any> = new BehaviorSubject<TaskFolder>(null);
}
