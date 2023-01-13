import { LanguageCode, RowData } from 'i18n-editor-common';

export type JsonObject = {
  [key in string]: string;
};

export interface FileData {
  path: string;
  content: JsonObject;
  language: LanguageCode;
}

export interface ServiceCache {
  lastReadRows: RowData[];
}
