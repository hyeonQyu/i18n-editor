import { ColumnHeaderKey } from 'i18n-editor-common';

export interface TableCellEvent {
  rowIndex: number;
  // @ts-ignore
  event: MouseEvent<HTMLButtonElement>;
}

export interface TableMoreOptionsRowMenuClickEvent {
  rowIndex: number;
  // @ts-ignore
  event: MouseEvent<HTMLButtonElement>;
}

export interface TableMoreOptionsColumnMenuClickEvent {
  columnHeaderKey: ColumnHeaderKey;
  // @ts-ignore
  event: MouseEvent<HTMLButtonElement>;
}
