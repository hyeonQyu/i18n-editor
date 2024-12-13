import FileManagerPopover from '@components/DirectorySelector/components/FileManager/components/FileManagerPopover';
import useEntries from '@components/FileManagerDialog/components/FileManagerBody/hooks/useEntries';
import FileManagerBody from 'components/FileManagerDialog/components/FileManagerBody';
import FileManagerFooter from 'components/FileManagerDialog/components/FileManagerFooter';
import FileManagerHeader from 'components/FileManagerDialog/components/FileManagerHeader';

function FileManager() {
  const entries = useEntries();

  return (
    <FileManagerPopover>
      <FileManagerHeader />
      <FileManagerBody entries={entries} />
      <FileManagerFooter />
    </FileManagerPopover>
  );
}

export default FileManager;
