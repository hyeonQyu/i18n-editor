import { atom } from 'recoil';
import { ColumnData, RowData } from 'i18n-editor-common';

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
};
