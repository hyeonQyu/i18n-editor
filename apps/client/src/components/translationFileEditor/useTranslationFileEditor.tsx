import { TranslationFileEditorProps } from '@components/translationFileEditor/TranslationFileEditor';
import { MouseEventHandler, RefObject, SyntheticEvent, useRef, useState } from 'react';
import { CustomEventHandler } from '@defines/event';
import {
  INITIAL_TABLE_EXTEND_DIALOG_DATA,
  LABELS_BY_TABLE_EXTEND_TYPE,
  TableCellEvent,
  TableExtendDialogData,
  TableMoreOptionsColumnMenuClickEvent,
  TableMoreOptionsRowMenuClickEvent,
} from '@components/translationFileEditor/defines';
import { Menu } from 'primereact/menu';
import { ColumnHeaderKey, LanguageCode, RowData } from 'i18n-editor-common';
import { DialogPositionType } from 'primereact/dialog';
import useInput, { IUseInput } from '@hooks/common/useInput';
import { DataTableFilterMeta, DataTableRowClickEventParams, DataTableRowMouseEventParams } from 'primereact/datatable';
import useDropdown, { IUseDropdown } from '@hooks/common/useDropdown';

export interface IUseTranslationFileEditorParams extends TranslationFileEditorProps {}

export interface IUseTranslationFileEditor {
  rowMenuRef: RefObject<Menu> | undefined;
  columnMenuRef: RefObject<Menu> | undefined;
  mouseHoveredRowIndex: number | undefined;
  editRowIndex: number | undefined;
  selectedRow: RowData | undefined;
  globalFilterFields: string[];
  isClearableRow: boolean;
  dropdownAddingLanguageCode: IUseDropdown;
  inputAddingKey: IUseInput;
  tableExtendDialogData: TableExtendDialogData;
  filter: DataTableFilterMeta;
  inputFilter: IUseInput;
  handleTableMouseLeave: MouseEventHandler;
  handleRowClick: CustomEventHandler<DataTableRowClickEventParams>;
  handleRowMouseEnter: CustomEventHandler<DataTableRowMouseEventParams>;
  handleAddColumnClick: MouseEventHandler<HTMLButtonElement>;
  handleColumnMenuClickDeleteColumn: CustomEventHandler<SyntheticEvent>;
  handleRowMenuClickAddRowAbove: CustomEventHandler<SyntheticEvent>;
  handleRowMenuClickAddRowBelow: CustomEventHandler<SyntheticEvent>;
  handleRowMenuClickClearRowContent: CustomEventHandler<SyntheticEvent>;
  handleRowMenuClickDeleteRow: CustomEventHandler<SyntheticEvent>;
  onCellMouseEnter: CustomEventHandler<TableCellEvent>;
  onTableMoreOptionsColumnButtonClick: CustomEventHandler<TableMoreOptionsColumnMenuClickEvent>;
  onTableMoreOptionsRowButtonClick: CustomEventHandler<TableMoreOptionsRowMenuClickEvent>;
}

