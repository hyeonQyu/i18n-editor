import { useConfirmDialog } from '@/hooks/common';
import { useNamespace } from '@/hooks/domains/namespace';
import { useDeleteTranslation } from '@/hooks/domains/translation';
import { useWorkspaceId } from '@/hooks/domains/workspace';
import { enqueueClosableSnackbar } from '@/utils/snackbar.utils';
import { Button, SxProps } from '@mui/material';

interface TranslationDeleteButtonProps {
  translationKey: string;
  sx?: SxProps;
}

function TranslationDeleteButton({ sx, translationKey }: TranslationDeleteButtonProps) {
  const workspaceId = useWorkspaceId();
  const namespace = useNamespace();

  const confirmDialog = useConfirmDialog();

  const deleteTranslation = useDeleteTranslation();

  const handleClick = async () => {
    const confirmed = await confirmDialog({
      title: '번역 삭제',
      content: `${translationKey}을(를) 삭제하시겠습니까?`,
      cancelAction: { label: '취소' },
      confirmAction: { label: '삭제' },
    });

    if (!confirmed) return;

    await deleteTranslation({ workspaceId, namespace, translationKey });

    enqueueClosableSnackbar({
      message: `번역 ${translationKey}이(가) 삭제되었습니다.`,
      variant: 'success',
    });
  };

  return (
    <Button color="error" variant="contained" size="small" sx={sx} onClick={handleClick}>
      삭제
    </Button>
  );
}

export default TranslationDeleteButton;
