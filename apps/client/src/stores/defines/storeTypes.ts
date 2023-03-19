import { ColumnData, RowData } from 'i18n-editor-common';

export interface TranslationContentSelector {
  columns: ColumnData[] | undefined;
  rows: RowData[] | undefined;
}
