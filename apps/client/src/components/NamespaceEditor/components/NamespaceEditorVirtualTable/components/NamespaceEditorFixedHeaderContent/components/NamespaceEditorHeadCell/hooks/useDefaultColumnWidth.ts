import { SIDEBAR_WIDTH } from '@components/Layout/defines/size';
import { useLayoutStore } from '@components/Layout/stores';
import { useColumns } from '@components/NamespaceEditor/providers/ColumnProvider';

const MENU_COLUMN_WIDTH = 66;

function useDefaultColumnWidth(isMenuColumn: boolean) {
  const columns = useColumns();

  const sidebarOpened = useLayoutStore(({ sidebarOpened }) => sidebarOpened);
  const innerWidth = window.innerWidth - (sidebarOpened ? SIDEBAR_WIDTH : 0);

  const remainingWidth = 100 - (MENU_COLUMN_WIDTH / innerWidth) * 100;
  const columnWidth = remainingWidth / (columns.length - 1) + '%';

  return isMenuColumn ? `${MENU_COLUMN_WIDTH}px` : columnWidth;
}

export default useDefaultColumnWidth;