function useTranslationFileEditor(params: IUseTranslationFileEditorParams): IUseTranslationFileEditor {
  const { rows, columns = [], onAddColumn, onDeleteColumn, onAddRowAbove, onAddRowBelow, onClearRowContent, onDeleteRow } = params;

  const rowMenuRef = useRef<Menu>(null);
  const columnMenuRef = useRef<Menu>(null);

  const [mouseHoveredRowIndex, setMouseHoveredRowIndex] = useState<number>();
  const [editRowIndex, setEditRowIndex] = useState<number>();
  const [editColumnHeaderKey, setEditColumnHeaderKey] = useState<ColumnHeaderKey>();

  const [tableExtendDialogData, setTableExtendDialogData] = useState<TableExtendDialogData>({
    ...INITIAL_TABLE_EXTEND_DIALOG_DATA,
  });

  const dropdownAddingLanguageCode = useDropdown({});

  const inputAddingKey = useInput({
    onChangeValue() {
      setTableExtendDialogData((prev) => ({
        ...prev,
        invalid: false,
        ...LABELS_BY_TABLE_EXTEND_TYPE[prev.type],
      }));
    },
  });

  const [filter, setFilter] = useState<DataTableFilterMeta>({
    global: {
      value: null,
      matchMode: 'contains',
    },
  });

  const inputFilter = useInput({
    onChangeValue(value) {
      setFilter((prev) => ({
        ...prev,
        global: {
          ...prev.global,
          value,
        },
      }));
    },
  });

  const globalFilterFields = columns.map(({ header }) => header);

  const handleTableMouseLeave: MouseEventHandler = () => {
    setMouseHoveredRowIndex(undefined);
  };

  const handleRowClick: CustomEventHandler<DataTableRowClickEventParams> = (e) => {
    if (!e) return;
    const { index } = e;
    setEditRowIndex(index);
  };

  const handleRowMouseEnter: CustomEventHandler<DataTableRowMouseEventParams> = (e) => {
    if (!e) return;
    const { index, originalEvent } = e;

    if (index !== editRowIndex) {
      rowMenuRef.current?.hide(originalEvent);
    }

    setMouseHoveredRowIndex(index);
  };

  const onCellMouseEnter: CustomEventHandler<TableCellEvent> = () => {};

  const onTableMoreOptionsColumnButtonClick: CustomEventHandler<TableMoreOptionsColumnMenuClickEvent> = (e) => {
    if (!e) return;

    const { columnHeaderKey, event } = e;

    columnMenuRef.current?.toggle(event);
    setEditColumnHeaderKey(columnHeaderKey);
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

  const commonAddColumnDialogProps = (): Partial<TableExtendDialogData> => ({
    type: 'column',
    ...LABELS_BY_TABLE_EXTEND_TYPE['column'],
    visible: true,
    position: 'top',
    invalid: false,
    onHide: hideTableExtendDialog,
  });

  const commonAddRowDialogProps = (e: SyntheticEvent): Partial<TableExtendDialogData> => ({
    type: 'row',
    ...LABELS_BY_TABLE_EXTEND_TYPE['row'],
    visible: true,
    position: getEditRowDialogPosition(e!.target as HTMLElement),
    invalid: false,
    onHide: hideTableExtendDialog,
  });

  const isDuplicatedRowKey = (key: string) => {
    return Boolean(rows?.filter((row) => row.key === key).length);
  };

  const checkInvalidRowAndAlert = (key: string): boolean => {
    if (!key) {
      setTableExtendDialogData((prev) => ({
        ...prev,
        invalid: true,
      }));
      return true;
    }

    if (isDuplicatedRowKey(key)) {
      setTableExtendDialogData((prev) => ({
        ...prev,
        invalid: true,
        inputLabel: '이미 동일한 key가 있어요',
      }));
      return true;
    }
    return false;
  };

  const handleAddColumnClick: MouseEventHandler<HTMLButtonElement> = () => {
    dropdownAddingLanguageCode.clear();

    setTableExtendDialogData((prev) => ({
      ...prev,
      ...commonAddColumnDialogProps(),
      onAdd(language) {
        onAddColumn({ languageCode: language as LanguageCode });
        hideTableExtendDialog();
      },
    }));
  };

  const handleColumnMenuClickDeleteColumn: CustomEventHandler<SyntheticEvent> = () => {
    onDeleteColumn({ languageCode: editColumnHeaderKey as LanguageCode });
  };

  const handleRowMenuClickAddRowAbove: CustomEventHandler<SyntheticEvent> = (e) => {
    inputAddingKey.clear();

    setTableExtendDialogData((prev) => ({
      ...prev,
      ...commonAddRowDialogProps(e!),
      onAdd(key) {
        if (checkInvalidRowAndAlert(key)) return;

        onAddRowAbove({
          index: editRowIndex!,
          key,
          onSuccess(index) {
            setEditRowIndex(index);
          },
        });

        hideTableExtendDialog();
      },
    }));
  };

  const handleRowMenuClickAddRowBelow: CustomEventHandler<SyntheticEvent> = (e) => {
    inputAddingKey.clear();

    setTableExtendDialogData((prev) => ({
      ...prev,
      ...commonAddRowDialogProps(e!),
      onAdd(key) {
        if (checkInvalidRowAndAlert(key)) return;

        onAddRowBelow({
          index: editRowIndex!,
          key,
          onSuccess(index) {
            setEditRowIndex(index);
          },
        });

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
    columnMenuRef,
    mouseHoveredRowIndex,
    editRowIndex,
    selectedRow,
    globalFilterFields,
    isClearableRow,
    tableExtendDialogData,
    dropdownAddingLanguageCode,
    inputAddingKey,
    filter,
    inputFilter,
    handleTableMouseLeave,
    handleRowClick,
    handleRowMouseEnter,
    handleAddColumnClick,
    handleColumnMenuClickDeleteColumn,
    handleRowMenuClickAddRowAbove,
    handleRowMenuClickAddRowBelow,
    handleRowMenuClickClearRowContent,
    handleRowMenuClickDeleteRow,
    onCellMouseEnter,
    onTableMoreOptionsColumnButtonClick,
    onTableMoreOptionsRowButtonClick,
  };
}

export default useTranslationFileEditor;
