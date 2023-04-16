import { TranslationFileEditorProps } from '@components/translationFileEditor/TranslationFileEditorBefore';
import { KeyboardEvent, MouseEventHandler, RefObject, SyntheticEvent, useRef, useState } from 'react';
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
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import useMultiSelect, { UseMultiSelect } from '@hooks/common/useMultiSelect';
import { ColumnEventParams } from 'primereact/column';
import { useToastContext } from '@contexts/toastContext';

export interface IUseTranslationFileEditorParams extends TranslationFileEditorProps {}

export interface IUseTranslationFileEditor {
  dataTableRef: RefObject<DataTable> | undefined;
  rowMenuRef: RefObject<Menu> | undefined;
  columnMenuRef: RefObject<Menu> | undefined;
  mouseHoveredRowIndex: number | undefined;
  editRowIndex: number | undefined;
  selectedRow: RowData | undefined;
  globalFilterFields: string[];
  isClearableRow: boolean;
  multiSelectAddingLanguageCode: UseMultiSelect;
  inputAddingKey: IUseInput;
  tableExtendDialogData: TableExtendDialogData;
  filter: DataTableFilterMeta;
  inputFilter: IUseInput;
  handleTableMouseLeave: MouseEventHandler;
  handleCellEditComplete: CustomEventHandler<ColumnEventParams>;
  handleAddColumnClick: MouseEventHandler<HTMLButtonElement>;
  handleColumnMenuClickDeleteColumn: CustomEventHandler<SyntheticEvent>;
  handleRowMenuClickCopyTranslationKey: CustomEventHandler;
  handleRowMenuClickAddRowAbove: CustomEventHandler<SyntheticEvent>;
  handleRowMenuClickAddRowBelow: CustomEventHandler<SyntheticEvent>;
  handleRowMenuClickClearRowContent: CustomEventHandler<SyntheticEvent>;
  handleRowMenuClickDeleteRow: CustomEventHandler<SyntheticEvent>;
  onCellClick: CustomEventHandler<TableCellEvent>;
  onCellMouseEnter: CustomEventHandler<TableCellEvent>;
  onTableMoreOptionsColumnButtonClick: CustomEventHandler<TableMoreOptionsColumnMenuClickEvent>;
  onTableMoreOptionsRowButtonClick: CustomEventHandler<TableMoreOptionsRowMenuClickEvent>;
  onAddNewTranslationKey: CustomEventHandler<string>;
}

/**
 * @deprecated TODO 삭제
 * @param params
 */
