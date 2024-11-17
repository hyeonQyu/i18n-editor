import { useTranslationFileEditorContext } from '../../../contexts/translationFileEditorContext';
import { MenuItem } from 'primereact/menuitem';

export interface IUseTableMoreOptionsColumnMenuParams {}

export interface IUseTableMoreOptionsColumnMenu {
  items: MenuItem[];
}
/**
 * @deprecated
 */
function useTableMoreOptionsColumnMenu(params: IUseTableMoreOptionsColumnMenuParams): IUseTableMoreOptionsColumnMenu {
  const {} = params;
  const { handleColumnMenuClickDeleteColumn } = useTranslationFileEditorContext();

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
