import useTableMoreOptionsColumnMenuBefore from '@components/translationFileEditor/components/tableMoreOptionsMenu/column/useTableMoreOptionsColumnMenuBefore';
import { Menu } from 'primereact/menu';
import { useTranslationFileEditorContextBefore } from '@components/translationFileEditor/contexts/translationFileEditorContextBefore';

export interface TableMoreOptionsColumnMenuBeforeProps {}

/**
 * @deprecated TODO 삭제
 * @param props
 * @constructor
 */
export function TableMoreOptionsColumnMenuBefore(props: TableMoreOptionsColumnMenuBeforeProps) {
  const {} = props;
  const { columnMenuRef } = useTranslationFileEditorContextBefore();
  const { items } = useTableMoreOptionsColumnMenuBefore({});

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
