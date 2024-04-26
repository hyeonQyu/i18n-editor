import useTableMoreOptionsRowMenu from '@components/translationFileEditor/components/tableMoreOptionsMenu/row/useTableMoreOptionsRowMenu';
import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';
import { Menu } from 'primereact/menu';

export interface TableMoreOptionsRowMenuProps {}

/**
 * @deprecated
 */
export function TableMoreOptionsRowMenu(props: TableMoreOptionsRowMenuProps) {
  const {} = props;
  const { rowMenuRef } = useTranslationFileEditorContext();
  const { items } = useTableMoreOptionsRowMenu({});

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
