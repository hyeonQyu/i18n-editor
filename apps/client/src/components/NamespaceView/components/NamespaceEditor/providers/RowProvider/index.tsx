import { RowData } from '@components/NamespaceView/components/NamespaceEditor/defines/table';
import { createCell } from '@components/NamespaceView/components/NamespaceEditor/utils/cell';
import { createContext, ReactNode, useContext, useMemo } from 'react';

interface RowContextProps {
  row: RowData;
  rowIndex: number;
}

const RowContext = createContext<RowContextProps>({
  row: { key: createCell('') },
  rowIndex: 0,
});

export const useRow = () => useContext(RowContext).row;

export const useRowIndex = () => useContext(RowContext).rowIndex;

interface RowProviderProps {
  children: ReactNode;
  rowIndex: number;
  row: RowData;
}

function RowProvider(props: RowProviderProps) {
  const { rowIndex, row, children } = props;

  return <RowContext.Provider value={useMemo(() => ({ row, rowIndex }), [row, rowIndex])}>{children}</RowContext.Provider>;
}

export default RowProvider;
