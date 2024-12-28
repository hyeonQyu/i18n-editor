import { CELL_PADDING } from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/defines/styles';
import { TextField } from '@mui/material';
import { ChangeEventHandler, useState } from 'react';

interface ValueCellProps {
  value: string;
}

function ValueCell(props: ValueCellProps) {
  const { value: defaultValue } = props;

  const [value, setValue] = useState(defaultValue);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setValue(e.target.value);
  };

  return (
    <TextField
      value={value}
      onChange={handleChange}
      fullWidth
      multiline
      maxRows={8}
      InputProps={{
        sx: {
          padding: `${CELL_PADDING}px`,
          cursor: 'pointer',
          borderRadius: 0,
          '&.Mui-focused': {
            cursor: 'text',
            borderRadius: 1,
          },
          '& .MuiInputBase-input': {
            cursor: 'pointer',
          },
          '&.Mui-focused .MuiInputBase-input': {
            cursor: 'text',
          },
          '&:hover:not(.Mui-focused)': {
            backgroundColor: (theme) => theme.palette.action.hover,
          },
        },
      }}
      sx={{
        width: '100%',
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '& .MuiInputBase-root:hover .MuiOutlinedInput-notchedOutline': {
          border: 'none',
        },
        '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: '1px solid',
        },
      }}
    />
  );
}

export default ValueCell;
