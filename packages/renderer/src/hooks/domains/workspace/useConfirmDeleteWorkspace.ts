import { useConfirmDialog } from '@/hooks/common';
import { useDeleteWorkspace } from '@/hooks/domains/workspace';
import { enqueueClosableSnackbar } from '@/utils/snackbar.utils';
import { Workspace } from '@i18n-editor/shared';

export const useConfirmDeleteWorkspace = () => {
  const confirmDialog = useConfirmDialog();

  const deleteWorkspace = useDeleteWorkspace();

  return async (workspace: Workspace) => {
    const confirmed = await confirmDialog({
      title: '워크스페이스 삭제',
      content: `${workspace.name}을(를) 삭제하시겠습니까?\n워크스페이스 목록에서 삭제됩니다.`,
      cancelAction: { label: '취소' },
      confirmAction: { label: '삭제', color: 'error' },
    });

    if (!confirmed) return;

    await deleteWorkspace({ id: workspace.id });

    enqueueClosableSnackbar({
      message: `워크스페이스 ${workspace.name}이(가) 삭제되었습니다.`,
      variant: 'success',
    });
  };
};
