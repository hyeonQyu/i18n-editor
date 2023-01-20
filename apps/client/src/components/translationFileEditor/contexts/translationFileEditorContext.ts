import React, { createRef } from 'react';
import { IUseTranslationFileEditor } from '@components/translationFileEditor/useTranslationFileEditor';
import { INITIAL_TABLE_EXTEND_DIALOG_DATA } from '@components/translationFileEditor/defines';
import { TranslationFileEditorProps } from '@components/translationFileEditor';

export interface ITranslationFileEditorContext
  extends Pick<
      IUseTranslationFileEditor,
      | 'rowMenuRef'
      | 'columnMenuRef'
      | 'mouseHoveredRowIndex'
      | 'isClearableRow'
      | 'tableExtendDialogData'
      | 'dropdownAddingLanguageCode'
      | 'inputAddingKey'
      | 'globalFilterFields'
      | 'selectedRow'
      | 'filter'
      | 'inputFilter'
      | 'onCellMouseEnter'
      | 'onTableMoreOptionsColumnButtonClick'
      | 'onTableMoreOptionsRowButtonClick'
      | 'handleTableMouseLeave'
      | 'handleRowClick'
      | 'handleRowMouseEnter'
      | 'handleAddColumnClick'
      | 'handleColumnMenuClickDeleteColumn'
      | 'handleRowMenuClickAddRowAbove'
      | 'handleRowMenuClickAddRowBelow'
      | 'handleRowMenuClickClearRowContent'
      | 'handleRowMenuClickDeleteRow'
    >,
    Pick<TranslationFileEditorProps, 'rows' | 'columns' | 'onChange'> {}

export const TranslationFileEditorContext = React.createContext<ITranslationFileEditorContext>({
  rowMenuRef: undefined,
  columnMenuRef: undefined,
  mouseHoveredRowIndex: undefined,
  isClearableRow: false,
  tableExtendDialogData: INITIAL_TABLE_EXTEND_DIALOG_DATA,
  dropdownAddingLanguageCode: { value: '', onChange() {}, clear() {} },
  inputAddingKey: { value: '', onChange() {}, changeValue() {}, clear() {}, inputRef: createRef() },
  globalFilterFields: [],
  selectedRow: undefined,
  filter: {},
  inputFilter: { value: '', onChange() {}, changeValue() {}, clear() {}, inputRef: createRef() },
  onChange() {},
  onCellMouseEnter() {},
  onTableMoreOptionsColumnButtonClick() {},
  onTableMoreOptionsRowButtonClick() {},
  handleTableMouseLeave() {},
  handleRowClick() {},
  handleRowMouseEnter() {},
  handleAddColumnClick() {},
  handleColumnMenuClickDeleteColumn() {},
  handleRowMenuClickAddRowAbove() {},
  handleRowMenuClickAddRowBelow() {},
  handleRowMenuClickClearRowContent() {},
  handleRowMenuClickDeleteRow() {},
});

export const useTranslationFileEditorContext = () => React.useContext(TranslationFileEditorContext);
