import { EMPTY_ROWS, RowData } from '@components/NamespaceEditor/defines/table';
import useNamespaceToRows from '@components/NamespaceEditor/providers/RowsProvider/hooks/useNamespaceToRows';
import { createCell } from '@components/NamespaceEditor/utils/cell';
import useNamespace from '@hooks/namespace/useNamespace';
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

  const namespace = useNamespace();

  const { languageCodes } = namespace;

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

  const namespaceRows = useNamespaceToRows(namespace);

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
