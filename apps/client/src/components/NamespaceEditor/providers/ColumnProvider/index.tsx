import { ColumnData, EMPTY_COLUMNS } from '@components/NamespaceEditor/defines/table';
import useNamespaceToColumns from '@components/NamespaceEditor/providers/ColumnProvider/hooks/useNamespaceToColumns';
import { createContext, ReactNode, useContext } from 'react';

const ColumnsContext = createContext<ColumnData[]>(EMPTY_COLUMNS);

export const useColumns = () => useContext(ColumnsContext);

interface ColumnsProviderProps {
  children: ReactNode;
}

function ColumnProvider(props: ColumnsProviderProps) {
  const { children } = props;

  const columns = useNamespaceToColumns();

  return <ColumnsContext.Provider value={columns}>{children}</ColumnsContext.Provider>;
}

export default ColumnProvider;
