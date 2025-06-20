import useCancelEditWorkspaceName from '@components/WorkspaceView/components/WorkspaceTitle/hooks/useCancelEditWorkspaceName';
import useUpdateCurrentWorkspaceName from '@components/WorkspaceView/components/WorkspaceTitle/hooks/useUpdateCurrentWorkspaceName';
import { useWorkspaceTitleStore } from '@components/WorkspaceView/components/WorkspaceTitle/stores';
import useWorkspace from '@hooks/workspace/useWorkspace';
import { TextField, useTheme } from '@mui/material';
import { ChangeEventHandler, KeyboardEventHandler, useEffect } from 'react';

function WorkspaceNameEditTextField() {
  const workspace = useWorkspace();

  const editingName = useWorkspaceTitleStore(({ editingName }) => editingName);
  const setEditingName = useWorkspaceTitleStore(({ setEditingName }) => setEditingName);
  const hasError = useWorkspaceTitleStore(({ hasError }) => hasError);

  const updateName = useUpdateCurrentWorkspaceName();
  const cancelEdit = useCancelEditWorkspaceName();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEditingName(e.target.value);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      await updateName();
    } else if (e.key === 'Escape') {
      cancelEdit();
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
      fullWidth
      error={hasError}
      InputProps={{
        sx: {
          fontSize,
          fontWeight,
          lineHeight,
          letterSpacing,

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
