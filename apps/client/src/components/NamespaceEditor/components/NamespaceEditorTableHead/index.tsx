import { TableHead, useTheme } from '@mui/material';
import { forwardRef } from 'react';

const NamespaceEditorTableHead = forwardRef<HTMLTableSectionElement>((props, ref) => {
  const {
    palette: { primary },
  } = useTheme();

  return (
    <TableHead
      {...props}
      ref={ref}
      sx={{
        background: primary.main,
      }}
    />
  );
});

NamespaceEditorTableHead.displayName = 'NamespaceEditorTableHead';

export default NamespaceEditorTableHead;
