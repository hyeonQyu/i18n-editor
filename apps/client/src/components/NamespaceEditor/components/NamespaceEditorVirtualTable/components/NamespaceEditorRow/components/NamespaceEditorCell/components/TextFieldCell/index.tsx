import { CELL_PADDING } from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/defines/styles';
import { TextField, TextFieldProps } from '@mui/material';
import { ChangeEventHandler, useState } from 'react';

interface TextFieldCellProps extends Omit<TextFieldProps, 'value' | 'onChange' | 'maxRows'> {
  value: string;
  onComplete?: (value: string) => void | Promise<void>;
}

function TextFieldCell(props: TextFieldCellProps) {
  const { value: defaultValue, onComplete, fullWidth = true, multiline = true, disabled, ...textFieldProps } = props;

  const [value, setValue] = useState(defaultValue);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = async () => {
    await onComplete?.(value);
  };

  const cursor = disabled ? 'default' : 'pointer';

  return (
    <TextField
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      fullWidth={fullWidth}
      multiline={multiline}
      maxRows={8}
      disabled={disabled}
      InputProps={{
        sx: {
          padding: `${CELL_PADDING}px`,
          cursor,
          borderRadius: 0,
          transition: 'all 0.1s ease-in-out',
          '&.Mui-focused': {
            cursor: 'text',
            borderRadius: 1,
          },
          '& .MuiInputBase-input': {
            cursor,
          },
          '&.Mui-focused .MuiInputBase-input': {
            cursor: 'text',
          },
          '&:hover:not(.Mui-focused):not(.Mui-disabled)': {
            backgroundColor: (theme) => theme.palette.action.hover,
          },
        },
      }}
      sx={{
        width: '100%',

        '& .MuiInputBase-root': {
          minHeight: '88px',
        },

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
      {...textFieldProps}
    />
  );
}

export default TextFieldCell;
