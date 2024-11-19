import FileManagerBody from '@components/DirectorySelector/components/FileManager/components/FileManagerBody';
import FileManagerHeader from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader';
import FileManagerPopover from '@components/DirectorySelector/components/FileManager/components/FileManagerPopover';

function FileManager() {
  return (
    <FileManagerPopover>
      <FileManagerHeader />
      <FileManagerBody />
    </FileManagerPopover>
  );
}

export default FileManager;
