import { SelectButton, SelectButtonChangeParams } from 'primereact/selectbutton';
import { SelectButtonTemplate } from '@components/selectButtonTemplate';
import { DirectorySelectorEventHandler, MOVE_PATH_OPTIONS } from '@components/directorySelector/defines';

export interface MovePathButtonProps {
  onChange: DirectorySelectorEventHandler<SelectButtonChangeParams>;
}

export function MovePathButton(props: MovePathButtonProps) {
  const { onChange } = props;

  return (
    <>
      <SelectButton
        className={'move-path'}
        options={MOVE_PATH_OPTIONS}
        onChange={onChange}
        unselectable={false}
        itemTemplate={SelectButtonTemplate}
      />

      <style jsx>{`
        :global(.move-path > .p-button) {
          height: 50px;
        }
      `}</style>
    </>
  );
}
