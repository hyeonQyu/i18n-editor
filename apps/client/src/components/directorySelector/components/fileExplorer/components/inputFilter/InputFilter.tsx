import { InputText } from 'primereact/inputtext';
import { ChangeEventHandler } from 'react';

export interface InputFilterProps {
  keyword: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export function InputFilter(props: InputFilterProps) {
  const { keyword, placeholder, onChange } = props;

  return (
    <>
      <span className={'p-input-icon-left'}>
        <i className={'filter-icon pi pi-search'} />
        <InputText value={keyword} placeholder={placeholder} onChange={onChange} className={'filter'} />
      </span>

      <style jsx>{`
        .p-input-icon-left :global(.filter-icon),
        .p-input-icon-left :global(.filter) {
          font-size: 13px;
        }
        .p-input-icon-left:global(.filter-icon) {
          top: calc(50% + 2px) !important;
        }
        .p-input-icon-left :global(.filter) {
          height: 42px;
          width: 100%;
          padding-left: 1.8rem;
        }
      `}</style>
    </>
  );
}
