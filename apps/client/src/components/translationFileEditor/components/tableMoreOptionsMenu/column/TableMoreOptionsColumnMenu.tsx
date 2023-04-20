import useTableMoreOptionsColumnMenu from '@components/translationFileEditor/components/tableMoreOptionsMenu/column/useTableMoreOptionsColumnMenu';
import { Menu } from 'primereact/menu';
import { useTranslationFileEditorContextBefore } from '@components/translationFileEditor/contexts/translationFileEditorContextBefore';

export interface TableMoreOptionsColumnMenuProps {}

export function TableMoreOptionsColumnMenu(props: TableMoreOptionsColumnMenuProps) {
  const {} = props;
  const { columnMenuRef } = useTranslationFileEditorContextBefore();
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
