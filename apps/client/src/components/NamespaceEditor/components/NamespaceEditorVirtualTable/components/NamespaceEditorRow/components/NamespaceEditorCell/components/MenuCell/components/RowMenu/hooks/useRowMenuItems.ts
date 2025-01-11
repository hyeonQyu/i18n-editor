import { useRowIndex } from '@components/NamespaceEditor/providers/RowIndexProvider';
import { MenuItemProps } from '@defines/menu';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';

function useRowMenuItems(): MenuItemProps[] {
  const rowIndex = useRowIndex();

  return [
    {
      label: '위에 행 추가',
      onClick: () => {},
      IconComponent: NorthIcon,
    },
    {
      label: '아래에 행 추가',
      onClick: () => {},
      IconComponent: SouthIcon,
    },
  ];
}

export default useRowMenuItems;
