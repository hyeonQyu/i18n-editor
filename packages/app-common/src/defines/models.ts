import { ColumnData, DirectoryEntry, RowData } from './types';

export interface CommonRes<T = object> {
  status: number;
  errorMessage?: string;
  data?: T;
}

export interface GetDirectoryReq {
  path?: string;
}

export interface GetDirectoryRes
  extends CommonRes<{
    path: string;
    entries: DirectoryEntry[];
  }> {}

export interface GetTranslationFileReq {
  path: string;
}

export interface GetTranslationFileRes
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
