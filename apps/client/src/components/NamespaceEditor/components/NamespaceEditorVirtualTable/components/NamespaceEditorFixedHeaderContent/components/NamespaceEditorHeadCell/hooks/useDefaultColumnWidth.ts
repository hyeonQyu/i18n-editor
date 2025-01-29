import { SIDEBAR_WIDTH } from '@components/Layout/defines/size';
import { useLayoutStore } from '@components/Layout/stores';
import { useColumns } from '@components/NamespaceEditor/providers/ColumnProvider';
import { useEffect, useState } from 'react';

const MENU_COLUMN_WIDTH = 66;

function useDefaultColumnWidth(isMenuColumn: boolean) {
  const columns = useColumns();
  const sidebarOpened = useLayoutStore(({ sidebarOpened }) => sidebarOpened);
  const [columnWidth, setColumnWidth] = useState(isMenuColumn ? `${MENU_COLUMN_WIDTH}px` : '0%');

  useEffect(() => {
    const innerWidth = window.innerWidth - (sidebarOpened ? SIDEBAR_WIDTH : 0);
    const remainingWidth = 100 - (MENU_COLUMN_WIDTH / innerWidth) * 100;
    const calculatedWidth = isMenuColumn ? `${MENU_COLUMN_WIDTH}px` : `${remainingWidth / (columns.length - 1)}%`;

    setColumnWidth(calculatedWidth);
  }, [columns.length, isMenuColumn, sidebarOpened]);

  return columnWidth;
}

export default useDefaultColumnWidth;
