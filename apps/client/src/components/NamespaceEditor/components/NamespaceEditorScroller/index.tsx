import { Paper, TableContainer } from '@mui/material';
import { forwardRef } from 'react';

const NamespaceEditorScroller = forwardRef<HTMLDivElement>((props, ref) => <TableContainer component={Paper} {...props} ref={ref} />);

NamespaceEditorScroller.displayName = 'NamespaceEditorScroller';

export default NamespaceEditorScroller;
