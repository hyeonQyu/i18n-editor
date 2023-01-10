import { Menu } from 'primereact/menu';
import useTableMoreOptionsRowMenu from '@components/translationFileEditor/components/tableMoreOptionsMenu/row/useTableMoreOptionsRowMenu';
import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';

export interface TableMoreOptionsRowMenuProps {}

export function TableMoreOptionsRowMenu(props: TableMoreOptionsRowMenuProps) {
  const {} = props;
  const { rowMenuRef } = useTranslationFileEditorContext();
  const { items } = useTableMoreOptionsRowMenu({});

  return (
    <>
      <Menu ref={rowMenuRef} model={items} popup />

      <style jsx>{``}</style>
    </>
  );
}
