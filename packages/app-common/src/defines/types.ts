import { LANGUAGE_CODES } from './constants';

export interface DirectoryEntry {
  name: string;
  type: DirectoryEntryType;
}

export type DirectoryEntryType = 'directory' | 'file' | 'unknown';

export type LanguageCode = typeof LANGUAGE_CODES[number];

export type ColumnHeaderKey = 'key' | 'index' | LanguageCode;

export interface ColumnData {
  header: ColumnHeaderKey;
}

export type RowData = { index: number; key: string } & {
  [languageCode in LanguageCode]?: string;
};

export interface CellData {
  locale: string;
  key: string;
  value: string;
}

export type ErrorMessage = 'INVALID_LOCALE_DIRECTORY' | 'KEYS_CHANGED_BY_EXTERNAL_WRITE' | 'EXIST_FILE_NAME';

export interface Config {
  localeDirectoryPath: string;
}

export interface ConfigMeta {
  path: string;
}
