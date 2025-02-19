import useCompleteKeyCellHandler from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/KeyCell/hooks/useCompleteKeyCellHandler';
import TextFieldCell from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/TextFieldCell';
import { CELL_PADDING } from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/defines/styles';
import { Cell } from '@components/NamespaceEditor/defines/table';
import { Box } from '@mui/material';

interface KeyCellProps {
  cell: Cell;
}

const createHtmlString = (str: string) => {
  return str.replace(/_/g, '_<wbr>');
};

function KeyCell(props: KeyCellProps) {
  const { cell } = props;
  const { value } = cell;

  const handleComplete = useCompleteKeyCellHandler();

  if (!value) {
    return <TextFieldCell cell={cell} multiline={false} placeholder={'새로운 번역을 추가하세요.'} onComplete={handleComplete} />;
  }

  return (
    <Box
      sx={{
        wordBreak: 'break-word',
        lineHeight: 1.5,
        fontWeight: 'bold',
        padding: `${CELL_PADDING}px`,
      }}
      dangerouslySetInnerHTML={{ __html: createHtmlString(value) }}
    />
  );
}

export default KeyCell;
