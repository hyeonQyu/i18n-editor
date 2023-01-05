import { SelectButton, SelectButtonChangeParams } from 'primereact/selectbutton';
import { SelectButtonTemplate } from '@components/selectButtonTemplate';
import { DirectorySelectorEventHandler, MOVE_PATH_OPTIONS } from '@components/directorySelector/defines';
import useMovePathButton from '@components/directorySelector/components/fileExplorer/components/movePathButton/useMovePathButton';

export interface MovePathButtonProps {
  onChange: DirectorySelectorEventHandler<SelectButtonChangeParams>;
  backwardStack: string[];
  forwardStack: string[];
}

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
