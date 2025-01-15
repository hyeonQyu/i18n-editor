import EllipsisText from '@components/EllipsisText';
import CopyableWorkspacePath from '@components/WorkspaceView/components/WorkspaceViewHeader/components/WorkspaceTitle/components/CopyableWorkspacePath';
import WorkspaceNameEditButton from '@components/WorkspaceView/components/WorkspaceViewHeader/components/WorkspaceTitle/components/WorkspaceNameEditButton';
import WorkspaceNameEditCancelButton from '@components/WorkspaceView/components/WorkspaceViewHeader/components/WorkspaceTitle/components/WorkspaceNameEditCancelButton';
import WorkspaceNameEditFinishButton from '@components/WorkspaceView/components/WorkspaceViewHeader/components/WorkspaceTitle/components/WorkspaceNameEditCompleteButton';
import WorkspaceNameEditTextField from '@components/WorkspaceView/components/WorkspaceViewHeader/components/WorkspaceTitle/components/WorkspaceNameEditTextField';
import { useWorkspaceViewHeaderStore } from '@components/WorkspaceView/components/WorkspaceViewHeader/stores';
import { Box } from '@mui/material';
import { useWorkspace } from '@providers/WorkspaceProvider';

function WorkspaceTitle() {
  const workspace = useWorkspace();

  const isNameEditing = useWorkspaceViewHeaderStore(({ isNameEditing }) => isNameEditing);

  return (
    <Box sx={{ flex: 1, width: '100%', maxWidth: '100%', overflow: 'auto' }}>
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
