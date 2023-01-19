import { MutableRefObject, useRef, useState } from 'react';
import { PathChangeEvent } from '@components/directorySelector/defines';
import useQueryGetTranslationFile from '@hooks/queries/useQueryGetTranslationFile';
import { DropdownChangeParams } from 'primereact/dropdown';
import useQueryGetContent from '@hooks/queries/useQueryGetContent';
import { CellData, ColumnData, RowData } from 'i18n-editor-common';
import { ColumnEventParams } from 'primereact/column';
import {
  CustomEventHandler,
  TranslationTableRowAddEvent,
  TranslationTableDeleteRowEvent,
  TranslationTableColumnEditEvent,
} from '@defines/event';
import useMutationPatchContent from '@hooks/queries/useMutationPatchContent';
import { useToastContext } from '@contexts/toastContext';
import { confirmDialog } from 'primereact/confirmdialog';
import useMutationPostContentRow from '@hooks/queries/useMutationPostContentRow';
import useMutationDeleteContentRow from '@hooks/queries/useMutationDeleteContentRow';
import useMutationPostContentColumn from '@hooks/queries/useMutationPostContentColumn';

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
  onAddColumn: CustomEventHandler<TranslationTableColumnEditEvent>;
  onAddRowAbove: CustomEventHandler<TranslationTableRowAddEvent>;
  onAddRowBelow: CustomEventHandler<TranslationTableRowAddEvent>;
  onClearRowContent: CustomEventHandler<TranslationTableDeleteRowEvent>;
  onDeleteRow: CustomEventHandler<TranslationTableDeleteRowEvent>;
}

const getNewContentRow = (row: RowData, index: number, key: string): RowData => {
  return Object.keys(row).reduce(
    (acc, prop) => {
      if (prop === 'index' || prop === 'key') return acc;

      return {
        ...acc,
        [prop]: '',
      };
    },
    { index, key },
  ) as RowData;
};

const getRowsBeforePivot = (rows: RowData[], pivotIndex: number) => rows.slice(0, pivotIndex);

const getRowsAfterWithPivot = (rows: RowData[], pivotIndex: number) =>
  rows.slice(pivotIndex).map((row) => ({ ...row, index: row.index + 1 }));

const getNewRowAddedContentRows = (rows: RowData[], currentContentRow: RowData, rowIndex: number, key: string) => [
  ...getRowsBeforePivot(rows, rowIndex),
  getNewContentRow(currentContentRow, rowIndex, key),
  ...getRowsAfterWithPivot(rows, rowIndex),
];