function useTranslationFileEditorBefore(params: IUseTranslationFileEditorParams): IUseTranslationFileEditor {
  const {
    rows,
    columns = [],
    onChange,
    onAddColumn,
    onDeleteColumn,
    onAddRowAbove,
    onAddRowBelow,
    onAddRow,
    onClearRowContent,
    onDeleteRow,
  } = params;

  const dataTableRef = useRef<DataTable>(null);
  const rowMenuRef = useRef<Menu>(null);
  const columnMenuRef = useRef<Menu>(null);
  const { toastRef } = useToastContext();

  const [mouseHoveredRowIndex, setMouseHoveredRowIndex] = useState<number>();
  const [editRowIndex, setEditRowIndex] = useState<number>();
  const [editColumnHeaderKey, setEditColumnHeaderKey] = useState<ColumnHeaderKey>();

  const [tableExtendDialogData, setTableExtendDialogData] = useState<TableExtendDialogData>({
    ...INITIAL_TABLE_EXTEND_DIALOG_DATA,
  });

  const multiSelectAddingLanguageCode = useMultiSelect({});

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

  const handleCellEditComplete: CustomEventHandler<ColumnEventParams> = (e) => {
    if (!e) return;

    const { originalEvent } = e;
    const { key, shiftKey, ctrlKey, altKey } = originalEvent as KeyboardEvent;

    onChange(e);

    // 엔터 키 입력 시 다음 행에 있는 셀에 focus
    if (key === 'Enter' && !shiftKey && !ctrlKey && !altKey) {
      // @ts-ignore
      const { rowIndex, cellIndex, props } = e;

      const rowElements = dataTableRef.current?.getTable().querySelectorAll('tbody > tr');
      const nextRowElement = rowElements![rowIndex + 1];

      if (!nextRowElement) return;

      const cellElements = nextRowElement.querySelectorAll('td');
      const nextCellElement = cellElements![cellIndex];

      nextCellElement.click();
      setEditRowIndex(props.value[rowIndex + 1].index);
    }
  };

  const handleAddRowSuccess = ({ index, key }: RowData) => {
    setEditRowIndex(index);
    if (key.toLowerCase().includes(inputFilter.value.toLowerCase())) return;
    inputFilter.clear();
  };

  const onCellClick: CustomEventHandler<TableCellEvent> = (e) => {
    if (!e) return;
    const { rowIndex } = e;
    setEditRowIndex(rowIndex);
  };

  const onCellMouseEnter: CustomEventHandler<TableCellEvent> = (e) => {
    if (!e) return;
    const { rowIndex, event } = e;

    if (rowIndex !== editRowIndex) {
      rowMenuRef.current?.hide(event);
    }

    setMouseHoveredRowIndex(rowIndex);
  };

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

  const onAddNewTranslationKey: CustomEventHandler<string> = (key) => {
    if (!key) return;

    onAddRow({
      key,
      onSuccess: handleAddRowSuccess,
    });
  };

  const hasSelectedRow = rows && (editRowIndex || editRowIndex === 0);

  const selectedRow = hasSelectedRow ? rows[editRowIndex] : undefined;

  const isClearableRow = Boolean(
    rows &&
      hasSelectedRow &&
      rows[editRowIndex] &&
      Object.entries(rows[editRowIndex]).filter(([key, value]) => key !== 'key' && key !== 'index' && value).length,
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
    setTableExtendDialogData((prev) => ({
      ...prev,
      ...commonAddColumnDialogProps(),
      onAddLanguageCodes(languageCodes) {
        onAddColumn({ languageCodes: languageCodes as LanguageCode[] });
        hideTableExtendDialog();
      },
    }));
  };

  const handleColumnMenuClickDeleteColumn: CustomEventHandler<SyntheticEvent> = () => {
    onDeleteColumn({ languageCode: editColumnHeaderKey as LanguageCode });
  };

  const handleRowMenuClickCopyTranslationKey: CustomEventHandler = async () => {
    await navigator.clipboard.writeText(rows![editRowIndex!].key);
    toastRef.current?.show({
      severity: 'info',
      detail: '클립보드에 복사되었어요',
    });
  };

  const handleRowMenuClickAddRowAbove: CustomEventHandler<SyntheticEvent> = (e) => {
    setTableExtendDialogData((prev) => ({
      ...prev,
      ...commonAddRowDialogProps(e!),
      onAddKey(key) {
        if (checkInvalidRowAndAlert(key)) return;

        onAddRowAbove({
          index: editRowIndex!,
          key,
          onSuccess: handleAddRowSuccess,
        });

        hideTableExtendDialog();
      },
    }));
  };

  const handleRowMenuClickAddRowBelow: CustomEventHandler<SyntheticEvent> = (e) => {
    setTableExtendDialogData((prev) => ({
      ...prev,
      ...commonAddRowDialogProps(e!),
      onAddKey(key) {
        if (checkInvalidRowAndAlert(key)) return;

        onAddRowBelow({
          index: editRowIndex!,
          key,
          onSuccess: handleAddRowSuccess,
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
    dataTableRef,
    rowMenuRef,
    columnMenuRef,
    mouseHoveredRowIndex,
    editRowIndex,
    selectedRow,
    globalFilterFields,
    isClearableRow,
    tableExtendDialogData,
    multiSelectAddingLanguageCode,
    inputAddingKey,
    filter,
    inputFilter,
    handleTableMouseLeave,
    handleCellEditComplete,
    handleAddColumnClick,
    handleColumnMenuClickDeleteColumn,
    handleRowMenuClickCopyTranslationKey,
    handleRowMenuClickAddRowAbove,
    handleRowMenuClickAddRowBelow,
    handleRowMenuClickClearRowContent,
    handleRowMenuClickDeleteRow,
    onCellClick,
    onCellMouseEnter,
    onTableMoreOptionsColumnButtonClick,
    onTableMoreOptionsRowButtonClick,
    onAddNewTranslationKey,
  };
}

export default useTranslationFileEditorBefore;
