import { Menu } from 'primereact/menu';
import useTableMoreOptionsRowMenuBefore from '@components/translationFileEditor/components/tableMoreOptionsMenu/row/useTableMoreOptionsRowMenuBefore';
import { useTranslationFileEditorContextBefore } from '@components/translationFileEditor/contexts/translationFileEditorContextBefore';

export interface TableMoreOptionsRowMenuBeforeProps {}

/**
 * @deprecated TODO 삭제
 * @param props
 * @constructor
 */
export function TableMoreOptionsRowMenuBefore(props: TableMoreOptionsRowMenuBeforeProps) {
  const {} = props;
  const { rowMenuRef } = useTranslationFileEditorContextBefore();
  const { items } = useTableMoreOptionsRowMenuBefore({});

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
