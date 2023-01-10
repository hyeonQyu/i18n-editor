import { MutableRefObject, useRef, useState } from 'react';
import { PathChangeEvent } from '@components/directorySelector/defines';
import useQueryGetTranslationFile from '@hooks/queries/useQueryGetTranslationFile';
import { DropdownChangeParams } from 'primereact/dropdown';
import useQueryGetContent from '@hooks/queries/useQueryGetContent';
import { ColumnData, RowData } from 'i18n-editor-common';
import { ColumnEventParams } from 'primereact/column';
import { CustomEventHandler, EditTranslationTableRowEvent } from '@defines/event';
import useMutationPutContent from '@hooks/queries/useMutationPutContent';
import { useToastContext } from '@contexts/toastContext';
import { confirmDialog } from 'primereact/confirmdialog';

export interface IUseHomeParams {}

export interface IUseHome {
  directoryPath: string;
  translationFiles: string[];
  translationFile: string | undefined;
  hasDirectorySelectorError: boolean;
  contentColumns: ColumnData[] | undefined;
  contentRows: RowData[] | undefined;
  tableContainerRef: MutableRefObject<HTMLDivElement | null>;
  handleDirectoryPathChange: CustomEventHandler<PathChangeEvent>;
  handleTranslationFileChange: CustomEventHandler<DropdownChangeParams>;
  handleTranslationContentChange: CustomEventHandler<ColumnEventParams>;
  onAddRowAbove: CustomEventHandler<EditTranslationTableRowEvent>;
  onAddRowBelow: CustomEventHandler<EditTranslationTableRowEvent>;
  onClearRowContent: CustomEventHandler<EditTranslationTableRowEvent>;
  onDeleteRow: CustomEventHandler<EditTranslationTableRowEvent>;
}

const getNewContentRow = (row: RowData, index: number, clearKey: boolean): RowData => {
  return Object.entries(row).reduce(
    (acc, [key, value]) => {
      if (key === 'index') return acc;
      if (!clearKey && key === 'key') {
        return {
          ...acc,
          [key]: value,
        };
      }
      return {
        ...acc,
        [key]: '',
      };
    },
    { index },
  ) as RowData;
};

const getRowsBeforePivot = (rows: RowData[], pivotIndex: number) => rows.slice(0, pivotIndex);

const getRowsAfterWithPivot = (rows: RowData[], pivotIndex: number) =>
  rows.slice(pivotIndex).map((row) => ({ ...row, index: row.index + 1 }));

const getNewRowAddedContentRows = (rows: RowData[], currentContentRow: RowData, rowIndex: number) => [
  ...getRowsBeforePivot(rows, rowIndex),
  getNewContentRow(currentContentRow, rowIndex, true),
  ...getRowsAfterWithPivot(rows, rowIndex),
];

function useHome(params: IUseHomeParams): IUseHome {
  const {} = params;

  const [directoryPath, setDirectoryPath] = useState('');
  const [translationFile, setTranslationFile] = useState<string>();

  const [contentColumns, setContentColumns] = useState<ColumnData[]>();
  const [contentRows, setContentRows] = useState<RowData[]>();

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const { toastRef } = useToastContext();

  const { data: dataGetTranslationFile, error: errorGetTranslationFile } = useQueryGetTranslationFile({
    req: { path: directoryPath },
    queryOption: {
      enabled: Boolean(directoryPath),
      retry: false,
    },
  });

  const translationFiles: string[] = dataGetTranslationFile?.data?.files ?? [];
  const hasDirectorySelectorError = Boolean(errorGetTranslationFile);

  useQueryGetContent({
    req: { path: directoryPath, fileName: translationFile || '' },
    queryOption: {
      enabled: Boolean(translationFile) && Boolean(directoryPath),
      retry: false,
      refetchOnWindowFocus: false,
      onSuccess({ data }) {
        if (!data) return;

        const { columns, rows } = data;
        setContentColumns(columns);
        setContentRows(rows);

        setTimeout(() => {
          tableContainerRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 0);
      },
    },
  });

  const { mutate: mutatePutContent } = useMutationPutContent({
    mutationOption: {
      onSuccess() {
        toastRef.current?.show({
          severity: 'success',
          detail: '변경사항을 저장했어요',
          life: 3000,
        });
      },
      onError(error) {
        const data = error?.response?.data;
        const errorMessage = data?.errorMessage;

        toastRef.current?.show({
          severity: 'error',
          detail: `처리 중 오류가 발생했어요${errorMessage ? `\nerror message: ${errorMessage}` : ''}`,
          life: 3000,
        });
      },
    },
  });

  const handleDirectoryPathChange: CustomEventHandler<PathChangeEvent> = (e) => {
    if (!e) return;
    setDirectoryPath(e.path);
  };

  const handleTranslationFileChange: CustomEventHandler<DropdownChangeParams> = (e) => {
    setTranslationFile(e?.value);
  };

  const handleTranslationContentChange: CustomEventHandler<ColumnEventParams> = async (e) => {
    if (!e) return;
    const { value, newValue, field, newRowData: anyNewRowData } = e;
    if (value === newValue) return;

    const newRowData = anyNewRowData as RowData;
    const { key, index } = newRowData;

    setContentRows((prevRows) => {
      prevRows![index] = newRowData;
      return prevRows;
    });

    await mutatePutContent({
      path: directoryPath,
      fileName: translationFile!,
      cell: {
        key,
        value: newValue,
        locale: field,
      },
    });
  };

  // 위쪽에 행 추가
  const onAddRowAbove: CustomEventHandler<EditTranslationTableRowEvent> = (e) => {
    if (!e) return;
    const { rowIndex } = e;
    setContentRows((prev) => getNewRowAddedContentRows(prev!, prev![rowIndex], rowIndex));
  };

  // 아래쪽에 행 추가
  const onAddRowBelow: CustomEventHandler<EditTranslationTableRowEvent> = (e) => {
    if (!e) return;
    const { rowIndex } = e;
    setContentRows((prev) => getNewRowAddedContentRows(prev!, prev![rowIndex], rowIndex + 1));
  };

  // 행 내용 지우기
  const onClearRowContent: CustomEventHandler<EditTranslationTableRowEvent> = (e) => {
    if (!e) return;
    const { rowIndex } = e;

    confirmDialog({
      header: '선택된 행의 내용을 지우시겠어요?',
      message: `${contentRows![rowIndex].key}에 해당하는 모든 번역값을 초기화합니다`,
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept() {
        setContentRows((prev) => prev!.map((row) => (rowIndex === row.index ? getNewContentRow(row, row.index, false) : row)));
      },
    });
  };

  // 행 삭제
  const onDeleteRow: CustomEventHandler<EditTranslationTableRowEvent> = (e) => {
    if (!e) return;
    const { rowIndex } = e;

    confirmDialog({
      header: '선택된 행을 삭제하시겠어요?',
      message: `${contentRows![rowIndex].key} 키가 삭제됩니다.`,
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept() {
        setContentRows((prev) => [
          ...prev!.slice(0, rowIndex),
          ...prev!.slice(rowIndex + 1).map((row) => ({ ...row, index: row.index - 1 })),
        ]);
      },
    });
  };

  return {
    directoryPath,
    translationFiles,
    translationFile,
    hasDirectorySelectorError,
    contentColumns,
    contentRows,
    tableContainerRef,
    handleDirectoryPathChange,
    handleTranslationFileChange,
    handleTranslationContentChange,
    onAddRowAbove,
    onAddRowBelow,
    onClearRowContent,
    onDeleteRow,
  };
}

export default useHome;
