import { SelectButton } from 'primereact/selectbutton';
import { SelectButtonTemplate } from '@components/selectButtonTemplate';
import { MOVE_PATH_OPTIONS } from '@components/directorySelector/defines';
import useMovePathButton from '@components/directorySelector/components/fileExplorer/components/movePathButton/useMovePathButton';

export interface MovePathButtonProps {}

function MovePathButton(props: MovePathButtonProps) {
  const {} = props;
  const { handleChange, getOptionDisabled } = useMovePathButton();

  return (
    <>
      <SelectButton
        options={MOVE_PATH_OPTIONS}
        onChange={handleChange}
        unselectable={false}
        itemTemplate={SelectButtonTemplate}
        optionDisabled={getOptionDisabled}
        className={'move-path'}
      />

      <style jsx>{`
        :global(.move-path) {
          width: fit-content;
          display: flex;
        }

        :global(.move-path .p-button) {
          padding: 12px 10px;
        }
      `}</style>
    </>
  );
}

export default MovePathButton;
