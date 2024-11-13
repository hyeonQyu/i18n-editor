import { ViewType, VIEW_OPTIONS } from '../../../../defines';
import { SelectButtonTemplate } from '../../../../../selectButtonTemplate';
import { CustomEventHandler } from '../../../../../../defines/event';
import { SelectButton, SelectButtonChangeParams } from 'primereact/selectbutton';

/**
 * @deprecated
 */
export interface ViewOptionSelectorProps {
  value: ViewType;
  onChange: CustomEventHandler<SelectButtonChangeParams>;
}

/**
 * @deprecated
 */
export function ViewOptionSelector(props: ViewOptionSelectorProps) {
  const { value, onChange } = props;

  return (
    <>
      <SelectButton value={value} options={VIEW_OPTIONS} onChange={onChange} itemTemplate={SelectButtonTemplate} unselectable={false} />

      <style jsx>{``}</style>
    </>
  );
}
