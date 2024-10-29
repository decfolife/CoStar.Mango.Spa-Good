import {
  FILES_EXCEED_MAX_LIMIT_ERR_MSG,
  INVALID_EXTENSION_ERR_MSG,
  MAX_NB_FILES_ERR_MSG,
  PROJECT_TASKS_MAX_FILES_SIZE,
  PROJECT_TASKS_MAX_FILES_UPLOAD,
  PROJECT_TASKS_UPLOAD_EXTENSIONS,
  TaskFileSystemItem,
  TaskFolder,
  ToastState,
} from '@mango/data-models/lib-data-models';
import { CremToastService } from '@mango/ui-shared/lib-ui-elements';

export class ProjectTasksFilesUtility {
  static mapFoldersToFileSystem(taskFolder: TaskFolder): TaskFileSystemItem {
    return {
      isDirectory: true, // the API returns folders only.
      name: taskFolder.systemName,
      items: [],
      folderId: taskFolder.folderId,
      path: taskFolder.relativePath,
      description: taskFolder.folderDescription,
      createdBy: taskFolder.createdBy,
    };
  }

  static buildTreeFromFoldersList(
    folders: TaskFileSystemItem[]
  ): TaskFileSystemItem[] {
    const result: { [key: string]: TaskFileSystemItem } = {};
    for (const folder of folders) {
      const pathsMap = folder.path
        .split('/')
        .filter((p) => p != '/' && p != '');
      let tempObj: { [key: string]: TaskFileSystemItem } = result;
      while (pathsMap.length > 0) {
        if (!tempObj[pathsMap[0]]) {
          tempObj[pathsMap[0]] = {
            ...folder,
            items: [],
          };
        }
        tempObj = tempObj[pathsMap[0]].items as any;
        pathsMap.shift();
      }
    }
    return ProjectTasksFilesUtility.flattenFoldersTree(result);
  }

  static flattenFoldersTree(root: any): TaskFileSystemItem[] {
    if (!root) {
      return;
    }
    return Object.entries(root).reduce(
      (acc: TaskFileSystemItem[], curr: [string, TaskFileSystemItem]) => {
        acc.push({
          ...curr[1],
          name: curr[0],
          items: ProjectTasksFilesUtility.flattenFoldersTree(curr[1].items),
        });
        return acc;
      },
      []
    );
  }

  static validateFilesToUpload(
    files: File[],
    toastService: CremToastService
  ): boolean {
    let isValid = true;
    if (files.length - 1 > PROJECT_TASKS_MAX_FILES_UPLOAD) {
      toastService.show(MAX_NB_FILES_ERR_MSG, 'Error', ToastState.ERROR);
      isValid = false;
    }
    files.forEach((f) => {
      const extension = f.name.split('.').pop();
      if (!PROJECT_TASKS_UPLOAD_EXTENSIONS.includes(extension)) {
        toastService.show(
          INVALID_EXTENSION_ERR_MSG.replace('[EXTENSION]', extension),
          'Error',
          ToastState.ERROR
        );
        isValid = false;
      }
    });
    if (
      files.reduce((acc, f) => acc + f.size, 0) > PROJECT_TASKS_MAX_FILES_SIZE
    ) {
      toastService.show(
        FILES_EXCEED_MAX_LIMIT_ERR_MSG,
        'Error',
        ToastState.ERROR
      );
      isValid = false;
    }
    return isValid;
  }
}
