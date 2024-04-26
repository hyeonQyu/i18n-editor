import { LANGUAGE_CODES } from './constants';

/**
 * @deprecated 전체 제거 예정
 */
export interface DirectoryEntry {
  name: string;
  type: DirectoryEntryType;
}
/**
 * @deprecated 전체 제거 예정
 */
export type DirectoryEntryType = 'directory' | 'file' | 'unknown';
/**
 * @deprecated 전체 제거 예정
 */
export type LanguageCode = typeof LANGUAGE_CODES[number];
/**
 * @deprecated 전체 제거 예정
 */
export type ColumnHeaderKey = 'key' | 'index' | LanguageCode;
/**
 * @deprecated 전체 제거 예정
 */
export interface ColumnData {
  header: ColumnHeaderKey;
}
/**
 * @deprecated 전체 제거 예정
 */
export type RowData = { index: number; key: string } & {
  [languageCode in LanguageCode]?: string;
};
/**
 * @deprecated 전체 제거 예정
 */
export interface CellData {
  locale: string;
  key: string;
  value: string;
}
/**
 * @deprecated 전체 제거 예정
 */
export type ErrorMessage = 'INVALID_LOCALE_DIRECTORY' | 'KEYS_CHANGED_BY_EXTERNAL_WRITE' | 'EXIST_FILE_NAME';
