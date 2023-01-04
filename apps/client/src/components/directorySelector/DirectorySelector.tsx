import { FileExplorer } from '@components/directorySelector/components/fileExplorer';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import useDirectorySelector from '@components/directorySelector/useDirectorySelector';
import { DirectorySelectorEventHandler, PathChangeEvent } from '@components/directorySelector/defines';
import { InputText } from 'primereact/inputtext';

export interface DirectorySelectorProps {
  path: string;
  onChange: DirectorySelectorEventHandler<PathChangeEvent>;
}

export function DirectorySelector(props: DirectorySelectorProps) {
  const { path, onChange } = props;

  const {
    fileExplorerRef,
    isFileExplorerOpened,
    handleSelectClick,
    handleFocus,
    handleCopyClick,
    handleFileExplorerShow,
    handleFileExplorerHide,
  } = useDirectorySelector(props);

  return (
    <>
      <div className={'p-inputgroup'}>
        <Button icon={'pi pi-search'} className={'p-button'} onClick={handleSelectClick} />
        <span className={'p-float-label'}>
          <InputText id={'locale-directory'} value={path} onChange={() => {}} onFocus={handleFocus} />
          <label htmlFor={'locale-directory'} className={isFileExplorerOpened ? 'opened' : ''}>
            Locale 디렉토리 선택
          </label>
        </span>
        <Button icon={'pi pi-clone'} className={'p-button p-button-outlined'} onClick={handleCopyClick} disabled={!path} />
      </div>

      <FileExplorer
        ref={fileExplorerRef}
        path={path}
        opened={isFileExplorerOpened}
        onChange={onChange}
        onShow={handleFileExplorerShow}
        onHide={handleFileExplorerHide}
      />

      <style jsx>{`
        :global(input) {
          color: transparent;
          text-shadow: 0 0 0 black;
        }

        .p-float-label > label.opened {
          top: -0.75rem;
          font-size: 12px;
        }
      `}</style>
    </>
  );
}
