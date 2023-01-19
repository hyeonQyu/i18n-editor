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
  // @ts-ignore
  event: MouseEvent<HTMLButtonElement>;
}
