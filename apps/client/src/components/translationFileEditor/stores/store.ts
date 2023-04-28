import { atom } from 'recoil';
import { ColumnData, ColumnHeaderKey, RowData } from 'i18n-editor-common';

const getKey = (key: string) => `translationFileEditor_${key}`;

export const translationFileEditorStates = {
  rows: atom<RowData[]>({
    key: getKey('rows'),
    default: [],
  }),

  columns: atom<ColumnData[]>({
    key: getKey('columns'),
    default: [],
  }),

  mouseHoveredRowIndex: atom<number | undefined>({
    key: getKey('mouseHoveredRowIndex'),
    default: undefined,
  }),

  editRowIndex: atom<number | undefined>({
    key: getKey('editRowIndex'),
    default: undefined,
  }),

  editColumnHeaderKey: atom<ColumnHeaderKey | undefined>({
    key: getKey('editColumnHeaderKey'),
    default: undefined,
  }),
};
