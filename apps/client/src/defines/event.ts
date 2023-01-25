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

export interface TranslationTableDeleteRowEvent extends TranslationTableRowEditEvent {
  position: DialogPositionType;
}

export interface TranslationTableColumnEditEvent {
  languageCode: LanguageCode;
}

export interface TranslationTableColumnAddEvent extends TranslationTableColumnEditEvent {}

export interface TranslationTableColumnDeleteEvent extends TranslationTableColumnEditEvent {}

export interface CreateDirectoryEvent {
  directoryName: LanguageCode;
  fileName: string;
}
