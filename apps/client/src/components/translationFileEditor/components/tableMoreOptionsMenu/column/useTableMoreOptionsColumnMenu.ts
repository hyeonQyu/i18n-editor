import { MenuItem } from 'primereact/menuitem';
import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';

export interface IUseTableMoreOptionsColumnMenuParams {}

export interface IUseTableMoreOptionsColumnMenu {
  items: MenuItem[];
}

function useTableMoreOptionsColumnMenu(params: IUseTableMoreOptionsColumnMenuParams): IUseTableMoreOptionsColumnMenu {
  const {} = params;
  const { handleColumnMenuClickAddColumnLeft, handleColumnMenuClickAddColumnRight, handleColumnMenuClickDeleteColumn } =
    useTranslationFileEditorContext();

  const items: MenuItem[] = [
    {
      label: '왼쪽에 열 추가',
      icon: 'pi pi-arrow-left',
      command(e) {
        handleColumnMenuClickAddColumnLeft(e.originalEvent);
      },
    },
    {
      label: '오른쪽에 열 추가',
      icon: 'pi pi-arrow-right',
      command(e) {
        handleColumnMenuClickAddColumnRight(e.originalEvent);
      },
    },
    {
      label: '열 삭제',
      icon: 'pi pi-trash',
      command(e) {
        handleColumnMenuClickDeleteColumn(e.originalEvent);
      },
    },
  ];

  return {
    items,
  };
}

export default useTableMoreOptionsColumnMenu;
