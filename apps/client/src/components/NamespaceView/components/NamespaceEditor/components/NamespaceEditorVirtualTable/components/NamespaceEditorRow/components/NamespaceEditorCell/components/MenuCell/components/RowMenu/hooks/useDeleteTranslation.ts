import useDeleteRow from '@components/NamespaceView/components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/MenuCell/components/RowMenu/hooks/useDeleteRow';
import useConfirmDialog from '@hooks/useConfirmDialog';
import { enqueueClosableSnackbar } from '@utils/snackbar';

function useConfirmDeleteTranslation() {
  const confirmDialog = useConfirmDialog();

  const deleteRow = useDeleteRow();

  return async (rowIndex: number, value: string) => {
    const confirmed = await confirmDialog({
      title: '번역 삭제',
      content: `${value}을(를) 삭제하시겠습니까?`,
      cancelAction: { label: '취소' },
      confirmAction: { label: '삭제' },
    });

    if (!confirmed) return;

    await deleteRow(rowIndex);

    enqueueClosableSnackbar({
      message: `번역 ${value}이(가) 삭제되었습니다.`,
      variant: 'success',
    });
  };
}

export default useConfirmDeleteTranslation;
