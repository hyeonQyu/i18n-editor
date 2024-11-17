import useTableMoreOptionsRowMenu from './useTableMoreOptionsRowMenu';
import { useTranslationFileEditorContext } from '../../../contexts/translationFileEditorContext';
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
