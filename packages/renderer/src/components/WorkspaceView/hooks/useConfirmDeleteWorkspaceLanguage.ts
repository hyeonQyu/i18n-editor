import { useConfirmDialog } from '@/hooks/common';
import { useDeleteLanguageCode } from '@/hooks/domains/language';
import { useWorkspaceId } from '@/hooks/domains/workspace';
import { enqueueClosableSnackbar } from '@/utils/snackbar.utils';
import { LanguageCode } from '@i18n-editor/shared';

export const useConfirmDeleteWorkspaceLanguage = () => {
  const workspaceId = useWorkspaceId();

  const confirmDialog = useConfirmDialog();

  const deleteLanguageCode = useDeleteLanguageCode();

  return async (languageCode: LanguageCode) => {
    if (!workspaceId) return;
    const confirmed = await confirmDialog({
      title: '언어 삭제',
      content: `${languageCode}을(를) 삭제하시겠습니까?`,
      cancelAction: {
        label: '취소',
      },
      confirmAction: {
        label: '삭제',
        color: 'error',
      },
    });

    if (!confirmed) return;

    await deleteLanguageCode({ workspaceId, languageCode });

    enqueueClosableSnackbar({
      message: `${languageCode}을(를) 삭제하였습니다.`,
      variant: 'success',
    });
  };
};
