import { LanguageCode } from 'i18n-editor-common';

export type RowData = {
  key: string;
} & Partial<Record<LanguageCode, string>>;

export interface ColumnData {
  label: keyof RowData;
}

export const EMPTY_ROWS: RowData[] = [];
export const EMPTY_COLUMNS: ColumnData[] = [];
