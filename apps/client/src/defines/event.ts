import { DialogPositionType } from 'primereact/dialog';

export type CustomEventHandler<E = undefined> = (e?: E) => void;

export interface TranslationTableEditEvent {
  index: number;
  onSuccess?: (index: number) => void;
}

export interface TranslationTableAddEvent extends TranslationTableEditEvent {
  key: string;
}

export interface TranslationTableDeleteRowEvent extends TranslationTableEditEvent {
  position: DialogPositionType;
}
