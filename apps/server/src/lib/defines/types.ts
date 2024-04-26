import { LanguageCode, RowData } from 'i18n-editor-common';

/**
 * @deprecated
 */
export type JsonObject = {
  [key in string]: string;
};

/**
 * @deprecated
 */
export interface FileData {
  path: string;
  content: JsonObject;
  language: LanguageCode;
}

/**
 * @deprecated
 */
export interface ServiceCache {
  lastReadRows: RowData[];
}
