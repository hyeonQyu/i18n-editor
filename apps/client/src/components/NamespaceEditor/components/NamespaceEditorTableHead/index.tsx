import { TableHead } from '@mui/material';
import { forwardRef } from 'react';

const NamespaceEditorTableHead = forwardRef<HTMLTableSectionElement>((props, ref) => <TableHead {...props} ref={ref} />);

NamespaceEditorTableHead.displayName = 'NamespaceEditorTableHead';

export default NamespaceEditorTableHead;
