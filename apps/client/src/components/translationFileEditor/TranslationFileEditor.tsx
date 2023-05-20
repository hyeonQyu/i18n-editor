import { useRecoilValue } from 'recoil';
import { translationFileNameState } from '@stores/store';
import { TableMoreOptionsRowMenu } from '@components/translationFileEditor/components/tableMoreOptionsMenu/row';
import { TableMoreOptionsColumnMenu } from '@components/translationFileEditor/components/tableMoreOptionsMenu/column';
import { TableExtendDialog } from '@components/translationFileEditor/components/tableExtendDialog';
import { TranslationContentTable } from '@components/translationFileEditor/components/translationContentTable';
import useTranslationFileEditor from '@components/translationFileEditor/useTranslationFileEditor';

export interface TranslationFileEditorProps {}

function TranslationFileEditor(props: TranslationFileEditorProps) {
  const {} = props;

  useTranslationFileEditor(props);
  const translationFileName = useRecoilValue(translationFileNameState);

  return (
    <>
      {translationFileName && (
        <>
          <>
            <TableMoreOptionsRowMenu />
            <TableMoreOptionsColumnMenu />
            <TableExtendDialog />
          </>

          <TranslationContentTable />
        </>
      )}

      <style jsx>{``}</style>
    </>
  );
}

export default TranslationFileEditor;
