import { DirectorySelector } from '@components/directorySelector';
import useHome from '@hooks/pages/useHome';

export interface IndexProps {}

function Index(props: IndexProps) {
  const {} = props;
  const { directoryPath, handleDirectoryPathChange } = useHome({});

  return (
    <>
      <div>
        <DirectorySelector path={directoryPath} onChange={handleDirectoryPathChange} />
      </div>

      <style jsx>{``}</style>
    </>
  );
}

export default Index;
