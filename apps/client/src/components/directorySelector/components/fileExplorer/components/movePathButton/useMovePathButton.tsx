import { MovePathButtonProps } from '@components/directorySelector/components/fileExplorer/components/movePathButton';
import { SelectButtonTemplateOption } from '@defines/selectButtonTemplate';
import { MoveDirection } from '@components/directorySelector/defines';

export interface IUseMovePathButtonParams extends MovePathButtonProps {}

export interface IUseMovePathButton {
  getOptionDisabled: (option: SelectButtonTemplateOption<MoveDirection>) => boolean;
}

function useMovePathButton(params: IUseMovePathButtonParams): IUseMovePathButton {
  const { backwardStack, forwardStack } = params;

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
    getOptionDisabled,
  };
}

export default useMovePathButton;
