import { createContext, ReactNode, useContext } from 'react';

const RowIndexContext = createContext<number>(0);

export const useRowIndex = () => useContext(RowIndexContext);

interface RowIndexProviderProps {
  children: ReactNode;
  rowIndex: number;
}

function RowIndexProvider(props: RowIndexProviderProps) {
  const { rowIndex, children } = props;

  return <RowIndexContext.Provider value={rowIndex}>{children}</RowIndexContext.Provider>;
}

export default RowIndexProvider;
