import { MouseEventHandler, MutableRefObject, useRef, useState } from 'react';
import { PathChangeEvent } from '@components/directorySelector/defines';
import useQueryGetTranslationFile from '@hooks/queries/useQueryGetTranslationFile';
import { DropdownChangeParams } from 'primereact/dropdown';
import useQueryGetContent from '@hooks/queries/useQueryGetContent';
import { CellData, ColumnData, ErrorMessage, RowData } from 'i18n-editor-common';
import { ColumnEventParams } from 'primereact/column';
import {
  CustomEventHandler,
  TranslationTableRowAddEvent,
  TranslationTableDeleteRowEvent,
  TranslationTableColumnAddEvent,
  TranslationTableColumnDeleteEvent,
  CreateDirectoryEvent,
  TranslationTableNewRowAddEvent,
  CreateTranslationFileEvent,
} from '@defines/event';
import useMutationPatchContent from '@hooks/queries/useMutationPatchContent';
import { useToastContext } from '@contexts/toastContext';
import { confirmDialog } from 'primereact/confirmdialog';
import useMutationPostContentRow from '@hooks/queries/useMutationPostContentRow';
import useMutationDeleteContentRow from '@hooks/queries/useMutationDeleteContentRow';
import useMutationPostContentColumn from '@hooks/queries/useMutationPostContentColumn';
import useMutationDeleteContentColumn from '@hooks/queries/useMutationDeleteContentColumn';
import { DeleteColumnConfirmMessageTemplate } from '@components/page/home/deleteColumnConfirmMessageTemplate';
import { InvalidLocaleDirectoryConfirmMessageTemplate } from '@components/page/home/invalidLocaleDirectoryConfirmMessageTemplate';
import useMutationPostDirectory from '@hooks/queries/useMutationPostDirectory';
import useMutationPostTranslationFile from '@hooks/queries/useMutationPostTranslationFile';
import useInput, { IUseInput } from '@hooks/common/useInput';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '@defines/reactQuery';
import useQueryGetConfig from '@hooks/queries/useQueryGetConfig';

export interface IUseHomeParams {}

export interface IUseHome {
  directoryPath: string | undefined;
  translationFiles: string[];
  translationFile: string | undefined;
  hasDirectorySelectorError: boolean;
  contentColumns: ColumnData[] | undefined;
  contentRows: RowData[] | undefined;
  localeDirectoryCreationDialogOpened: boolean;
  translationFileCreationDialogOpened: boolean;
  isTranslationFileNameDuplicate: boolean;
  isLoadingGetConfig: boolean;
  inputNewTranslationFileName: IUseInput;
  tableContainerRef: MutableRefObject<HTMLDivElement | null>;
  handleDirectoryPathChange: CustomEventHandler<PathChangeEvent>;
  handleTranslationFileChange: CustomEventHandler<DropdownChangeParams>;
  handleCreateLocaleDirectory: CustomEventHandler<CreateDirectoryEvent>;
  handleCloseLocaleDirectoryCreationDialog: CustomEventHandler;
  handleTranslationContentChange: CustomEventHandler<ColumnEventParams>;
  handleAddTranslationFileButtonClick: MouseEventHandler<HTMLButtonElement>;
  handleCreateTranslationFile: CustomEventHandler<CreateTranslationFileEvent>;
  handleCloseTranslationFileCreationDialog: CustomEventHandler;
  onAddColumn: CustomEventHandler<TranslationTableColumnAddEvent>;
  onDeleteColumn: CustomEventHandler<TranslationTableColumnDeleteEvent>;
  onAddRowAbove: CustomEventHandler<TranslationTableRowAddEvent>;
  onAddRowBelow: CustomEventHandler<TranslationTableRowAddEvent>;
  onAddRow: CustomEventHandler<TranslationTableNewRowAddEvent>;
  onClearRowContent: CustomEventHandler<TranslationTableDeleteRowEvent>;
  onDeleteRow: CustomEventHandler<TranslationTableDeleteRowEvent>;
}

const getNewContentRow = (columns: ColumnData[], index: number, key: string): RowData => {
  return columns!
    .filter(({ header }) => !(header === 'key' || header === 'index'))
    .reduce(
      (acc, { header: languageCode }) => ({
        ...acc,
        [languageCode]: '',
      }),
      {
        index,
        key,
      },
    );
};

const getRowsBeforePivot = (rows: RowData[], pivotIndex: number) => rows.slice(0, pivotIndex);

