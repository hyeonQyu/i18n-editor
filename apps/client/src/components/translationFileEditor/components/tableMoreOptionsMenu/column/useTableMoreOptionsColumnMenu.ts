import { MenuItem } from 'primereact/menuitem';
import { useTranslationFileEditorContextBefore } from '@components/translationFileEditor/contexts/translationFileEditorContextBefore';

export interface IUseTableMoreOptionsColumnMenuParams {}

export interface IUseTableMoreOptionsColumnMenu {
  items: MenuItem[];
}

function useTableMoreOptionsColumnMenu(params: IUseTableMoreOptionsColumnMenuParams): IUseTableMoreOptionsColumnMenu {
  const {} = params;
  const { handleColumnMenuClickDeleteColumn } = useTranslationFileEditorContextBefore();

  const items: MenuItem[] = [
    {
      label: '언어 삭제',
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
