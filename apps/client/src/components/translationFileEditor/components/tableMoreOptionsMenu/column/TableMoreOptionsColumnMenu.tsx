import useTableOptionsColumnMenu from '@components/translationFileEditor/components/tableMoreOptionsMenu/column/useTableOptionsColumnMenu';
import { useRecoilValue } from 'recoil';
import { translationFileEditorStates } from '@components/translationFileEditor/stores/store';
import { MenuItem } from 'primereact/menuitem';
import { Menu } from 'primereact/menu';

export interface TableMoreOptionsColumnMenuProps {}

function TableMoreOptionsColumnMenu(props: TableMoreOptionsColumnMenuProps) {
  const {} = props;
  const columnMenuRef = useRecoilValue(translationFileEditorStates.columnMenuRef);
  const { handleClickDeleteColumn } = useTableOptionsColumnMenu(props);

  const items: MenuItem[] = [
    {
      label: '언어 삭제',
      icon: 'pi pi-trash',
      command(e) {
        handleClickDeleteColumn(e.originalEvent);
      },
    },
  ];

  return (
    <>
      <Menu ref={columnMenuRef} model={items} popup className={'column-menu'} />

      <style jsx>{`
        :global(.column-menu) {
          width: fit-content;
        }
      `}</style>
    </>
  );
}

export default TableMoreOptionsColumnMenu;
