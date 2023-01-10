import { MenuItem } from 'primereact/menuitem';
import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';

export interface IUseTableMoreOptionsRowMenuParams {}

export interface IUseTableMoreOptionsRowMenu {
  items: MenuItem[];
}

function useTableMoreOptionsRowMenu(params: IUseTableMoreOptionsRowMenuParams): IUseTableMoreOptionsRowMenu {
  const {} = params;
  const { isClearableRow, handleAddRowAbove, handleAddRowBelow, handleClearRowContent, handleDeleteRow } =
    useTranslationFileEditorContext();

  console.log('isClearableRow', isClearableRow);

  const items: MenuItem[] = [
    {
      label: '위쪽에 행 추가',
      icon: 'pi pi-arrow-up',
      command() {
        handleAddRowAbove();
      },
    },
    {
      label: '아래쪽에 행 추가',
      icon: 'pi pi-arrow-down',
      command() {
        handleAddRowBelow();
      },
    },
    {
      label: '행 내용 지우기',
      icon: 'pi pi-eraser',
      disabled: !isClearableRow,
      command() {
        handleClearRowContent();
      },
    },
    {
      label: '행 삭제',
      icon: 'pi pi-trash',
      command() {
        handleDeleteRow();
      },
    },
  ];

  return {
    items,
  };
}

export default useTableMoreOptionsRowMenu;
