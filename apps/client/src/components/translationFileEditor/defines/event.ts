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
  columnIndex: number;
  // @ts-ignore
  event: MouseEvent<HTMLButtonElement>;
}
