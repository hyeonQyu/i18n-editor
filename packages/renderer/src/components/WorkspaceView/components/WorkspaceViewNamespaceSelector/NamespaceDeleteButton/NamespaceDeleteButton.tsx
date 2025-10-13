import { useConfirmDialog } from '@/hooks/common/useConfirmDialog';
import { useDeleteNamespace, useInvalidateGetAllNamespacesQuery } from '@/hooks/domains/namespace';
import { useWorkspaceId } from '@/hooks/domains/workspace';
import { enqueueClosableSnackbar } from '@/utils/snackbar.utils';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import { MouseEventHandler } from 'react';

interface NamespaceDeleteButtonProps {
  namespace: string;
}

function NamespaceDeleteButton({ namespace }: NamespaceDeleteButtonProps) {
  const workspaceId = useWorkspaceId();

  const confirmDialog = useConfirmDialog();

  const deleteNamespace = useDeleteNamespace();

  const invalidateNamespaces = useInvalidateGetAllNamespacesQuery();

  const getClickHandler: (namespace: string) => MouseEventHandler<HTMLButtonElement> = (namespace) => async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (!workspaceId) return;

    const confirmed = await confirmDialog({
      title: '네임스페이스 삭제',
      content: `${namespace}을(를) 삭제하시겠습니까?\n워크스페이스에서 삭제됩니다.`,
      cancelAction: { label: '취소' },
      confirmAction: { label: '삭제', color: 'error' },
    });

    if (!confirmed) return;

    await deleteNamespace({ workspaceId, namespace });

    enqueueClosableSnackbar({
      message: `네임스페이스 ${namespace}이(가) 삭제되었습니다.`,
      variant: 'success',
    });

    await invalidateNamespaces(workspaceId);
  };

  return (
    <IconButton className="namespace-delete-button" onClick={getClickHandler(namespace)}>
      <DeleteForeverIcon color="error" />
    </IconButton>
  );
}

export default NamespaceDeleteButton;
