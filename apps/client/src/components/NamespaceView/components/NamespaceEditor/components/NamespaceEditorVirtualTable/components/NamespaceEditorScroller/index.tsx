import { Paper, TableContainer, useTheme } from '@mui/material';
import { forwardRef } from 'react';

const NamespaceEditorScroller = forwardRef<HTMLDivElement>((props, ref) => {
  const {
    palette: { grey },
  } = useTheme();

  return (
    <TableContainer
      component={Paper}
      {...props}
      ref={ref}
      sx={{
        scrollbarWidth: 'thin',
        scrollbarColor: `${grey[400]} transparent`,
        '&::-webkit-scrollbar-thumb': {
          background: grey[400],
          borderRadius: '4px',
          '&:hover': {
            background: grey[500],
          },
        },
      }}
    />
  );
});

NamespaceEditorScroller.displayName = 'NamespaceEditorScroller';

export default NamespaceEditorScroller;
