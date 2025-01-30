import useDeleteLanguageCode from '@hooks/language/useDeleteLanguageCode';
import useConfirmDialog from '@hooks/useConfirmDialog';
import useWorkspaceId from '@hooks/workspace/useWorkspaceId';
import { enqueueClosableSnackbar } from '@utils/snackbar';
import { LanguageCode } from 'i18n-editor-common';

function useConfirmDeleteLanguageClickHandler() {
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

    await deleteLanguageCode({ id: workspaceId, languageCode });

    enqueueClosableSnackbar({
      message: `${languageCode}을(를) 삭제하였습니다.`,
      variant: 'success',
    });
  };
}

export default useConfirmDeleteLanguageClickHandler;
