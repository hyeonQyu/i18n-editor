import { FileExplorer } from '@components/directorySelector/components/fileExplorer';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import useDirectorySelector from '@components/directorySelector/useDirectorySelector';
import { DirectorySelectorEventHandler, PathChangeEvent } from '@components/directorySelector/defines';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';
import { COLOR } from '@defines/css';

export interface DirectorySelectorProps {
  path: string;
  invalid: boolean;
  onChange: DirectorySelectorEventHandler<PathChangeEvent>;
}

const inputId = 'locale-directory';

export function DirectorySelector(props: DirectorySelectorProps) {
  const { path, invalid, onChange } = props;

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
          <InputText id={inputId} value={path} onChange={() => {}} onFocus={handleFocus} className={classNames(invalid && 'p-invalid')} />
          <label
            htmlFor={inputId}
            className={classNames(isFileExplorerOpened && 'opened', Boolean(path) && 'selected', invalid && 'invalid')}
          >
            Locale 디렉토리
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
        .p-float-label > label.opened,
        .p-float-label > label.selected {
          top: -0.75rem;
          left: calc(-41px + 0.75rem);
          font-size: 12px;
        }

        label.invalid {
          color: ${COLOR.invalid};
        }
      `}</style>
    </>
  );
}
