import useAddRow from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/MenuCell/components/RowMenu/hooks/useAddRow';
import { useTranslationDeleteConfirmDialogStore } from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/MenuCell/components/RowMenu/stores/delete';
import { useRowIndex } from '@components/NamespaceEditor/providers/RowIndexProvider';
import { MenuItemProps } from '@defines/menu';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import { useTheme } from '@mui/material';

function useRowMenuItems(): MenuItemProps[] {
  const {
    palette: { error },
  } = useTheme();

  const rowIndex = useRowIndex();

  const addRow = useAddRow();

  const openTranslationDeleteConfirmDialog = useTranslationDeleteConfirmDialogStore(({ open }) => open);

  return [
    {
      label: '위에 번역 추가',
      onClick: () => addRow(rowIndex),
      IconComponent: NorthIcon,
    },
    {
      label: '아래에 번역 추가',
      onClick: () => addRow(rowIndex + 1),
      IconComponent: SouthIcon,
    },
    {
      label: '번역 삭제',
      onClick: () => openTranslationDeleteConfirmDialog(() => ({ rowIndex })),
      IconComponent: DeleteForeverIcon,
      color: error.light,
    },
  ];
}

export default useRowMenuItems;
