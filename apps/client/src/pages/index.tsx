import { DirectorySelector } from '@components/directorySelector';
import useHome from '@hooks/pages/useHome';
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
    tableContainerRef,
    handleDirectoryPathChange,
    handleTranslationFileChange,
    handleTranslationContentChange,
    onAddColumn,
    onDeleteColumn,
    onAddRowAbove,
    onAddRowBelow,
    onClearRowContent,
    onDeleteRow,
  } = useHome({});

  return (
    <>
      <div className={'file-select-container'}>
        <DirectorySelector path={directoryPath} invalid={hasDirectorySelectorError} onChange={handleDirectoryPathChange} />
        <TranslationFileSelector
          directoryPath={directoryPath}
          file={translationFile}
          files={translationFiles}
          onChange={handleTranslationFileChange}
        />
      </div>

      <div className={'table-container'} ref={tableContainerRef}>
        <TranslationFileEditor
          columns={contentColumns}
          rows={contentRows}
          onChange={handleTranslationContentChange}
          onAddColumn={onAddColumn}
          onDeleteColumn={onDeleteColumn}
          onAddRowAbove={onAddRowAbove}
          onAddRowBelow={onAddRowBelow}
          onClearRowContent={onClearRowContent}
          onDeleteRow={onDeleteRow}
        />
      </div>

      <style jsx>{`
        .file-select-container {
          padding: 60px 0;
          width: 600px;
          margin: 0 auto;
        }

        .file-select-container > :global(*:not(:first-child)) {
          margin-top: 42px;
        }

        .table-container {
          width: 100%;
          ${Boolean(contentColumns) && Boolean(contentRows) ? 'height: 100vh' : ''};
          padding: 0 50px;
        }
        :global(.p-datatable-wrapper::-webkit-scrollbar) {
          width: 8px;
          background-color: var(--surface-b);
        }
        :global(.p-datatable-wrapper::-webkit-scrollbar-thumb) {
          background-color: var(--surface-400);
          border-radius: 10px;
        }
        :global(.p-datatable-wrapper::-webkit-scrollbar-thumb:hover) {
          background-color: var(--surface-500);
        }
        :global(.p-datatable-wrapper::-webkit-scrollbar-thumb:active) {
          background-color: var(--surface-600);
        }
        :global(.p-datatable-wrapper::-webkit-scrollbar-track) {
          background: none;
        }
      `}</style>
    </>
  );
}

export default Index;
