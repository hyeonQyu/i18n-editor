import { DirectorySelector } from '@components/directorySelector';
import useHome from '@hooks/pages/useHome';
import { Layout } from '@components/directorySelector/components/layout';
import { TranslationFileSelector } from '@components/translationFileSelector';

export interface IndexProps {}

function Index(props: IndexProps) {
  const {} = props;
  const { directoryPath, translationFiles, handleDirectoryPathChange } = useHome({});

  return (
    <>
      <Layout>
        <div className={'container'}>
          <DirectorySelector path={directoryPath} onChange={handleDirectoryPathChange} />
          <TranslationFileSelector directoryPath={directoryPath} files={translationFiles} />
        </div>
      </Layout>

      <style jsx>{`
        .container {
          padding: 80px 0;
          width: 600px;
          margin: 0 auto;
        }

        .container > :global(*:not(:first-child)) {
          margin-top: 42px;
        }
      `}</style>
    </>
  );
}

export default Index;