const getRowsAfterWithPivot = (rows: RowData[], pivotIndex: number) =>
  rows.slice(pivotIndex).map((row) => ({ ...row, index: row.index + 1 }));

const getNewRowAddedContentRows = (rows: RowData[], columns: ColumnData[], rowIndex: number, key: string) => [
  ...getRowsBeforePivot(rows, rowIndex),
  getNewContentRow(columns, rowIndex, key),
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

  const queryClient = useQueryClient();

  const [directoryPath, setDirectoryPath] = useState<string>();
  const [translationFile, setTranslationFile] = useState<string>();
  const [translationFileChanged, setTranslationFileChanged] = useState(false);
  const tempTranslationFileRef = useRef<string>();

  const [localeDirectoryCreationDialogOpened, setLocaleDirectoryCreationDialogOpened] = useState(false);
  const [translationFileCreationDialogOpened, setTranslationFileCreationDialogOpened] = useState(false);
  const [isTranslationFileNameDuplicate, setIsTranslationFileNameDuplicate] = useState(false);
  const inputNewTranslationFileName = useInput({
    onChangeValue() {
      setIsTranslationFileNameDuplicate(false);
    },
  });

  const [contentColumns, setContentColumns] = useState<ColumnData[]>();
  const [contentRows, setContentRows] = useState<RowData[]>();

  const tableContainerRef = useRef<HTMLDivElement>(null);
  const { toastRef } = useToastContext();

  const { isLoading: isLoadingGetConfig } = useQueryGetConfig({
    queryOption: {
      refetchOnWindowFocus: false,
      onSuccess({ data }) {
        if (!data) return;
        setDirectoryPath(data.config.localeDirectoryPath);
      },
    },
  });

  const { data: dataGetTranslationFile, error: errorGetTranslationFile } = useQueryGetTranslationFile({
    req: { path: directoryPath! },
    queryOption: {
      enabled: Boolean(directoryPath) && !localeDirectoryCreationDialogOpened,
      retry: false,
      onSettled() {
        if (translationFile) return;

        setTranslationFile(tempTranslationFileRef.current);
        tempTranslationFileRef.current = undefined;
      },
      onError(error) {
        if ((error.response?.data.errorMessage as ErrorMessage) === 'INVALID_LOCALE_DIRECTORY') {
          setContent(undefined, undefined);

          confirmDialog({
            header: '언어 코드명으로 디렉토리를 만드시겠어요?',
            message: InvalidLocaleDirectoryConfirmMessageTemplate({}),
            icon: 'pi pi-info-circle',
            position: 'top',
            draggable: false,
            className: 'delete-dialog',
            acceptLabel: '네, 생성할게요',
            rejectLabel: '아니요',
            acceptIcon: 'pi pi-check',
            rejectIcon: 'pi pi-times',
            accept() {
              setLocaleDirectoryCreationDialogOpened(true);
            },
            onHide(result: string) {
              if (result === 'accept') return;

              toastRef.current?.show({
                severity: 'error',
                detail: 'Locale 디렉토리를 다시 선택하세요',
                life: 3000,
              });
            },
          });
        }
      },
    },
  });

  const translationFiles: string[] = dataGetTranslationFile?.data?.files ?? [];
  const hasDirectorySelectorError = Boolean(errorGetTranslationFile);

  const setContent = (columns: ColumnData[] | undefined, rows: RowData[] | undefined, scrollToTable?: boolean) => {
    setContentColumns(columns);
    setContentRows(rows);

    // 스크롤 기능 임시 해제, TODO 설정에서 변경하도록 수정 예정
    // if (scrollToTable && columns && rows) {
    //   setTimeout(() => {
    //     tableContainerRef.current?.scrollIntoView({
    //       behavior: 'smooth',
    //       block: 'start',
    //     });
    //   }, 0);
    // }
  };

  useQueryGetContent({
    req: { path: directoryPath!, fileName: translationFile || '' },
    queryOption: {
      enabled: Boolean(translationFile) && Boolean(directoryPath),
      retry: false,
      onSuccess({ data }) {
        if (!data) return;
        const { columns, rows } = data;
        setContent(columns, rows, translationFileChanged);
        setTranslationFileChanged(false);
      },
    },
  });

  const { mutate: mutatePostDirectory } = useMutationPostDirectory({});
  const { mutate: mutatePostTranslationFile } = useMutationPostTranslationFile({});
  const { mutate: mutatePatchContent } = useMutationPatchContent({});
  const { mutate: mutatePostContentRow } = useMutationPostContentRow({});
  const { mutate: mutateDeleteContentRow } = useMutationDeleteContentRow({});
  const { mutate: mutatePostContentColumn } = useMutationPostContentColumn({});
  const { mutate: mutateDeleteContentColumn } = useMutationDeleteContentColumn({});

  const handleDirectoryPathChange: CustomEventHandler<PathChangeEvent> = (e) => {
    if (!e) return;
    setDirectoryPath(e.path);
    setTranslationFile(undefined);
  };

  const handleTranslationFileChange: CustomEventHandler<DropdownChangeParams> = (e) => {
    setTranslationFile(e?.value);
    setTranslationFileChanged(true);
  };

  const handleCreateLocaleDirectory: CustomEventHandler<CreateDirectoryEvent> = (e) => {
    if (!e) return;

    const { fileName, directoryNames } = e;

    mutatePostDirectory(
      {
        path: directoryPath!,
        fileName: `${fileName}.json`,
        directoryNames,
      },
      {
        onSettled() {
          setLocaleDirectoryCreationDialogOpened(false);
        },
        onSuccess({ data }) {
          if (!data) return;

          toastRef.current?.show({
            severity: 'success',
            detail: '디렉토리와 파일을 생성했어요',
            life: 3000,
          });

          tempTranslationFileRef.current = data.fileName;
        },
      },
    );
  };

  const handleCloseLocaleDirectoryCreationDialog = () => {
    toastRef.current?.show({
      severity: 'error',
      detail: 'Locale 디렉토리를 다시 선택하세요',
      life: 3000,
    });

    setLocaleDirectoryCreationDialogOpened(false);
  };

  const handleTranslationContentChange: CustomEventHandler<ColumnEventParams> = async (e) => {
    if (!e) return;
    const { value, newValue, field, newRowData: anyNewRowData } = e;
    if (value === newValue) return;

    const newRowData = anyNewRowData as RowData;
    const { key, index } = newRowData;

    await mutatePatchContent(
      {
        path: directoryPath!,
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
      },
    );
  };

  const handleAddTranslationFileButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    setTranslationFileCreationDialogOpened(true);
  };

  const handleCreateTranslationFile: CustomEventHandler<CreateTranslationFileEvent> = (e) => {
    if (!e) return;

    const { fileName } = e;

    mutatePostTranslationFile(
      {
        path: directoryPath!,
        fileName: `${fileName}.json`,
      },
      {
        async onSuccess() {
          queryClient.invalidateQueries(QUERY_KEY.translationFile.base);

          toastRef.current?.show({
            severity: 'success',
            detail: '새로운 번역 파일을 생성했어요',
            life: 3000,
          });

          setTranslationFileCreationDialogOpened(false);
        },
        onError(error) {
          if ((error.response?.data.errorMessage as ErrorMessage) === 'EXIST_FILE_NAME') {
            setIsTranslationFileNameDuplicate(true);
          }
        },
      },
    );
  };

  const handleCloseTranslationFileCreationDialog = () => {
    setTranslationFileCreationDialogOpened(false);
  };

  // 열 추가
  const onAddColumn: CustomEventHandler<TranslationTableColumnAddEvent> = (e) => {
    if (!e) return;

    const { languageCodes } = e;

    mutatePostContentColumn(
      {
        path: directoryPath!,
        fileName: translationFile!,
        languageCodes,
      },
      {
        onSuccess({ data }) {
          if (!data) return;
          const { columns, rows } = data;

          setContent(columns, rows);

          toastRef.current?.show({
            severity: 'success',
            detail: '언어를 추가했어요',
            life: 3000,
          });
        },
      },
    );
  };

  // 열 삭제
  const onDeleteColumn: CustomEventHandler<TranslationTableColumnDeleteEvent> = (e) => {
    if (!e) return;
    const { languageCode } = e;

    confirmDialog({
      header: '선택된 언어를 삭제하시겠어요?',
      message: DeleteColumnConfirmMessageTemplate({ languageCode, translationFile: translationFile! }),
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      position: 'top',
      draggable: false,
      className: 'delete-dialog',
      acceptLabel: '네, 삭제할게요',
      rejectLabel: '아니요',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept() {
        mutateDeleteContentColumn(
          {
            path: directoryPath!,
            fileName: translationFile!,
            languageCode,
          },
          {
            onSuccess({ data }) {
              if (!data) return;

              const { columns, rows } = data;

              setContent(columns, rows);
              toastRef.current?.show({
                severity: 'success',
                detail: '언어를 삭제했어요',
                life: 3000,
              });
            },
          },
        );
      },
    });
  };

  // 위쪽에 새 번역 추가
  const onAddRowAbove: CustomEventHandler<TranslationTableRowAddEvent> = (e) => {
    if (!e) return;
    const { index, key, onSuccess } = e;

    mutatePostContentRow(
      {
        path: directoryPath!,
        fileName: translationFile!,
        row: { index, key },
      },
      {
        onSuccess({ data }) {
          setContentRows((prev) => getNewRowAddedContentRows(prev!, contentColumns!, index, key));

          toastRef.current?.show({
            severity: 'success',
            detail: '행을 추가했어요',
            life: 3000,
          });

          onSuccess?.(data!.row);
        },
      },
    );
  };

  // 아래쪽에 새 번역 추가
  const onAddRowBelow: CustomEventHandler<TranslationTableRowAddEvent> = (e) => {
    if (!e) return;
    const { index, key, onSuccess } = e;
    const rowIndex = index + 1;

    mutatePostContentRow(
      {
        path: directoryPath!,
        fileName: translationFile!,
        row: { index: rowIndex, key },
      },
      {
        onSuccess({ data }) {
          setContentRows((prev) => getNewRowAddedContentRows(prev!, contentColumns!, index + 1, key));

          toastRef.current?.show({
            severity: 'success',
            detail: '행을 추가했어요',
            life: 3000,
          });

          onSuccess?.(data!.row);
        },
      },
    );
  };

  const onAddRow: CustomEventHandler<TranslationTableNewRowAddEvent> = (e) => {
    if (!e) return;
    const { key, onSuccess } = e;

    const index = contentRows!.length;

    mutatePostContentRow(
      {
        path: directoryPath!,
        fileName: translationFile!,
        row: { index, key },
      },
      {
        onSuccess({ data }) {
          setContentRows((prev) => [...prev!, getNewContentRow(contentColumns!, index, key)]);

          toastRef.current?.show({
            severity: 'success',
            detail: '행을 추가했어요',
            life: 3000,
          });

          onSuccess?.(data!.row);
        },
      },
    );
  };

  // 번역 값 지우기
  const onClearRowContent: CustomEventHandler<TranslationTableDeleteRowEvent> = (e) => {
    if (!e) return;
    const { index, position } = e;

    confirmDialog({
      header: '선택된 행의 내용을 지우시겠어요?',
      message: `${contentRows![index].key}에 해당하는 모든 번역값을 초기화해요`,
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      position,
      draggable: false,
      className: 'delete-dialog',
      acceptLabel: '네, 지울래요',
      rejectLabel: '아니요',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept() {
        mutatePatchContent(
          {
            path: directoryPath!,
            fileName: translationFile!,
            cells: rowToCell(contentRows![index], (cell) => ({ ...cell, value: '' })),
          },
          {
            onSuccess() {
              setContentRows((prev) =>
                prev!.map((row) => (index === row.index ? getNewContentRow(contentColumns!, row.index, row.key) : row)),
              );

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

  // 번역 삭제
  const onDeleteRow: CustomEventHandler<TranslationTableDeleteRowEvent> = (e) => {
    if (!e) return;
    const { index, position } = e;

    confirmDialog({
      header: '선택된 행을 삭제하시겠어요?',
      message: `${contentRows![index].key} 키를 삭제해요`,
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      position,
      draggable: false,
      className: 'delete-dialog',
      acceptLabel: '네, 삭제할게요',
      rejectLabel: '아니요',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept() {
        mutateDeleteContentRow(
          {
            path: directoryPath!,
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
    localeDirectoryCreationDialogOpened,
    translationFileCreationDialogOpened,
    isTranslationFileNameDuplicate,
    isLoadingGetConfig,
    inputNewTranslationFileName,
    tableContainerRef,
    handleDirectoryPathChange,
    handleTranslationFileChange,
    handleCreateLocaleDirectory,
    handleCloseLocaleDirectoryCreationDialog,
    handleTranslationContentChange,
    handleAddTranslationFileButtonClick,
    handleCreateTranslationFile,
    handleCloseTranslationFileCreationDialog,
    onAddColumn,
    onDeleteColumn,
    onAddRowAbove,
    onAddRowBelow,
    onAddRow,
    onClearRowContent,
    onDeleteRow,
  };
}

export default useHome;
