import { focusNextTextFieldCell } from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/components/TextFieldCell/utils/focus';
import { CELL_PADDING } from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/defines/styles';
import useClearCellError from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/hooks/useClearCellError';
import { Cell } from '@components/NamespaceEditor/defines/table';
import { TextField, TextFieldProps, useTheme } from '@mui/material';
import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';

interface TextFieldCellProps extends Omit<TextFieldProps, 'value' | 'onChange' | 'maxRows'> {
  cell: Cell;
  onComplete?: (value: string) => void | Promise<void>;
}

function TextFieldCell(props: TextFieldCellProps) {
  const {
    cell: { value: defaultValue, metadata },
    onComplete,
    fullWidth = true,
    multiline = true,
    disabled,
    ...textFieldProps
  } = props;

  const {
    palette: { error },
  } = useTheme();

  const clearCellError = useClearCellError();

  const errorMessage = metadata.error?.message;
  const hasError = Boolean(errorMessage);

  const [value, setValue] = useState(defaultValue);

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setValue(e.target.value);

    if (hasError) {
      clearCellError();
    }
  };

  const handleBlur = async () => {
    await onComplete?.(value);
  };

  const handleKeyDown: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      focusNextTextFieldCell(e.currentTarget);
    }
  };

  const cursor = disabled ? 'default' : 'pointer';

  return (
    <TextField
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      fullWidth={fullWidth}
      multiline={multiline}
      maxRows={8}
      disabled={disabled}
      error={hasError}
      helperText={errorMessage}
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

        '& .MuiFormHelperText-root': {
          position: 'absolute',
          right: 0,
          bottom: 0,
        },

        '& .MuiOutlinedInput-notchedOutline': {
          border: hasError ? '1px solid' : 'none',
        },

        '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: `1px solid ${hasError ? error.main : ''}`,
        },
      }}
      {...textFieldProps}
    />
  );
}

export default TextFieldCell;
