import useMovePathButton from './useMovePathButton';
import { MOVE_PATH_OPTIONS } from '../../../../defines';
import { SelectButtonTemplate } from '../../../../../selectButtonTemplate';
import { CustomEventHandler } from '../../../../../../defines/event';
import { SelectButton, SelectButtonChangeParams } from 'primereact/selectbutton';

/**
 * @deprecated
 */
export interface MovePathButtonProps {
  onChange: CustomEventHandler<SelectButtonChangeParams>;
  backwardStack: string[];
  forwardStack: string[];
}

/**
 * @deprecated
 */
export function MovePathButton(props: MovePathButtonProps) {
  const { onChange } = props;
  const { getOptionDisabled } = useMovePathButton(props);

  return (
    <>
      <SelectButton
        options={MOVE_PATH_OPTIONS}
        onChange={onChange}
        unselectable={false}
        itemTemplate={SelectButtonTemplate}
        optionDisabled={getOptionDisabled}
        className={'move-path'}
      />

      <style jsx>{`
        :global(.move-path) {
          width: fit-content;
        }

        :global(.move-path .p-button) {
          padding: 12px 10px;
        }
      `}</style>
    </>
  );
}
