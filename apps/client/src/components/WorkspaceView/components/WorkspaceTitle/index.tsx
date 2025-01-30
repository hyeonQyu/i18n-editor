import EllipsisText from '@components/EllipsisText';
import CopyableWorkspacePath from '@components/WorkspaceView/components/WorkspaceTitle/components/CopyableWorkspacePath';
import WorkspaceNameEditButton from '@components/WorkspaceView/components/WorkspaceTitle/components/WorkspaceNameEditButton';
import WorkspaceNameEditCancelButton from '@components/WorkspaceView/components/WorkspaceTitle/components/WorkspaceNameEditCancelButton';
import WorkspaceNameEditFinishButton from '@components/WorkspaceView/components/WorkspaceTitle/components/WorkspaceNameEditCompleteButton';
import WorkspaceNameEditTextField from '@components/WorkspaceView/components/WorkspaceTitle/components/WorkspaceNameEditTextField';
import { useWorkspaceTitleStore } from '@components/WorkspaceView/components/WorkspaceTitle/stores';
import useWorkspace from '@hooks/workspace/useWorkspace';
import { Box } from '@mui/material';

function WorkspaceTitle() {
  const workspace = useWorkspace();

  const isNameEditing = useWorkspaceTitleStore(({ isNameEditing }) => isNameEditing);

  return (
    <Box
      sx={{
        padding: '40px 36px 32px 36px',
        width: '100%',
        maxWidth: '100%',
        overflow: 'auto',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'end', gap: '12px', maxWidth: '100%' }}>
        {isNameEditing ? (
          <>
            <WorkspaceNameEditTextField />
            <Box sx={{ display: 'flex', gap: '6px' }}>
              <WorkspaceNameEditFinishButton />
              <WorkspaceNameEditCancelButton />
            </Box>
          </>
        ) : (
          <>
            <EllipsisText label={workspace?.name ?? ''} variant={'h2'} sx={{ width: 'fit-content', maxWidth: '100%' }} />
            <WorkspaceNameEditButton />
          </>
        )}
      </Box>

      <CopyableWorkspacePath />
    </Box>
  );
}

export default WorkspaceTitle;
