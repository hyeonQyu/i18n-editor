import useTableMoreOptionsColumnMenu from '@components/translationFileEditor/components/tableMoreOptionsMenu/column/useTableMoreOptionsColumnMenu';
import { Menu } from 'primereact/menu';
import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';

export interface TableMoreOptionsColumnMenuProps {}

export function TableMoreOptionsColumnMenu(props: TableMoreOptionsColumnMenuProps) {
  const {} = props;
  const { columnMenuRef } = useTranslationFileEditorContext();
  const { items } = useTableMoreOptionsColumnMenu({});

  return (
    <>
      <Menu ref={columnMenuRef} model={items} popup />

      <style jsx>{``}</style>
    </>
  );
}
