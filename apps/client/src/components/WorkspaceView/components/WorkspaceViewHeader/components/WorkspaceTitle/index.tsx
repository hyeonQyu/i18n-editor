import WorkspaceNameEditButton from '@components/WorkspaceView/components/WorkspaceViewHeader/components/WorkspaceTitle/components/WorkspaceNameEditButton';
import WorkspaceNameEditCancelButton from '@components/WorkspaceView/components/WorkspaceViewHeader/components/WorkspaceTitle/components/WorkspaceNameEditCancelButton';
import WorkspaceNameEditFinishButton from '@components/WorkspaceView/components/WorkspaceViewHeader/components/WorkspaceTitle/components/WorkspaceNameEditCompleteButton';
import WorkspaceNameEditTextField from '@components/WorkspaceView/components/WorkspaceViewHeader/components/WorkspaceTitle/components/WorkspaceNameEditTextField';
import useTitleWidth from '@components/WorkspaceView/components/WorkspaceViewHeader/components/WorkspaceTitle/hooks/useTitleWidth';
import { useWorkspaceViewHeaderStore } from '@components/WorkspaceView/components/WorkspaceViewHeader/stores';
import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useWorkspace } from '@providers/WorkspaceProvider';
import { useRef } from 'react';

function WorkspaceTitle() {
  const workspace = useWorkspace();

  const isNameEditing = useWorkspaceViewHeaderStore(({ isNameEditing }) => isNameEditing);

  const textRef = useRef<HTMLSpanElement>(null);

  const width = useTitleWidth(textRef);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'end', gap: '12px' }}>
        {isNameEditing ? (
          <WorkspaceNameEditTextField />
        ) : (
          <Typography ref={textRef} variant={'h2'}>
            {workspace?.name}
          </Typography>
        )}

        {isNameEditing ? (
          <Box sx={{ display: 'flex', gap: '6px' }}>
            <WorkspaceNameEditFinishButton />
            <WorkspaceNameEditCancelButton />
          </Box>
        ) : (
          <WorkspaceNameEditButton />
        )}
      </Box>

      <Typography variant={'subtitle1'} color={grey[600]} sx={{ marginTop: '12px' }}>
        {workspace?.path}
      </Typography>
    </Box>
  );
}

export default WorkspaceTitle;
