import { MutableRefObject, useRef, useState } from 'react';
import { PathChangeEvent } from '@components/directorySelector/defines';
import useQueryGetTranslationFile from '@hooks/queries/useQueryGetTranslationFile';
import { DropdownChangeParams } from 'primereact/dropdown';
import useQueryGetContent from '@hooks/queries/useQueryGetContent';
import { ColumnData, RowData } from 'i18n-editor-common';
import { ColumnEventParams } from 'primereact/column';
import { CustomEventHandler } from '@defines/event';
import useMutationPutContent from '@hooks/queries/useMutationPutContent';
import { useToastContext } from '@contexts/toastContext';

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
}

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
    const { key } = newRowData;

    setContentRows((prevRows) => {
      return prevRows?.map((rowData) => {
        return rowData.key === newRowData.key ? newRowData : rowData;
      });
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
  };
}

export default useHome;
