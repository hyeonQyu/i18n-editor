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
          <span className={'p-input-icon-left'}>
            <i className={'pi pi-search'} />
            <InputText placeholder={'key, 번역값으로 검색'} value={inputFilter.value} onChange={inputFilter.onChange} />
          </span>
        </div>
      </div>

      <style jsx>{`
        .table-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1rem;
        }
      `}</style>
    </>
  );
}

export default TableHeader;
