import { ColumnData, EMPTY_COLUMNS } from '@components/NamespaceView/components/NamespaceEditor/defines/table';
import { languageCodesToColumns } from '@components/NamespaceView/components/NamespaceEditor/providers/ColumnProvider/utils/columns';
import useLanguageCodes from '@hooks/language/useLanguageCodes';
import { createContext, ReactNode, useContext } from 'react';

const ColumnsContext = createContext<ColumnData[]>(EMPTY_COLUMNS);

export const useColumns = () => useContext(ColumnsContext);

interface ColumnsProviderProps {
  children: ReactNode;
}

function ColumnProvider(props: ColumnsProviderProps) {
  const { children } = props;

  const languageCodes = useLanguageCodes();

  const columns = languageCodesToColumns(languageCodes);

  return <ColumnsContext.Provider value={columns}>{children}</ColumnsContext.Provider>;
}

export default ColumnProvider;
