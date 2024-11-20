import FileManagerBody from '@components/DirectorySelector/components/FileManager/components/FileManagerBody';
import FileManagerFooter from '@components/DirectorySelector/components/FileManager/components/FileManagerFooter';
import FileManagerHeader from '@components/DirectorySelector/components/FileManager/components/FileManagerHeader';
import FileManagerPopover from '@components/DirectorySelector/components/FileManager/components/FileManagerPopover';

function FileManager() {
  return (
    <FileManagerPopover>
      <FileManagerHeader />
      <FileManagerBody />
      <FileManagerFooter />
    </FileManagerPopover>
  );
}

export default FileManager;
