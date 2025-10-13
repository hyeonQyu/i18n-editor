import { useFileManagerDialogStore } from '@/components/FileManagerDialog/stores/fileManagerDialog.store';
import { FormControlLabel, Switch } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ChangeEventHandler } from 'react';

function DirectoryOnlySwitch() {
  const directoryOnly = useFileManagerDialogStore((state) => state.directoryOnly);
  const setDirectoryOnly = useFileManagerDialogStore((state) => state.setDirectoryOnly);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => setDirectoryOnly(e.target.checked);

  return (
    <FormControlLabel
      control={<Switch checked={directoryOnly} onChange={handleChange} />}
      label={'디렉토리만 보기'}
      disableTypography
      sx={{
        fontSize: '14px',
        color: grey[directoryOnly ? 800 : 500],
        transition: 'color 0.1s',
      }}
    />
  );
}

export default DirectoryOnlySwitch;
