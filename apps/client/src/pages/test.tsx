import { DirectorySelector } from '@components/directorySelector';
import { LocaleDirectoryCreationDialog } from '@components/localeDirectoryCreationDialog';
import useConfig from '@hooks/common/useConfig';
import { HomeSkeleton } from '@components/page/home/homeSkeleton';
import { TranslationFileSelector } from '../components/translationFileSelector';
import { TranslationFileEditor } from '@components/translationFileEditor';

export interface TestProps {}

// TODO 테스트 후 제거
function Test(props: TestProps) {
  const {} = props;

  const { isLoadingGetConfig } = useConfig();

  return (
    <>
      <LocaleDirectoryCreationDialog />

      {isLoadingGetConfig ? (
        <HomeSkeleton />
      ) : (
        <>
          <div className={'file-select-container'}>
            <DirectorySelector />
            <TranslationFileSelector />
          </div>

          <div className={'table-container'}>
            <TranslationFileEditor />
          </div>
        </>
      )}

      <style jsx>{`
        .file-select-container {
          padding: 60px 0;
          width: 600px;
          margin: 0 auto;
        }

        .file-select-container > :global(*:not(:first-child)) {
          margin-top: 42px;
        }
      `}</style>
    </>
  );
}

export default Test;
