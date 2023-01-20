import { Button } from 'primereact/button';
import { DataTableHeaderTemplateOptions } from 'primereact/datatable';
import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';
import { InputText } from 'primereact/inputtext';

export interface TableHeaderProps extends DataTableHeaderTemplateOptions {}

function TableHeader(props: TableHeaderProps) {
  const {} = props;
  const { inputFilter, handleAddColumnClick } = useTranslationFileEditorContext();

  return (
    <>
      <div className={'table-header'}>
        <div>
          <Button label={'언어 코드 추가'} icon={'pi pi-plus'} onClick={handleAddColumnClick} />
        </div>
        <div>
          <div className={'p-inputgroup'}>
            <span className={'p-input-icon-left'}>
              <i className={'pi pi-search'} />
              <InputText placeholder={'검색'} value={inputFilter.value} onChange={inputFilter.onChange} className={'search'} />
            </span>
            <Button icon={'pi pi-times'} className={'p-button p-button-danger'} onClick={inputFilter.clear} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .table-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1rem;
        }

        .table-header :global(.search) {
          width: 100%;
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
      `}</style>
    </>
  );
}

export default TableHeader;
