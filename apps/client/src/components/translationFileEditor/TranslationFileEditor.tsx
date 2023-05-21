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

      <style jsx>{``}</style>
    </>
  );
}

export default TranslationFileEditor;
