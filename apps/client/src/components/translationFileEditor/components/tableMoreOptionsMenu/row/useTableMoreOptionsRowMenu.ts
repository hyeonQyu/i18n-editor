import { MenuItem } from 'primereact/menuitem';

export interface IUseTableMoreOptionsRowMenuParams {}

export interface IUseTableMoreOptionsRowMenu {
  items: MenuItem[];
}

function useTableMoreOptionsRowMenu(params: IUseTableMoreOptionsRowMenuParams): IUseTableMoreOptionsRowMenu {
  const {} = params;

  const items: MenuItem[] = [
    {
      label: '위쪽에 행 추가',
      icon: 'pi pi-arrow-up',
      command() {},
    },
    {
      label: '아래쪽에 행 추가',
      icon: 'pi pi-arrow-down',
      command() {},
    },
    {
      label: '행 내용 지우기',
      icon: 'pi pi-eraser',
      command() {},
    },
    {
      label: '행 복제',
      icon: 'pi pi-clone',
      command() {},
    },
    {
      label: '행 삭제',
      icon: 'pi pi-trash',
      command() {},
    },
  ];

  return {
    items,
  };
}

export default useTableMoreOptionsRowMenu;
