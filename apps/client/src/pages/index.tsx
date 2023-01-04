import { DirectorySelector } from '@components/directorySelector';
import useHome from '@hooks/pages/useHome';
import { Layout } from '@components/directorySelector/components/layout';

export interface IndexProps {}

function Index(props: IndexProps) {
  const {} = props;
  const { directoryPath, handleDirectoryPathChange } = useHome({});

  return (
    <>
      <Layout>
        <div className={'container'}>
          <DirectorySelector path={directoryPath} onChange={handleDirectoryPathChange} />
        </div>
      </Layout>

      <style jsx>{`
        .container {
          padding: 80px 0;
          width: 600px;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
}

export default Index;
