import { DirectorySelector } from '@components/directorySelector';
import useHome from '@hooks/pages/useHome';
import { Layout } from '@components/directorySelector/components/layout';
import { TranslationFileSelector } from '@components/translationFileSelector';

export interface IndexProps {}

function Index(props: IndexProps) {
  const {} = props;
  const {
    directoryPath,
    translationFiles,
    translationFile,
    hasDirectorySelectorError,
    handleDirectoryPathChange,
    handleTranslationFileChange,
  } = useHome({});

  return (
    <>
      <Layout>
        <div className={'container'}>
          <DirectorySelector path={directoryPath} invalid={hasDirectorySelectorError} onChange={handleDirectoryPathChange} />
          <TranslationFileSelector
            directoryPath={directoryPath}
            file={translationFile}
            files={translationFiles}
            onChange={handleTranslationFileChange}
          />
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
