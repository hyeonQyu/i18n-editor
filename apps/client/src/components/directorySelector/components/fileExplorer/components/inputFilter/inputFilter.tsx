import { InputText } from 'primereact/inputtext';
import useInputFilter, {
  UseInputFilterParams,
} from '@components/directorySelector/components/fileExplorer/components/inputFilter/useInputFilter';

export interface InputFilterProps extends UseInputFilterParams {}

function InputFilter(props: InputFilterProps) {
  const {} = props;
  const { filterKeyword, placeholder, handleKeywordChange } = useInputFilter(props);

  return (
    <>
      <span className={'p-input-icon-left'}>
        <i className={'filter-icon pi pi-search'} />
        <InputText value={filterKeyword} placeholder={placeholder} onChange={handleKeywordChange} className={'filter'} />
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

export default InputFilter;
