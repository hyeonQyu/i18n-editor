import { useRecoilValue, useSetRecoilState } from 'recoil';
import { localeDirectoryPathState, translationFileNameState } from '@stores/store';
import { MouseEventHandler, RefObject } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { fileExplorerStates } from '@components/directorySelector/components/fileExplorer/stores/store';

export interface UseFileExplorerSelectDirectoryParams {
  ref: RefObject<OverlayPanel>;
}

export interface UseFileExplorerSelectDirectory {
  handleSelectButtonClick: MouseEventHandler<HTMLButtonElement>;
}

export default function useFileExplorerSelectDirectory(params: UseFileExplorerSelectDirectoryParams): UseFileExplorerSelectDirectory {
  const { ref } = params;

  const setLocaleDirectoryPath = useSetRecoilState(localeDirectoryPathState);
  const setTranslationFileName = useSetRecoilState(translationFileNameState);

  const path = useRecoilValue(fileExplorerStates.path);

  const handleSelectButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    ref.current?.hide();
    setLocaleDirectoryPath(path);
    setTranslationFileName(undefined);
  };

  return {
    handleSelectButtonClick,
  };
}
