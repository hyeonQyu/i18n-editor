import DirectoryDisplayBar from '@components/DirectorySelector/components/DirectoryDisplayBar';
import FileManager from '@components/DirectorySelector/components/FileManager';
import useInitPath from '@components/DirectorySelector/hooks/useInitPath';

function DirectorySelector() {
  useInitPath();

  return (
    <>
      <DirectoryDisplayBar />
      <FileManager />
    </>
  );
}

export default DirectorySelector;
