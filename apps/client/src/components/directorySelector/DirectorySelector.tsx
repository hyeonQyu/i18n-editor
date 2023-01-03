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

  const { fileExplorerRef, handleClick, handleFocus } = useDirectorySelector(props);

  return (
    <>
      <div className={'p-inputgroup'}>
        <InputText placeholder={'Locale 디렉토리 선택'} value={path} onChange={() => {}} onFocus={handleFocus} />
        <Button icon={'pi pi-search'} className={'p-button'} onClick={handleClick} />
      </div>

      <FileExplorer ref={fileExplorerRef} path={path} onChange={onChange} />

      <style jsx>{`
        :global(input) {
          color: transparent;
          text-shadow: 0 0 0 black;
        }
      `}</style>
    </>
  );
}
