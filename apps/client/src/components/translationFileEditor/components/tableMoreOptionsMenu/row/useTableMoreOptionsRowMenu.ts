import { MenuItem } from 'primereact/menuitem';
import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';

export interface IUseTableMoreOptionsRowMenuParams {}

export interface IUseTableMoreOptionsRowMenu {
  items: MenuItem[];
}

function useTableMoreOptionsRowMenu(params: IUseTableMoreOptionsRowMenuParams): IUseTableMoreOptionsRowMenu {
  const {} = params;
  const {
    isClearableRow,
    handleRowMenuClickCopyTranslationKey,
    handleRowMenuClickAddRowAbove,
    handleRowMenuClickAddRowBelow,
    handleRowMenuClickClearRowContent,
    handleRowMenuClickDeleteRow,
  } = useTranslationFileEditorContext();

  const items: MenuItem[] = [
    {
      label: '번역 key 값 복사',
      icon: 'pi pi-clone',
      command() {
        handleRowMenuClickCopyTranslationKey();
      },
    },
    {
      label: '위쪽에 새 번역 추가',
      icon: 'pi pi-arrow-up',
      command(e) {
        handleRowMenuClickAddRowAbove(e.originalEvent);
      },
    },
    {
      label: '아래쪽에 새 번역 추가',
      icon: 'pi pi-arrow-down',
      command(e) {
        handleRowMenuClickAddRowBelow(e.originalEvent);
      },
    },
    {
      label: '번역 값 지우기',
      icon: 'pi pi-eraser',
      disabled: !isClearableRow,
      command(e) {
        handleRowMenuClickClearRowContent(e.originalEvent);
      },
    },
    {
      label: '번역 삭제',
      icon: 'pi pi-trash',
      command(e) {
        handleRowMenuClickDeleteRow(e.originalEvent);
      },
    },
  ];

  return {
    items,
  };
}

export default useTableMoreOptionsRowMenu;
