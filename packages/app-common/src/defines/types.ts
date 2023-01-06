import { LANGUAGE_CODES } from './constants';

export interface DirectoryEntry {
  name: string;
  type: DirectoryEntryType;
}

export type DirectoryEntryType = 'directory' | 'file' | 'unknown';

export type LanguageCode = typeof LANGUAGE_CODES[number];

export interface ColumnData {
  header: string;
}

export type RowData = { key: string } & {
  [languageCode in LanguageCode]?: string;
};

export interface CellData {
  locale: string;
  key: string;
  value: string;
}
