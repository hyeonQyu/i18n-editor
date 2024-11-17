import useTableMoreOptionsColumnMenu from './useTableMoreOptionsColumnMenu';
import { useTranslationFileEditorContext } from '../../../contexts/translationFileEditorContext';
import { Menu } from 'primereact/menu';

export interface TableMoreOptionsColumnMenuProps {}

/**
 * @deprecated
 */
export function TableMoreOptionsColumnMenu(props: TableMoreOptionsColumnMenuProps) {
  const {} = props;
  const { columnMenuRef } = useTranslationFileEditorContext();
  const { items } = useTableMoreOptionsColumnMenu({});

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
