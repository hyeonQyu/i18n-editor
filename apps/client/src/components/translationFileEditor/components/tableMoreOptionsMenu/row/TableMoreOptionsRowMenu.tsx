import { useRecoilValue } from 'recoil';
import { translationFileEditorStates } from '@components/translationFileEditor/stores/store';
import useTableMoreOptionsRowMenu from '@components/translationFileEditor/components/tableMoreOptionsMenu/row/useTableMoreOptionsRowMenu';
import { MenuItem } from 'primereact/menuitem';
import { Menu } from 'primereact/menu';

export interface TableMoreOptionsRowMenuProps {}

function TableMoreOptionsRowMenu(props: TableMoreOptionsRowMenuProps) {
  const {} = props;
  const rowMenuRef = useRecoilValue(translationFileEditorStates.rowMenuRef);
  const {
    isClearableRow,
    handleClickCopyTranslationKey,
    handleClickAddRowAbove,
    handleClickAddRowBelow,
    handleClickClearRowContent,
    handleClickDeleteRow,
  } = useTableMoreOptionsRowMenu(props);

  const items: MenuItem[] = [
    {
      label: '번역 key 값 복사',
      icon: 'pi pi-clone',
      command() {
        handleClickCopyTranslationKey();
      },
    },
    {
      label: '위쪽에 새 번역 추가',
      icon: 'pi pi-arrow-up',
      command(e) {
        handleClickAddRowAbove(e.originalEvent);
      },
    },
    {
      label: '아래쪽에 새 번역 추가',
      icon: 'pi pi-arrow-down',
      command(e) {
        handleClickAddRowBelow(e.originalEvent);
      },
    },
    {
      label: '번역 값 지우기',
      icon: 'pi pi-eraser',
      disabled: !isClearableRow,
      command(e) {
        handleClickClearRowContent(e.originalEvent);
      },
    },
    {
      label: '번역 삭제',
      icon: 'pi pi-trash',
      command(e) {
        handleClickDeleteRow(e.originalEvent);
      },
    },
  ];
  return (
    <>
      <Menu ref={rowMenuRef} model={items} popup className={'row-menu'} />

      <style jsx>{`
        :global(.row-menu) {
          width: fit-content;
        }
      `}</style>
    </>
  );
}

export default TableMoreOptionsRowMenu;
