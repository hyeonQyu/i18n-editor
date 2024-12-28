import { Box, TableCell, TextField } from '@mui/material';
import { ChangeEventHandler, useState } from 'react';

interface NamespaceEditorCellProps {
  defaultValue: string;
  isKey: boolean;
}

const createHtmlString = (str: string) => {
  return str.replace(/_/g, '_<wbr>');
};

function NamespaceEditorCell(props: NamespaceEditorCellProps) {
  const { isKey, defaultValue } = props;

  const [value, setValue] = useState(defaultValue);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setValue(e.target.value);
  };

  return (
    <TableCell>
      {isKey ? (
        <Box
          sx={{
            wordBreak: 'break-word',
            lineHeight: 1.5,
            fontWeight: 'bold',
          }}
          dangerouslySetInnerHTML={{ __html: createHtmlString(defaultValue) }}
        />
      ) : (
        <TextField value={value} onChange={handleChange} fullWidth multiline maxRows={8} />
      )}
    </TableCell>
  );
}

export default NamespaceEditorCell;
