import useAddRow from '@components/NamespaceView/components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/MenuCell/components/RowMenu/hooks/useAddRow';
import useConfirmDeleteTranslation from '@components/NamespaceView/components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/MenuCell/components/RowMenu/hooks/useDeleteTranslation';
import { useRowIndex } from '@components/NamespaceView/components/NamespaceEditor/providers/RowProvider';
import { useRows } from '@components/NamespaceView/components/NamespaceEditor/providers/RowsProvider';
import { MenuItemProps } from '@defines/menu';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import { useTheme } from '@mui/material';

function useRowMenuItems(): MenuItemProps[] {
  const {
    palette: { error },
  } = useTheme();

  const rows = useRows();
  const rowIndex = useRowIndex();
  const key = rows[rowIndex].key?.value;

  const addRow = useAddRow();

  const deleteTranslation = useConfirmDeleteTranslation();

  return [
    {
      label: '위에 번역 추가',
      onClick: () => addRow(rowIndex, { pivotTranslationKey: key, direction: 'prev' }),
      IconComponent: NorthIcon,
    },
    {
      label: '아래에 번역 추가',
      onClick: () => addRow(rowIndex + 1, { pivotTranslationKey: key, direction: 'next' }),
      IconComponent: SouthIcon,
    },
    {
      label: '번역 삭제',
      onClick: () => deleteTranslation(rowIndex, key),
      IconComponent: DeleteForeverIcon,
      color: error.light,
    },
  ];
}

export default useRowMenuItems;
