import { SelectButton, SelectButtonChangeParams } from 'primereact/selectbutton';
import { DirectorySelectorEventHandler, VIEW_OPTIONS, ViewType } from '@components/directorySelector/defines';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { SelectButtonTemplate } from '@components/selectButtonTemplate';

export interface ViewOptionSelectorProps {
  value: ViewType;
  onChange: DirectorySelectorEventHandler<SelectButtonChangeParams>;
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
