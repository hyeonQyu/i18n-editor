import { TranslationFileEditorProps } from '@components/translationFileEditor/TranslationFileEditor';
import { MouseEventHandler, RefObject, SyntheticEvent, useRef, useState } from 'react';
import { CustomEventHandler } from '@defines/event';
import {
  INITIAL_TABLE_EXTEND_DIALOG_DATA,
  TableCellEvent,
  TableExtendDialogData,
  TableMoreOptionsRowMenuClickEvent,
} from '@components/translationFileEditor/defines';
import { Menu } from 'primereact/menu';
import { RowData } from 'i18n-editor-common';
import { DialogPositionType } from 'primereact/dialog';
import useInput, { IUseInput } from '@hooks/common/useInput';

export interface IUseTranslationFileEditorParams extends TranslationFileEditorProps {}

export interface IUseTranslationFileEditor {
  rowMenuRef: RefObject<Menu> | undefined;
  mouseHoveredRowIndex: number | undefined;
  editRowIndex: number | undefined;
  selectedRow: RowData | undefined;
  globalFilterFields: string[];
  isClearableRow: boolean;
  inputAddingKey: IUseInput;
  tableExtendDialogData: TableExtendDialogData;
  handleTableMouseLeave: MouseEventHandler;
  handleRowMenuClickAddRowAbove: CustomEventHandler<SyntheticEvent>;
  handleRowMenuClickAddRowBelow: CustomEventHandler<SyntheticEvent>;
  handleRowMenuClickClearRowContent: CustomEventHandler<SyntheticEvent>;
  handleRowMenuClickDeleteRow: CustomEventHandler<SyntheticEvent>;
  onCellMouseEnter: CustomEventHandler<TableCellEvent>;
  onTableMoreOptionsRowButtonClick: CustomEventHandler<TableMoreOptionsRowMenuClickEvent>;
}

function useTranslationFileEditor(params: IUseTranslationFileEditorParams): IUseTranslationFileEditor {
  const { rows, columns = [], onAddRowAbove, onAddRowBelow, onClearRowContent, onDeleteRow } = params;

  const rowMenuRef = useRef<Menu>(null);

  const [mouseHoveredRowIndex, setMouseHoveredRowIndex] = useState<number>();
  const [editRowIndex, setEditRowIndex] = useState<number>();

  const inputAddingKey = useInput({});
  const [tableExtendDialogData, setTableExtendDialogData] = useState<TableExtendDialogData>({
    ...INITIAL_TABLE_EXTEND_DIALOG_DATA,
  });

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

  const hasSelectedRow = rows && (editRowIndex || editRowIndex === 0);

  const selectedRow = hasSelectedRow ? rows[editRowIndex] : undefined;

  const isClearableRow = Boolean(
    rows && hasSelectedRow && Object.entries(rows[editRowIndex]).filter(([key, value]) => key !== 'key' && key !== 'index' && value).length,
  );

  const hideTableExtendDialog = () => setTableExtendDialogData((prev) => ({ ...prev, visible: false }));

  const getEditRowDialogPosition = (target: HTMLElement): DialogPositionType => {
    const { y } = target.getBoundingClientRect();
    const subHeight = window.innerHeight / 3;
    if (y < subHeight) return 'top-left';
    if (y < subHeight * 2) return 'left';
    return 'bottom-left';
  };

  const commonAddRowDialogProps = (e: SyntheticEvent): Partial<TableExtendDialogData> => ({
    visible: true,
    header: '행을 추가하시겠어요?',
    position: getEditRowDialogPosition(e!.target as HTMLElement),
    inputLabel: '새로 추가할 행의 key 입력',
    onHide: hideTableExtendDialog,
  });

  const handleRowMenuClickAddRowAbove: CustomEventHandler<SyntheticEvent> = (e) => {
    inputAddingKey.clear();

    setTableExtendDialogData((prev) => ({
      ...prev,
      ...commonAddRowDialogProps(e!),
      onAdd(keyValue) {
        onAddRowAbove({ index: editRowIndex!, keyValue });
        hideTableExtendDialog();
      },
    }));
  };

  const handleRowMenuClickAddRowBelow: CustomEventHandler<SyntheticEvent> = (e) => {
    inputAddingKey.clear();

    setTableExtendDialogData((prev) => ({
      ...prev,
      ...commonAddRowDialogProps(e!),
      onAdd(keyValue) {
        onAddRowBelow({ index: editRowIndex!, keyValue });
        hideTableExtendDialog();
      },
    }));
  };

  const handleRowMenuClickClearRowContent: CustomEventHandler<SyntheticEvent> = (e) => {
    onClearRowContent({ index: editRowIndex!, position: getEditRowDialogPosition(e!.target as HTMLElement) });
  };

  const handleRowMenuClickDeleteRow: CustomEventHandler<SyntheticEvent> = (e) => {
    onDeleteRow({ index: editRowIndex!, position: getEditRowDialogPosition(e!.target as HTMLElement) });
  };

  return {
    rowMenuRef,
    mouseHoveredRowIndex,
    editRowIndex,
    selectedRow,
    globalFilterFields,
    isClearableRow,
    tableExtendDialogData,
    inputAddingKey,
    handleTableMouseLeave,
    handleRowMenuClickAddRowAbove,
    handleRowMenuClickAddRowBelow,
    handleRowMenuClickClearRowContent,
    handleRowMenuClickDeleteRow,
    onCellMouseEnter,
    onTableMoreOptionsRowButtonClick,
  };
}

export default useTranslationFileEditor;
