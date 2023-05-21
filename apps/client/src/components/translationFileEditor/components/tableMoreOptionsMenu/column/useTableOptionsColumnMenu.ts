import { TableMoreOptionsColumnMenuProps } from '@components/translationFileEditor/components/tableMoreOptionsMenu/column';
import { CustomEventHandler } from '@defines/event';
import { RefObject, SyntheticEvent } from 'react';
import useEditColumn from '@components/translationFileEditor/hooks/useEditColumn';
import { confirmDialog } from 'primereact/confirmdialog';
import { DeleteColumnConfirmMessageTemplate } from '@components/page/home/deleteColumnConfirmMessageTemplate';
import { useRecoilValue } from 'recoil';
import { translationFileEditorStates } from '@components/translationFileEditor/stores/store';
import { translationFileNameState } from '@stores/store';
import { LanguageCode } from 'i18n-editor-common';
import { Menu } from 'primereact/menu';
import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';

export interface UseTableOptionsColumnMenuParams extends TableMoreOptionsColumnMenuProps {}

export interface UseTableOptionsColumnMenu {
  columnMenuRef: RefObject<Menu> | undefined;
  handleClickDeleteColumn: CustomEventHandler<SyntheticEvent>;
}

export default function useTableOptionsColumnMenu(params: UseTableOptionsColumnMenuParams): UseTableOptionsColumnMenu {
  const {} = params;

  const { deleteColumn } = useEditColumn({});

  const translationFileName = useRecoilValue(translationFileNameState);
  const editColumnHeaderKey = useRecoilValue(translationFileEditorStates.editColumnHeaderKey);

  const { columnMenuRef } = useTranslationFileEditorContext();

  /**
   * 현재 열 삭제
   */
  const handleClickDeleteColumn: CustomEventHandler<SyntheticEvent> = () => {
    confirmDialog({
      header: '선택된 언어를 삭제하시겠어요?',
      message: DeleteColumnConfirmMessageTemplate({
        languageCode: editColumnHeaderKey as LanguageCode,
        translationFileName: translationFileName!,
      }),
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      position: 'top',
      draggable: false,
      className: 'delete-dialog',
      acceptLabel: '네, 삭제할게요',
      rejectLabel: '아니요',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept: deleteColumn,
    });
  };

  return {
    columnMenuRef,
    handleClickDeleteColumn,
  };
}
