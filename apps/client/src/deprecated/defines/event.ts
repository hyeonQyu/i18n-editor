import { LanguageCode, RowData } from 'i18n-editor-common';
import { DialogPositionType } from 'primereact/dialog';

export type CustomEventHandler<E = undefined> = (e?: E) => void;

/**
 * @deprecated
 */
export interface TranslationTableRowEditEvent {
  index: number;
  onSuccess?: (row: RowData) => void;
}

/**
 * @deprecated
 */
export interface TranslationTableRowAddEvent extends TranslationTableRowEditEvent {
  key: string;
}

/**
 * @deprecated
 */
export interface TranslationTableNewRowAddEvent extends Omit<TranslationTableRowAddEvent, 'index'> {}

/**
 * @deprecated
 */
export interface TranslationTableDeleteRowEvent extends TranslationTableRowEditEvent {
  position: DialogPositionType;
}

/**
 * @deprecated
 */
export interface TranslationTableColumnAddEvent {
  languageCodes: LanguageCode[];
}

/**
 * @deprecated
 */
export interface TranslationTableColumnDeleteEvent {
  languageCode: LanguageCode;
}

/**
 * @deprecated
 */
export interface CreateDirectoryEvent {
  directoryNames: LanguageCode[];
  fileName: string;
}

/**
 * @deprecated
 */
export interface CreateTranslationFileEvent {
  fileName: string;
}
