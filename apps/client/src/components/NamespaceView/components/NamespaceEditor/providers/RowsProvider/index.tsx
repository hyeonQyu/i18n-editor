import { EMPTY_ROWS, RowData } from '@components/NamespaceView/components/NamespaceEditor/defines/table';
import { translationsToRows } from '@components/NamespaceView/components/NamespaceEditor/providers/RowsProvider/utils/rows';
import { createCell } from '@components/NamespaceView/components/NamespaceEditor/utils/cell';
import useLanguageCodes from '@hooks/language/useLanguageCodes';
import useTranslations from '@hooks/translation/useTranslations';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';

interface RowsContextProps {
  rows: RowData[];
  setRows: Dispatch<SetStateAction<RowData[]>>;
}

const RowsContext = createContext<RowsContextProps>({
  rows: EMPTY_ROWS,
  setRows: () => {},
});

export const useRows = () => {
  const { rows } = useContext(RowsContext);
  return rows;
};

export const useSetRows = () => {
  const { setRows } = useContext(RowsContext);
  return setRows;
};

interface RowsProviderProps {
  children: ReactNode;
}

function RowsProvider(props: RowsProviderProps) {
  const { children } = props;

  const languageCodes = useLanguageCodes();
  const translations = useTranslations();

  const emptyRow: RowData = useMemo(
    () =>
      languageCodes.reduce(
        (acc, code) => {
          acc[code] = createCell('');
          return acc;
        },
        {
          key: createCell(''),
        } as RowData,
      ),
    [languageCodes],
  );

  const [rows, setRows] = useState<RowData[]>([emptyRow]);

  const namespaceRows = useMemo(() => translationsToRows(translations, languageCodes), [translations, languageCodes]);

  useEffect(() => {
    setRows([...namespaceRows, emptyRow]);
  }, [emptyRow, namespaceRows]);

  return (
    <RowsContext.Provider
      value={useMemo(
        () => ({
          rows,
          setRows,
        }),
        [rows, setRows],
      )}
    >
      {children}
    </RowsContext.Provider>
  );
}

export default RowsProvider;
