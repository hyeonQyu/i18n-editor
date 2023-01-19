import { CellData, ColumnData, DirectoryEntry, LanguageCode, RowData } from './types';

export interface CommonRes<T = void> {
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

export interface PatchContentReq {
  path: string;
  fileName: string;
  cells: CellData[];
}

export interface PatchContentRes extends CommonRes {}

export interface PostContentRowReq {
  path: string;
  fileName: string;
  row: RowData;
}

export interface PostContentRowRes extends CommonRes {}

export interface DeleteContentRowReq {
  path: string;
  fileName: string;
  key: string;
}

export interface DeleteContentRowRes extends CommonRes {}

export interface PostContentColumnReq {
  path: string;
  fileName: string;
  languageCode: LanguageCode;
}

export interface PostContentColumnRes extends GetContentRes {}
