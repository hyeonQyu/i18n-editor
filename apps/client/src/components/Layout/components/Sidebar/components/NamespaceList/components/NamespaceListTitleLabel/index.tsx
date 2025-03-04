import useWorkspace from '@hooks/workspace/useWorkspace';
import { Typography, useTheme } from '@mui/material';

function NamespaceListTitleLabel() {
  const {
    palette: { text },
  } = useTheme();

  const workspace = useWorkspace();

  return (
    <>
      <span>네임스페이스</span>

      <Typography
        variant={'body2'}
        sx={{
          width: 'fit-content',
          display: 'inline-flex',
          marginLeft: '8px',
          color: text.secondary,
        }}
      >
        [{workspace?.name}]
      </Typography>
    </>
  );
}

export default NamespaceListTitleLabel;
