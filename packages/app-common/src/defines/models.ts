import { DirectoryEntry } from './types';

export interface CommonRes<T = object> {
  status: number;
  errorMessage?: string;
  data?: T;
}

export interface DirectoryReq {
  path?: string;
}

export interface DirectoryRes
  extends CommonRes<{
    path: string;
    entries: DirectoryEntry[];
  }> {}

export interface TranslationFileReq {
  path: string;
}

export interface TranslationFileRes
  extends CommonRes<{
    files: string[];
  }> {}
