import { SelectButton, SelectButtonChangeParams } from 'primereact/selectbutton';
import { VIEW_OPTIONS, ViewType } from '@components/directorySelector/defines';
import { SelectButtonTemplate } from '@components/selectButtonTemplate';
import { CustomEventHandler } from '@defines/event';
import { memo } from 'react';

export interface ViewOptionSelectorProps {
  value: ViewType;
  onChange: CustomEventHandler<SelectButtonChangeParams>;
}

function ViewOptionSelectorBefore(props: ViewOptionSelectorProps) {
  const { value, onChange } = props;

  return (
    <>
      <SelectButton value={value} options={VIEW_OPTIONS} onChange={onChange} itemTemplate={SelectButtonTemplate} unselectable={false} />

      <style jsx>{``}</style>
    </>
  );
}

export default memo(ViewOptionSelectorBefore);
