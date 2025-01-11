import useAddRow from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/MenuCell/components/RowMenu/hooks/useAddRow';
import { useRowIndex } from '@components/NamespaceEditor/providers/RowIndexProvider';
import { MenuItemProps } from '@defines/menu';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';

function useRowMenuItems(): MenuItemProps[] {
  const rowIndex = useRowIndex();

  const addRow = useAddRow();

  return [
    {
      label: '위에 행 추가',
      onClick: () => {
        addRow(rowIndex);
      },
      IconComponent: NorthIcon,
    },
    {
      label: '아래에 행 추가',
      onClick: () => {
        addRow(rowIndex + 1);
      },
      IconComponent: SouthIcon,
    },
  ];
}

export default useRowMenuItems;
