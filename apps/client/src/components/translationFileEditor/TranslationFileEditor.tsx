import { useRecoilValue } from 'recoil';
import { translationFileNameState } from '@stores/store';
import { TableMoreOptionsRowMenu } from '@components/translationFileEditor/components/tableMoreOptionsMenu/row';
import { TableMoreOptionsColumnMenu } from '@components/translationFileEditor/components/tableMoreOptionsMenu/column';
import { TableExtendDialog } from '@components/translationFileEditor/components/tableExtendDialog';
import { TranslationContentTable } from '@components/translationFileEditor/components/translationContentTable';
import useTranslationFileEditor from '@components/translationFileEditor/useTranslationFileEditor';
import { useRef } from 'react';
import { Menu } from 'primereact/menu';
import { TranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';

export interface TranslationFileEditorProps {}

function TranslationFileEditor(props: TranslationFileEditorProps) {
  const {} = props;

  const translationFileName = useRecoilValue(translationFileNameState);

  useTranslationFileEditor(props);

  const rowMenuRef = useRef<Menu>(null);
  const columnMenuRef = useRef<Menu>(null);

  return (
    <>
      <TranslationFileEditorContext.Provider value={{ rowMenuRef, columnMenuRef }}>
        {translationFileName && (
          <div className={'table-container'}>
            <TableMoreOptionsRowMenu />
            <TableMoreOptionsColumnMenu />
            <TableExtendDialog />

            <TranslationContentTable />
          </div>
        )}
      </TranslationFileEditorContext.Provider>

      <style jsx>{`
        .table-container {
          width: 100%;
          ${Boolean(translationFileName) ? 'height: 100vh' : ''};
          padding: 0 50px;
        }
        :global(.p-datatable-wrapper::-webkit-scrollbar),
        :global(.p-dropdown-items-wrapper::-webkit-scrollbar),
        :global(.p-multiselect-items-wrapper::-webkit-scrollbar) {
          width: 8px;
          background-color: var(--surface-b);
        }
        :global(.p-datatable-wrapper::-webkit-scrollbar-thumb),
        :global(.p-dropdown-items-wrapper::-webkit-scrollbar-thumb),
        :global(.p-multiselect-items-wrapper::-webkit-scrollbar-thumb) {
          background-color: var(--surface-400);
          border-radius: 10px;
        }
        :global(.p-datatable-wrapper::-webkit-scrollbar-thumb:hover),
        :global(.p-dropdown-items-wrapper::-webkit-scrollbar-thumb:hover),
        :global(.p-multiselect-items-wrapper::-webkit-scrollbar-thumb:hover) {
          background-color: var(--surface-500);
        }
        :global(.p-datatable-wrapper::-webkit-scrollbar-thumb:active),
        :global(.p-dropdown-items-wrapper::-webkit-scrollbar-thumb:active),
        :global(.p-multiselect-items-wrapper::-webkit-scrollbar-thumb:active) {
          background-color: var(--surface-600);
        }
        :global(.p-datatable-wrapper::-webkit-scrollbar-track),
        :global(.p-dropdown-items-wrapper::-webkit-scrollbar-track),
        :global(.p-multiselect-items-wrapper::-webkit-scrollbar-track) {
          background: none;
        }
      `}</style>
    </>
  );
}

export default TranslationFileEditor;
