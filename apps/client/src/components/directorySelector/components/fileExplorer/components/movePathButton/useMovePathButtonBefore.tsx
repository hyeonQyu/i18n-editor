import { MovePathButtonProps } from '@components/directorySelector/components/fileExplorer/components/movePathButton/MovePathButtonBefore';
import { SelectButtonTemplateOption } from '@defines/selectButtonTemplate';
import { MoveDirection } from '@components/directorySelector/defines';

export interface IUseMovePathButtonParams extends MovePathButtonProps {}

export interface IUseMovePathButton {
  getOptionDisabled: (option: SelectButtonTemplateOption<MoveDirection>) => boolean;
}

/**
 * @deprecated
 * TODO 삭제
 * @param params
 */
function useMovePathButtonBefore(params: IUseMovePathButtonParams): IUseMovePathButton {
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

export default useMovePathButtonBefore;
