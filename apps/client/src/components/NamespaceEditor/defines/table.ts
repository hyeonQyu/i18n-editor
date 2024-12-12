import { LanguageCode } from 'i18n-editor-common';

export type RowData = {
  key: string;
} & Partial<Record<LanguageCode, string>>;

export interface ColumnData {
  label: keyof RowData;
}
