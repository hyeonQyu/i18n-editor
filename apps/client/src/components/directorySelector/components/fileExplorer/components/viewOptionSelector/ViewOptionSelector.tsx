import { SelectButton, SelectButtonChangeParams } from 'primereact/selectbutton';
import { VIEW_OPTIONS, ViewType } from '@components/directorySelector/defines';
import { SelectButtonTemplate } from '@components/selectButtonTemplate';
import { CustomEventHandler } from '@defines/event';

export interface ViewOptionSelectorProps {
  value: ViewType;
  onChange: CustomEventHandler<SelectButtonChangeParams>;
}

export function ViewOptionSelector(props: ViewOptionSelectorProps) {
  const { value, onChange } = props;

  return (
    <>
      <SelectButton value={value} options={VIEW_OPTIONS} onChange={onChange} itemTemplate={SelectButtonTemplate} unselectable={false} />

      <style jsx>{``}</style>
    </>
  );
}
