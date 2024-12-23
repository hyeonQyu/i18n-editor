import FileManagerBody from '@components/DirectorySelector/components/FileManager/components/FileManagerBody';
import useEntries from '@components/DirectorySelector/components/FileManager/components/FileManagerBody/hooks/useEntries';
import FileManagerFooter from '@components/DirectorySelector/components/FileManager/components/FileManagerFooter';
import FileManagerHeader from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader';
import FileManagerPopover from '@components/DirectorySelector/components/FileManager/components/FileManagerPopover';

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
