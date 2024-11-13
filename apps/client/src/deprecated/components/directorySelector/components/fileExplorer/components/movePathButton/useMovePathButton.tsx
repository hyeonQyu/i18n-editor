import { MovePathButtonProps } from './index';
import { MoveDirection } from '../../../../defines';
import { SelectButtonTemplateOption } from '../../../../../../defines/selectButtonTemplate';

/**
 * @deprecated
 */
export interface IUseMovePathButtonParams extends MovePathButtonProps {}

/**
 * @deprecated
 */
export interface IUseMovePathButton {
  getOptionDisabled: (option: SelectButtonTemplateOption<MoveDirection>) => boolean;
}

/**
 * @deprecated
 */
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
