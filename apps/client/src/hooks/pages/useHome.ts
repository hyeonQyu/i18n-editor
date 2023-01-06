import { MutableRefObject, useRef, useState } from 'react';
import { DirectorySelectorEventHandler, PathChangeEvent } from '@components/directorySelector/defines';
import useQueryGetTranslationFile from '@hooks/queries/useQueryGetTranslationFile';
import { DropdownChangeParams } from 'primereact/dropdown';
import useQueryGetContent from '@hooks/queries/useQueryGetContent';
import { ColumnData, RowData } from 'i18n-editor-common';

export interface IUseHomeParams {}

export interface IUseHome {
  directoryPath: string;
  translationFiles: string[];
  translationFile: string | undefined;
  hasDirectorySelectorError: boolean;
  contentColumns: ColumnData[] | undefined;
  contentRows: RowData[] | undefined;
  tableContainerRef: MutableRefObject<HTMLDivElement | null>;
  handleDirectoryPathChange: DirectorySelectorEventHandler<PathChangeEvent>;
  handleTranslationFileChange: DirectorySelectorEventHandler<DropdownChangeParams>;
}

function useHome(params: IUseHomeParams): IUseHome {
  const {} = params;

  const [directoryPath, setDirectoryPath] = useState('');
  const [translationFile, setTranslationFile] = useState<string>();

  const [contentColumns, setContentColumns] = useState<ColumnData[]>();
  const [contentRows, setContentRows] = useState<RowData[]>();

  const tableContainerRef = useRef<HTMLDivElement>(null);

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

  const handleDirectoryPathChange: DirectorySelectorEventHandler<PathChangeEvent> = (e) => {
    if (!e) return;
    setDirectoryPath(e.path);
  };

  const handleTranslationFileChange: DirectorySelectorEventHandler<DropdownChangeParams> = (e) => {
    setTranslationFile(e?.value);
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
  };
}

export default useHome;
