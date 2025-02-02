import useCompleteKeyCellHandler from '@components/NamespaceView/components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/KeyCell/hooks/useCompleteKeyCellHandler';
import TextFieldCell from '@components/NamespaceView/components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/TextFieldCell';
import {
  CELL_MIN_HEIGHT,
  CELL_PADDING,
} from '@components/NamespaceView/components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/defines/styles';
import { Cell } from '@components/NamespaceView/components/NamespaceEditor/defines/table';
import useCopyClipboard from '@hooks/useCopyClipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Tooltip, useTheme } from '@mui/material';

interface KeyCellProps {
  cell: Cell;
}

const createHtmlString = (str: string) => {
  return str.replace(/_/g, '_<wbr>');
};

function KeyCell(props: KeyCellProps) {
  const { cell } = props;
  const { value } = cell;

  const {
    palette: { text, grey },
  } = useTheme();

  const copyClipboard = useCopyClipboard();

  const handleComplete = useCompleteKeyCellHandler();

  if (!value) {
    return <TextFieldCell isKeyCell cell={cell} multiline={false} placeholder={'새로운 번역을 추가하세요.'} onComplete={handleComplete} />;
  }

  const handleClick = () => copyClipboard(value);

  return (
    <Tooltip title={'복사'}>
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          minHeight: `${CELL_MIN_HEIGHT}px`,
          alignItems: 'center',
          padding: `${CELL_PADDING}px`,
          gap: '24px',
          borderRadius: '4px',
          cursor: 'pointer',

          '& svg': {
            opacity: 0,
          },

          '&:hover': {
            background: grey[100],

            '& svg': {
              opacity: 1,
            },
          },
        }}
      >
        <Box
          sx={{
            wordBreak: 'break-word',
            lineHeight: 1.5,
            fontWeight: 'bold',
          }}
          dangerouslySetInnerHTML={{ __html: createHtmlString(value) }}
        />
        <ContentCopyIcon sx={{ fontSize: '16px', color: text.secondary }} />
      </Box>
    </Tooltip>
  );
}

export default KeyCell;
