import { LanguageCode } from 'i18n-editor-common';

export interface CellError {
  message: string;
}

export interface Cell {
  value: string;
  metadata: {
    error?: CellError;
  };
}

export type RowData = {
  key: Cell;
} & Partial<Record<LanguageCode, Cell>>;

export interface ColumnData {
  label: keyof RowData | '';
}

export const EMPTY_ROWS: RowData[] = [];
export const EMPTY_COLUMNS: ColumnData[] = [];
