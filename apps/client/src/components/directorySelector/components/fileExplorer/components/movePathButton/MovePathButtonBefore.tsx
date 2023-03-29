import { SelectButton, SelectButtonChangeParams } from 'primereact/selectbutton';
import { SelectButtonTemplate } from '@components/selectButtonTemplate';
import { MOVE_PATH_OPTIONS } from '@components/directorySelector/defines';
import useMovePathButtonBefore from '@components/directorySelector/components/fileExplorer/components/movePathButton/useMovePathButtonBefore';
import { CustomEventHandler } from '@defines/event';

export interface MovePathButtonProps {
  onChange: CustomEventHandler<SelectButtonChangeParams>;
  backwardStack: string[];
  forwardStack: string[];
}

/**
 * @deprecated
 * TODO 삭제
 * @param props
 * @constructor
 */
function MovePathButtonBefore(props: MovePathButtonProps) {
  const { onChange } = props;
  const { getOptionDisabled } = useMovePathButtonBefore(props);

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

export default MovePathButtonBefore;
