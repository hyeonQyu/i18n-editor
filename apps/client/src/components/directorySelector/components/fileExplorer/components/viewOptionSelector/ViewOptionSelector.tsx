import { SelectButton, SelectButtonChangeParams } from 'primereact/selectbutton';
import { DirectorySelectorEventHandler, VIEW_OPTIONS, ViewOption, ViewType } from '@components/directorySelector/defines';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export interface ViewOptionSelectorProps {
  value: ViewType;
  onChange: DirectorySelectorEventHandler<SelectButtonChangeParams>;
}

export function ViewOptionSelector(props: ViewOptionSelectorProps) {
  const { value, onChange } = props;

  const template = (option: ViewOption) => {
    return <i className={option.icon} />;
  };

  return (
    <>
      <SelectButton value={value} options={VIEW_OPTIONS} onChange={onChange} itemTemplate={template} />

      <style jsx>{``}</style>
    </>
  );
}
