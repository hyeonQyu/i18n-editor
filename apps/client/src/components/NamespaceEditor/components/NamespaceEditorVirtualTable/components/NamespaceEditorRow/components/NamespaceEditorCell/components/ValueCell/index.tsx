import TextFieldCell from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/TextFieldCell';
import useCompleteValueCellHandler from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/ValueCell/hooks/useCompleteValueCellHandler';
import useIsVirtualRow from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/hooks/useIsVirtualRow';
import { Cell } from '@components/NamespaceEditor/defines/table';
import { LanguageCode } from 'i18n-editor-common';

interface ValueCellProps {
  cell: Cell;
  languageCode: LanguageCode;
}

function ValueCell(props: ValueCellProps) {
  const { cell, languageCode } = props;

  const isVirtualRow = useIsVirtualRow();

  const handleComplete = useCompleteValueCellHandler(languageCode);

  return <TextFieldCell cell={cell} multiline={true} disabled={isVirtualRow} onComplete={handleComplete} />;
}

export default ValueCell;
