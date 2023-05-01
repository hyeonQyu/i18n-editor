import { ColumnData, RowData } from 'i18n-editor-common';

export const getNewContentRow = (columns: ColumnData[], index: number, key: string): RowData => {
  return columns!
    .filter(({ header }) => !(header === 'key' || header === 'index'))
    .reduce(
      (acc, { header: languageCode }) => ({
        ...acc,
        [languageCode]: '',
      }),
      {
        index,
        key,
      },
    );
};
