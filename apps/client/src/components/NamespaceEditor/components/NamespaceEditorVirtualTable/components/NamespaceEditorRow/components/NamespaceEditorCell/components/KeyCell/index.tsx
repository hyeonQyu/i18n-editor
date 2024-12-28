import { CELL_PADDING } from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/defines/styles';
import { Box } from '@mui/material';

interface KeyCellProps {
  value: string;
}

const createHtmlString = (str: string) => {
  return str.replace(/_/g, '_<wbr>');
};

function KeyCell(props: KeyCellProps) {
  const { value } = props;

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
