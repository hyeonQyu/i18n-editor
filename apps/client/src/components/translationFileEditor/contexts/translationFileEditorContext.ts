import React, { createRef } from 'react';
import { IUseTranslationFileEditor } from '@components/translationFileEditor/useTranslationFileEditor';
import { INITIAL_TABLE_EXTEND_DIALOG_DATA } from '@components/translationFileEditor/defines';

export interface ITranslationFileEditorContext
  extends Pick<
    IUseTranslationFileEditor,
    | 'rowMenuRef'
    | 'mouseHoveredRowIndex'
    | 'isClearableRow'
    | 'tableExtendDialogData'
    | 'inputAddingKey'
    | 'onCellMouseEnter'
    | 'onTableMoreOptionsRowButtonClick'
    | 'handleRowMenuClickAddRowAbove'
    | 'handleRowMenuClickAddRowBelow'
    | 'handleRowMenuClickClearRowContent'
    | 'handleRowMenuClickDeleteRow'
  > {}

export const TranslationFileEditorContext = React.createContext<ITranslationFileEditorContext>({
  rowMenuRef: undefined,
  mouseHoveredRowIndex: undefined,
  isClearableRow: false,
  tableExtendDialogData: INITIAL_TABLE_EXTEND_DIALOG_DATA,
  inputAddingKey: { value: '', onChange() {}, changeValue() {}, clear() {}, inputRef: createRef() },
  onCellMouseEnter() {},
  onTableMoreOptionsRowButtonClick() {},
  handleRowMenuClickAddRowAbove() {},
  handleRowMenuClickAddRowBelow() {},
  handleRowMenuClickClearRowContent() {},
  handleRowMenuClickDeleteRow() {},
});

export const useTranslationFileEditorContext = () => React.useContext(TranslationFileEditorContext);
