import { FileEntry } from '../defines';

export type DirectoryReadRequest = {
  path: string;
};

export type DirectoryReadResponse = {
  path: string;
  entries: FileEntry[];
};
