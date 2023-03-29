import { CustomEventHandler } from '@defines/event';
import { SelectButtonChangeParams } from 'primereact/selectbutton';
import { MoveDirection } from '@components/directorySelector/defines';
import useFileExplorerPathChange from '@components/directorySelector/components/fileExplorer/hooks/useFileExplorerPathChange';
import { useRecoilValue } from 'recoil';
import { fileExplorerStates } from '@components/directorySelector/components/fileExplorer/stores/store';
import { SelectButtonTemplateOption } from '@defines/selectButtonTemplate';

export interface UseMovePathButton {
  handleChange: CustomEventHandler<SelectButtonChangeParams>;
  getOptionDisabled: (option: SelectButtonTemplateOption<MoveDirection>) => boolean;
}

export default function useMovePathButton(): UseMovePathButton {
  const forwardStack = useRecoilValue(fileExplorerStates.forwardStack);
  const backwardStack = useRecoilValue(fileExplorerStates.backwardStack);

  const { changePathForward, changePathBackward } = useFileExplorerPathChange();

  const handleChange: CustomEventHandler<SelectButtonChangeParams> = (e) => {
    if (!e) return;

    const value = e.value as MoveDirection;
    switch (value) {
      case 'forward':
        changePathForward(forwardStack[forwardStack.length - 1]);
        break;

      case 'backward':
        changePathBackward(backwardStack[backwardStack.length - 1]);
        break;
    }
  };

  const getOptionDisabled = (option: SelectButtonTemplateOption<MoveDirection>): boolean => {
    switch (option.value) {
      case 'forward':
        return !forwardStack.length;

      case 'backward':
        return !backwardStack.length;

      default:
        return false;
    }
  };

  return {
    handleChange,
    getOptionDisabled,
  };
}
