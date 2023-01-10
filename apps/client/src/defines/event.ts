export type CustomEventHandler<E = undefined> = (e?: E) => void;

export interface EditTranslationTableRowEvent {
  rowIndex: number;
}
