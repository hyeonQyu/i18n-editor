import { TranslationFileEditorProps } from '@components/translationFileEditor/TranslationFileEditor';
import { MouseEventHandler, RefObject, useRef, useState } from 'react';
import { CustomEventHandler } from '@defines/event';
import { TableCellEvent, TableMoreOptionsRowMenuClickEvent } from '@components/translationFileEditor/defines';
import { Menu } from 'primereact/menu';
import { RowData } from 'i18n-editor-common';

export interface IUseTranslationFileEditorParams extends TranslationFileEditorProps {}

export interface IUseTranslationFileEditor {
  rowMenuRef: RefObject<Menu> | undefined;
  mouseHoveredRowIndex: number | undefined;
  editRowIndex: number | undefined;
  selectedRow: RowData | undefined;
  globalFilterFields: string[];
  handleTableMouseLeave: MouseEventHandler;
  handleAddRowAbove: CustomEventHandler;
  handleAddRowBelow: CustomEventHandler;
  handleClearRowContent: CustomEventHandler;
  handleDeleteRow: CustomEventHandler;
  onCellMouseEnter: CustomEventHandler<TableCellEvent>;
  onTableMoreOptionsRowButtonClick: CustomEventHandler<TableMoreOptionsRowMenuClickEvent>;
}

function useTranslationFileEditor(params: IUseTranslationFileEditorParams): IUseTranslationFileEditor {
  const { rows, columns = [], onAddRowAbove, onAddRowBelow, onClearRowContent, onDeleteRow } = params;

  const rowMenuRef = useRef<Menu>(null);

  const [mouseHoveredRowIndex, setMouseHoveredRowIndex] = useState<number>();
  const [editRowIndex, setEditRowIndex] = useState<number>();

  const globalFilterFields = columns.map(({ header }) => header);

  const handleTableMouseLeave: MouseEventHandler = () => {
    setMouseHoveredRowIndex(undefined);
  };

  const onCellMouseEnter: CustomEventHandler<TableCellEvent> = (e) => {
    if (!e) return;
    const { rowIndex, event } = e;

    if (rowIndex !== editRowIndex) {
      setEditRowIndex(undefined);
      rowMenuRef.current?.hide(event);
    }

    setMouseHoveredRowIndex(rowIndex);
  };

  const onTableMoreOptionsRowButtonClick: CustomEventHandler<TableMoreOptionsRowMenuClickEvent> = (e) => {
    if (!e) return;

    const { rowIndex, event } = e;

    rowMenuRef.current?.toggle(event);
    setEditRowIndex(rowIndex);
  };

  const selectedRow = rows && (editRowIndex || editRowIndex === 0) ? rows[editRowIndex] : undefined;

  const handleAddRowAbove: CustomEventHandler = () => {
    onAddRowAbove({ rowIndex: editRowIndex! });
  };

  const handleAddRowBelow: CustomEventHandler = () => {
    onAddRowBelow({ rowIndex: editRowIndex! });
  };

  const handleClearRowContent: CustomEventHandler = () => {
    onClearRowContent({ rowIndex: editRowIndex! });
  };

  const handleDeleteRow: CustomEventHandler = () => {
    onDeleteRow({ rowIndex: editRowIndex! });
  };

  return {
    rowMenuRef,
    mouseHoveredRowIndex,
    editRowIndex,
    selectedRow,
    globalFilterFields,
    handleTableMouseLeave,
    handleAddRowAbove,
    handleAddRowBelow,
    handleClearRowContent,
    handleDeleteRow,
    onCellMouseEnter,
    onTableMoreOptionsRowButtonClick,
  };
}

export default useTranslationFileEditor;
