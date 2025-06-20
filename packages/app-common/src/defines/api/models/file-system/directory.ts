import { FileEntry } from '../../../file';

export interface GetFileSystemDirectoryRequest {
  path: string;
}

export interface GetFileSystemDirectoryResponse {
  path: string;
  entries: FileEntry[];
}
