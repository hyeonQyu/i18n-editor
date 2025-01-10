import { TableCell, TextField } from '@mui/material';
import { ChangeEventHandler, useState } from 'react';

interface NamespaceEditorCellProps {
  defaultValue: string;
  isKey: boolean;
}

function NamespaceEditorCell(props: NamespaceEditorCellProps) {
  const { isKey, defaultValue } = props;

  const [value, setValue] = useState(defaultValue);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setValue(e.target.value);
  };

  return (
    <TableCell>
      {isKey ? defaultValue : <TextField value={value} onChange={handleChange} fullWidth multiline maxRows={8} sx={{ height: '100%' }} />}
    </TableCell>
  );
}

export default NamespaceEditorCell;
