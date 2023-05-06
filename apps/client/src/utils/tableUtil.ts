import { CellData, ColumnData, RowData } from 'i18n-editor-common';

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

export const getRowsBeforePivot = (rows: RowData[], pivotIndex: number) => rows.slice(0, pivotIndex);

export const getRowsAfterWithPivot = (rows: RowData[], pivotIndex: number) =>
  rows.slice(pivotIndex).map((row) => ({ ...row, index: row.index + 1 }));

export const getNewRowAddedContentRows = (rows: RowData[], columns: ColumnData[], rowIndex: number, key: string) => [
  ...getRowsBeforePivot(rows, rowIndex),
  getNewContentRow(columns, rowIndex, key),
  ...getRowsAfterWithPivot(rows, rowIndex),
];

export const rowToCell = (row: RowData, getCell: (cell: CellData) => CellData = (cell) => cell): CellData[] => {
  const { key } = row;
  return Object.entries(row)
    .filter(([prop]) => !(prop === 'index' || prop === 'key'))
    .map(([locale, value]) =>
      getCell({
        locale,
        key,
        value: value as string,
      }),
    );
};
