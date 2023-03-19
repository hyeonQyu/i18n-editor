import { FileExplorerBefore } from '@components/directorySelector/components/fileExplorer';
import { Button } from 'primereact/button';
import useDirectorySelectorBefore from '@components/directorySelector/useDirectorySelectorBefore';
import { PathChangeEvent } from '@components/directorySelector/defines';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';
import { COLOR } from '@defines/css';
import { CustomEventHandler } from '@defines/event';
import { Menu } from 'primereact/menu';

export interface DirectorySelectorBeforeProps {
  path: string | undefined;
  invalid: boolean;
  onChange: CustomEventHandler<PathChangeEvent>;
}

const inputId = 'locale-directory';

/**
 * TODO 삭제
 * @deprecated
 * @param props
 * @constructor
 */
export function DirectorySelectorBefore(props: DirectorySelectorBeforeProps) {
  const { path, invalid, onChange } = props;

  const {
    fileExplorerRef,
    menuRef,
    isFileExplorerOpened,
    menuItems,
    handleSelectClick,
    handleFocus,
    handleMenuClick,
    handleFileExplorerShow,
    handleFileExplorerHide,
  } = useDirectorySelectorBefore(props);

  return (
    <>
      <div className={'directory-selector p-inputgroup'}>
        <Button icon={'pi pi-search'} className={'p-button'} onClick={handleSelectClick} />
        <>
          <FileExplorerBefore
            ref={fileExplorerRef}
            path={path}
            opened={isFileExplorerOpened}
            onChange={onChange}
            onShow={handleFileExplorerShow}
            onHide={handleFileExplorerHide}
          />
        </>

        <span className={'p-float-label'}>
          <InputText
            id={inputId}
            value={path || ''}
            onChange={() => {}}
            onFocus={handleFocus}
            className={classNames(invalid && 'p-invalid')}
          />
          <label
            htmlFor={inputId}
            className={classNames(isFileExplorerOpened && 'opened', Boolean(path) && 'selected', invalid && 'invalid')}
          >
            Locale 디렉토리를 선택하세요
          </label>
        </span>

        <Button icon={'pi pi-bars'} className={'p-button p-button-outlined'} onClick={handleMenuClick} disabled={!path} />
        <Menu ref={menuRef} model={menuItems} popup />
      </div>

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
