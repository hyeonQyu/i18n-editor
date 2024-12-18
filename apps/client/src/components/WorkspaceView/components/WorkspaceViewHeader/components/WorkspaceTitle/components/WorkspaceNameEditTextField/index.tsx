import useUpdateWorkspaceName from '@components/WorkspaceView/components/WorkspaceViewHeader/components/WorkspaceTitle/hooks/useUpdateWorkspaceName';
import { useWorkspaceViewHeaderStore } from '@components/WorkspaceView/components/WorkspaceViewHeader/stores';
import { TextField, useTheme } from '@mui/material';
import { useWorkspace } from '@providers/WorkspaceProvider';
import { ChangeEventHandler, KeyboardEventHandler, useEffect } from 'react';

interface WorkspaceNameEditTextFieldProps {
  defaultWidth: number;
}

function WorkspaceNameEditTextField(props: WorkspaceNameEditTextFieldProps) {
  const { defaultWidth } = props;

  const workspace = useWorkspace();

  const editingName = useWorkspaceViewHeaderStore(({ editingName }) => editingName);
  const setEditingName = useWorkspaceViewHeaderStore(({ setEditingName }) => setEditingName);

  const updateWorkspaceName = useUpdateWorkspaceName();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEditingName(e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await updateWorkspaceName();
    }
  };

  const {
    typography: {
      h2: { fontSize, fontWeight, lineHeight, letterSpacing },
    },
  } = useTheme();

  useEffect(() => {
    setEditingName(workspace?.name || '');
  }, [setEditingName, workspace?.name]);

  return (
    <TextField
      variant={'standard'}
      value={editingName}
      onChange={handleChange}
      autoFocus
      InputProps={{
        sx: {
          fontSize,
          fontWeight,
          lineHeight,
          letterSpacing,
          width: `${defaultWidth}px`,

          '& input': {
            padding: 0,
          },
        },
        onKeyDown: handleKeyDown,
      }}
    />
  );
}

export default WorkspaceNameEditTextField;
