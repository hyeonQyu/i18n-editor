import { EMPTY_ROWS, RowData } from '@components/NamespaceEditor/defines/table';
import useNamespaceToRows from '@components/NamespaceEditor/providers/RowsProvider/hooks/useNamespaceToRows';
import { createContext, ReactNode, useContext } from 'react';

const RowsContext = createContext<RowData[]>(EMPTY_ROWS);

export const useRows = () => useContext(RowsContext);

interface RowsProviderProps {
  children: ReactNode;
}

function RowsProvider(props: RowsProviderProps) {
  const { children } = props;

  const rows = useNamespaceToRows();

  return <RowsContext.Provider value={rows}>{children}</RowsContext.Provider>;
}

export default RowsProvider;
