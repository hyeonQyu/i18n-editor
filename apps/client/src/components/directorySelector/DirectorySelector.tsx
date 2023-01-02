import { FileExplorer } from '@components/directorySelector/components/fileExplorer';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import useDirectorySelector from '@components/directorySelector/useDirectorySelector';
import { DirectorySelectorEventHandler, PathChangeEvent } from '@components/directorySelector/defines';

export interface DirectorySelectorProps {
  path: string;
  onChange: DirectorySelectorEventHandler<PathChangeEvent>;
}

export function DirectorySelector(props: DirectorySelectorProps) {
  const { path, onChange } = props;

  const { fileExplorerRef, handleClick } = useDirectorySelector(props);

  return (
    <>
      <Button label={'Locale 디렉토리 선택'} onClick={handleClick} />
      <FileExplorer ref={fileExplorerRef} path={path} onChange={onChange} />

      <style jsx>{``}</style>
    </>
  );
}
