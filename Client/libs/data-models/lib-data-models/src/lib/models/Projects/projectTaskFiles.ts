export interface TaskFileSystemItem {
  name: string;

  isDirectory: boolean;

  path: string;

  folderId: number;

  description: string;

  createdBy: string;

  items: TaskFileSystemItem[];
}

export interface GetFoldersHttpResponse {
  success: boolean;
  data: TaskFolder[]
  clientErrorMessage: string;
}

export interface TaskFolder {
  authorID: number;
  childCount: number;
  createdBy: string;
  folderDescription: string;
  folderId: number;
  folderPath: string;
  followingSiblingCount: number;
  hasAssignedRights: boolean;
  isPublic: boolean;
  relativePath: string;
  systemName: string;
}

export interface CreateFolderHTTPRequest {
  folderName: string
  description: string
  objectId: number;
  parentFolderId: number
}

export interface UploadTaskFilesHTTPRequest {
  FilesToBeUploaded: FormData;
  ObjectId: number;
  ParentFolderId: number;
}