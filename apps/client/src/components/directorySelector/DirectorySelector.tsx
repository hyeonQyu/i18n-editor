import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';
import { Menu } from 'primereact/menu';
import useDirectorySelector from '@components/directorySelector/useDirectorySelector';
import { COLOR } from '@defines/css';
import { useRecoilValue } from 'recoil';
import { localeDirectoryPathState } from '@stores/store';
import { FileExplorer } from '@components/directorySelector/components/fileExplorer';

export interface DirectorySelectorProps {}

const INPUT_ID = 'input-locale-directory';

function DirectorySelector(props: DirectorySelectorProps) {
  const {} = props;

  const localeDirectoryPath = useRecoilValue(localeDirectoryPathState);
  const {
    fileExplorerRef,
    menuRef,
    isFileExplorerOpened,
    menuItems,
    invalid,
    handleOpenFileExplorerButtonClick,
    handleInputChange,
    handleInputFocus,
    handleMenuClick,
    handleFileExplorerShow,
    handleFileExplorerHide,
  } = useDirectorySelector();

  return (
    <>
      <div className={'directory-selector p-inputgroup'}>
        <Button icon={'pi pi-search'} className={'p-button'} onClick={handleOpenFileExplorerButtonClick} />

        <span className={'p-float-label'}>
          <InputText
            id={INPUT_ID}
            value={localeDirectoryPath || ''}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className={classNames(invalid && 'p-invalid')}
          />
          <label
            htmlFor={INPUT_ID}
            className={classNames(isFileExplorerOpened && 'opened', Boolean(localeDirectoryPath) && 'selected', invalid && 'invalid')}
          >
            Locale 디렉토리를 선택하세요
          </label>
        </span>

        <Button icon={'pi pi-bars'} className={'p-button p-button-outlined'} onClick={handleMenuClick} disabled={!localeDirectoryPath} />
        <Menu ref={menuRef} model={menuItems} popup />
      </div>

      <FileExplorer ref={fileExplorerRef} onShow={handleFileExplorerShow} onHide={handleFileExplorerHide} />

      <style jsx>{`
        .directory-selector {
          position: relative;
        }

        .p-float-label > label.opened,
        .p-float-label > label.selected {
          top: -0.75rem;
          font-size: 12px;
        }

        label.invalid {
          color: ${COLOR.invalid};
          animation: shake 0.2s ease;
        }
      `}</style>
    </>
  );
}

export default DirectorySelector;
