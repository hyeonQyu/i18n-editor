import { FileExplorer } from '@components/directorySelector/components/fileExplorer';
import { Button } from 'primereact/button';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import useDirectorySelector from '@components/directorySelector/useDirectorySelector';

export interface DirectorySelectorProps {}

export function DirectorySelector(props: DirectorySelectorProps) {
  const {} = props;

  const { fileExplorerRef, path, handleClick } = useDirectorySelector(props);

  return (
    <>
      <Button label={'Locale 디렉토리 선택'} onClick={handleClick} />
      <FileExplorer ref={fileExplorerRef} path={path} />

      <style jsx>{``}</style>
    </>
  );
}
