import EllipsisText from '@/components/EllipsisText';
import { CopyableWorkspacePath } from '@/components/WorkspaceView/components/WorkspaceTitle/components/CopyableWorkspacePath';
import { WorkspaceNameEditButton } from '@/components/WorkspaceView/components/WorkspaceTitle/components/WorkspaceNameEditButton';
import { WorkspaceNameEditCancelButton } from '@/components/WorkspaceView/components/WorkspaceTitle/components/WorkspaceNameEditCancelButton';
import { WorkspaceNameEditFinishButton } from '@/components/WorkspaceView/components/WorkspaceTitle/components/WorkspaceNameEditFinishButton';
import { WorkspaceNameEditTextField } from '@/components/WorkspaceView/components/WorkspaceTitle/components/WorkspaceNameEditTextField';
import { useWorkspaceTitleStore } from '@/components/WorkspaceView/components/WorkspaceTitle/stores/workspaceTitle.store';
import { useWorkspace } from '@/hooks/domains/workspace';
import { Box, useTheme } from '@mui/material';

function WorkspaceTitle() {
  const {
    palette: { text },
  } = useTheme();

  const workspace = useWorkspace();

  const isNameEditing = useWorkspaceTitleStore((store) => store.isNameEditing);

  return (
    <Box
      sx={{
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
            <EllipsisText
              label={workspace?.name ?? ''}
              variant={'h2'}
              sx={{ width: 'fit-content', maxWidth: '100%', color: text.secondary }}
            />
            <WorkspaceNameEditButton />
          </>
        )}
      </Box>

      <CopyableWorkspacePath />
    </Box>
  );
}

export default WorkspaceTitle;