const rowToCell = (row: RowData, getCell: (cell: CellData) => CellData = (cell) => cell): CellData[] => {
  const { key } = row;
  return Object.entries(row)
    .filter(([prop]) => !(prop === 'index' || prop === 'key'))
    .map(([locale, value]) =>
      getCell({
        locale,
        key,
        value: value as string,
      }),
    );
};

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

  const setContent = (columns: ColumnData[], rows: RowData[]) => {
    setContentColumns(columns);
    setContentRows(rows);

    setTimeout(() => {
      tableContainerRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 0);
  };

  useQueryGetContent({
    req: { path: directoryPath, fileName: translationFile || '' },
    queryOption: {
      enabled: Boolean(translationFile) && Boolean(directoryPath),
      retry: false,
      onSuccess({ data }) {
        if (!data) return;
        const { columns, rows } = data;
        setContent(columns, rows);
      },
    },
  });

  const { mutate: mutatePatchContent } = useMutationPatchContent({});
  const { mutate: mutatePostContentRow } = useMutationPostContentRow({});
  const { mutate: mutateDeleteContentRow } = useMutationDeleteContentRow({});
  const { mutate: mutatePostContentColumn } = useMutationPostContentColumn({});

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

    await mutatePatchContent(
      {
        path: directoryPath,
        fileName: translationFile!,
        cells: [
          {
            key,
            value: newValue,
            locale: field,
          },
        ],
      },
      {
        onSuccess() {
          setContentRows((prevRows) => {
            prevRows![index] = newRowData;
            return prevRows;
          });

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
            detail: `변경 사항 저장 중 오류가 발생했어요\n계속해서 같은 오류가 발생한다면 새로고침 해주세요${
              errorMessage ? `\nerror message: ${errorMessage}` : ''
            }`,
            life: 3000,
          });
        },
      },
    );
  };

  const onAddColumn: CustomEventHandler<TranslationTableColumnEditEvent> = (e) => {
    if (!e) return;

    const { languageCode } = e;

    mutatePostContentColumn(
      {
        path: directoryPath,
        fileName: translationFile!,
        languageCode,
      },
      {
        onSuccess({ data }) {
          if (!data) return;
          const { columns, rows } = data;
          setContent(columns, rows);
        },
      },
    );
  };

  // 위쪽에 행 추가
  const onAddRowAbove: CustomEventHandler<TranslationTableRowAddEvent> = (e) => {
    if (!e) return;

    const { index, key, onSuccess } = e;

    mutatePostContentRow(
      {
        path: directoryPath,
        fileName: translationFile!,
        row: { index, key },
      },
      {
        onSuccess() {
          setContentRows((prev) => getNewRowAddedContentRows(prev!, prev![index], index, key));
          toastRef.current?.show({
            severity: 'success',
            detail: '행을 추가했어요',
            life: 3000,
          });
          onSuccess?.(index);
        },
      },
    );
  };

  // 아래쪽에 행 추가
  const onAddRowBelow: CustomEventHandler<TranslationTableRowAddEvent> = (e) => {
    if (!e) return;

    const { index, key, onSuccess } = e;
    const rowIndex = index + 1;

    mutatePostContentRow(
      {
        path: directoryPath,
        fileName: translationFile!,
        row: { index: rowIndex, key },
      },
      {
        onSuccess() {
          setContentRows((prev) => getNewRowAddedContentRows(prev!, prev![index], index + 1, key));
          toastRef.current?.show({
            severity: 'success',
            detail: '행을 추가했어요',
            life: 3000,
          });
          onSuccess?.(rowIndex);
        },
      },
    );
  };

  // 행 내용 지우기
  const onClearRowContent: CustomEventHandler<TranslationTableDeleteRowEvent> = (e) => {
    if (!e) return;
    const { index, position } = e;

    confirmDialog({
      header: '선택된 행의 내용을 지우시겠어요?',
      message: `${contentRows![index].key}에 해당하는 모든 번역값을 초기화합니다`,
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      position,
      className: 'delete-row-dialog',
      accept() {
        mutatePatchContent(
          {
            path: directoryPath,
            fileName: translationFile!,
            cells: rowToCell(contentRows![index], (cell) => ({ ...cell, value: '' })),
          },
          {
            onSuccess() {
              setContentRows((prev) => prev!.map((row) => (index === row.index ? getNewContentRow(row, row.index, row.key) : row)));
              toastRef.current?.show({
                severity: 'success',
                detail: '행의 모든 내용을 지웠어요',
                life: 3000,
              });
            },
          },
        );
      },
    });
  };

  // 행 삭제
  const onDeleteRow: CustomEventHandler<TranslationTableDeleteRowEvent> = (e) => {
    if (!e) return;
    const { index, position } = e;

    confirmDialog({
      header: '선택된 행을 삭제하시겠어요?',
      message: `${contentRows![index].key} 키가 삭제됩니다.`,
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      position,
      className: 'delete-row-dialog',
      accept() {
        mutateDeleteContentRow(
          {
            path: directoryPath,
            fileName: translationFile!,
            key: contentRows![index].key,
          },
          {
            onSuccess() {
              setContentRows((prev) => [
                ...prev!.slice(0, index),
                ...prev!.slice(index + 1).map((row) => ({ ...row, index: row.index - 1 })),
              ]);
              toastRef.current?.show({
                severity: 'success',
                detail: '행을 삭제했어요',
                life: 3000,
              });
            },
          },
        );
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
    onAddColumn,
    onAddRowAbove,
    onAddRowBelow,
    onClearRowContent,
    onDeleteRow,
  };
}

export default useHome;
