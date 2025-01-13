import { TableBody } from '@mui/material';
import { forwardRef } from 'react';

export const NamespaceEditorTableBody = forwardRef<HTMLTableSectionElement>((props, ref) => <TableBody {...props} ref={ref} />);

NamespaceEditorTableBody.displayName = 'NamespaceEditorTableBody';

export default NamespaceEditorTableBody;
