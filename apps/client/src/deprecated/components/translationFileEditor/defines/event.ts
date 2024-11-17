import { ColumnHeaderKey } from 'i18n-editor-common';

/**
 * @deprecated
 */
export interface TableCellEvent {
  rowIndex: number;
  // @ts-ignore
  event: MouseEvent<HTMLButtonElement>;
}

/**
 * @deprecated
 */
export interface TableMoreOptionsRowMenuClickEvent {
  rowIndex: number;
  // @ts-ignore
  event: MouseEvent<HTMLButtonElement>;
}

/**
 * @deprecated
 */
export interface TableMoreOptionsColumnMenuClickEvent {
  columnHeaderKey: ColumnHeaderKey;
  // @ts-ignore
  event: MouseEvent<HTMLButtonElement>;
}
