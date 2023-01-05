import { DirectorySelector } from '@components/directorySelector';
import useHome from '@hooks/pages/useHome';
import { Layout } from '@components/directorySelector/components/layout';
import { TranslationFileSelector } from '@components/translationFileSelector';
import TranslationFileEditor from '@components/translationFileEditor/TranslationFileEditor';

export interface IndexProps {}

function Index(props: IndexProps) {
  const {} = props;
  const {
    directoryPath,
    translationFiles,
    translationFile,
    hasDirectorySelectorError,
    contentColumns,
    contentRows,
    handleDirectoryPathChange,
    handleTranslationFileChange,
  } = useHome({});

  return (
    <>
      <Layout>
        <div className={'file-select-container'}>
          <DirectorySelector path={directoryPath} invalid={hasDirectorySelectorError} onChange={handleDirectoryPathChange} />
          <TranslationFileSelector
            directoryPath={directoryPath}
            file={translationFile}
            files={translationFiles}
            onChange={handleTranslationFileChange}
          />
        </div>

        <div className={'table-container'}>
          <TranslationFileEditor columns={contentColumns} rows={contentRows} />
        </div>
      </Layout>

      <style jsx>{`
        .file-select-container {
          padding: 80px 0;
          width: 600px;
          margin: 0 auto;
        }

        .file-select-container > :global(*:not(:first-child)) {
          margin-top: 42px;
        }

        .table-container {
          width: 100%;
        }
      `}</style>
    </>
  );
}

export default Index;
