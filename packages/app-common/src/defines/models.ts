import { CellData, ColumnData, Config, DirectoryEntry, LanguageCode, RowData } from './types';

export interface CommonRes<T = void> {
  status: number;
  errorMessage?: string;
  data?: T;
}

export interface GetConfigRes
  extends CommonRes<{
    config: Config;
  }> {}

export interface GetDirectoryReq {
  path?: string;
}

export interface GetDirectoryRes
  extends CommonRes<{
    path: string;
    entries: DirectoryEntry[];
  }> {}

export interface PostDirectoryReq {
  path: string;
  directoryNames: LanguageCode[];
  fileName: string;
}

export interface PostDirectoryRes
  extends CommonRes<{
    fileName: string;
  }> {}

export interface GetNativeFileExplorerReq {
  path: string;
}

export interface GetNativeFileExplorerRes extends CommonRes {}

export interface GetTranslationFileReq {
  path: string;
}

export interface GetTranslationFileRes
  extends CommonRes<{
    files: string[];
  }> {}

export interface PostTranslationFileReq {
  path: string;
  fileName: string;
}

export interface PostTranslationFileRes extends CommonRes {}

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

export interface PostContentRowRes
  extends CommonRes<{
    row: RowData;
  }> {}

export interface DeleteContentRowReq {
  path: string;
  fileName: string;
  key: string;
}

export interface DeleteContentRowRes extends CommonRes {}

export interface PostContentColumnReq {
  path: string;
  fileName: string;
  languageCodes: LanguageCode[];
}

export interface PostContentColumnRes extends GetContentRes {}

export interface DeleteContentColumnReq {
  path: string;
  fileName: string;
  languageCode: LanguageCode;
}

export interface DeleteContentColumnRes extends GetContentRes {}
