import { DialogPositionType } from 'primereact/dialog';
import { LanguageCode } from 'i18n-editor-common';

export type CustomEventHandler<E = undefined> = (e?: E) => void;

export interface TranslationTableRowEditEvent {
  index: number;
  onSuccess?: (index: number) => void;
}

export interface TranslationTableRowAddEvent extends TranslationTableRowEditEvent {
  key: string;
}

export interface TranslationTableNewRowAddEvent extends Omit<TranslationTableRowAddEvent, 'index'> {}

export interface TranslationTableDeleteRowEvent extends TranslationTableRowEditEvent {
  position: DialogPositionType;
}

export interface TranslationTableColumnAddEvent {
  languageCodes: LanguageCode[];
}

export interface TranslationTableColumnDeleteEvent {
  languageCode: LanguageCode;
}

export interface CreateDirectoryEvent {
  directoryNames: LanguageCode[];
  fileName: string;
}

export interface CreateTranslationFileEvent {
  fileName: string;
}
