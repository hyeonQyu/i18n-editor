import { ColumnData, DirectoryEntry, RowData } from './types';

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

export interface GetContentReq {
  path: string;
  fileName: string;
}

export interface GetContentRes
  extends CommonRes<{
    columns: ColumnData[];
    rows: RowData[];
  }> {}
