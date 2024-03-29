import React, { createRef } from 'react';
import { IUseTranslationFileEditor } from '@components/translationFileEditor/useTranslationFileEditor';
import { INITIAL_TABLE_EXTEND_DIALOG_DATA } from '@components/translationFileEditor/defines';
import { TranslationFileEditorProps } from '@components/translationFileEditor';

export interface ITranslationFileEditorContext
  extends Pick<
      IUseTranslationFileEditor,
      | 'dataTableRef'
      | 'rowMenuRef'
      | 'columnMenuRef'
      | 'mouseHoveredRowIndex'
      | 'isClearableRow'
      | 'tableExtendDialogData'
      | 'multiSelectAddingLanguageCode'
      | 'inputAddingKey'
      | 'globalFilterFields'
      | 'selectedRow'
      | 'filter'
      | 'inputFilter'
      | 'onCellClick'
      | 'onCellMouseEnter'
      | 'onTableMoreOptionsColumnButtonClick'
      | 'onTableMoreOptionsRowButtonClick'
      | 'onAddNewTranslationKey'
      | 'handleTableMouseLeave'
      | 'handleCellEditComplete'
      | 'handleAddColumnClick'
      | 'handleColumnMenuClickDeleteColumn'
      | 'handleRowMenuClickCopyTranslationKey'
      | 'handleRowMenuClickAddRowAbove'
      | 'handleRowMenuClickAddRowBelow'
      | 'handleRowMenuClickClearRowContent'
      | 'handleRowMenuClickDeleteRow'
    >,
    Pick<TranslationFileEditorProps, 'rows' | 'columns' | 'onChange'> {}

export const TranslationFileEditorContext = React.createContext<ITranslationFileEditorContext>({
  dataTableRef: undefined,
  rowMenuRef: undefined,
  columnMenuRef: undefined,
  mouseHoveredRowIndex: undefined,
  isClearableRow: false,
  tableExtendDialogData: INITIAL_TABLE_EXTEND_DIALOG_DATA,
  multiSelectAddingLanguageCode: { value: '', onChange() {}, clear() {} },
  inputAddingKey: { value: '', onChange() {}, changeValue() {}, clear() {}, inputRef: createRef() },
  globalFilterFields: [],
  selectedRow: undefined,
  filter: {},
  inputFilter: { value: '', onChange() {}, changeValue() {}, clear() {}, inputRef: createRef() },
  onChange() {},
  onCellClick() {},
  onCellMouseEnter() {},
  onTableMoreOptionsColumnButtonClick() {},
  onTableMoreOptionsRowButtonClick() {},
  onAddNewTranslationKey() {},
  handleTableMouseLeave() {},
  handleCellEditComplete() {},
  handleAddColumnClick() {},
  handleColumnMenuClickDeleteColumn() {},
  handleRowMenuClickCopyTranslationKey() {},
  handleRowMenuClickAddRowAbove() {},
  handleRowMenuClickAddRowBelow() {},
  handleRowMenuClickClearRowContent() {},
  handleRowMenuClickDeleteRow() {},
});

export const useTranslationFileEditorContext = () => React.useContext(TranslationFileEditorContext);
