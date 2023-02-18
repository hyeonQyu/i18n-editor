import { SelectItem } from 'primereact/selectitem';
import { LANGUAGE_SELECT_OPTIONS } from '@components/translationFileEditor/defines';
import { DropdownLanguageOptionTemplate } from '@components/languageCodeMultiSelect/components/dropdownLanguageOptionTemplate';
import { MultiSelect } from 'primereact/multiselect';
import { UseMultiSelect } from '@hooks/common/useMultiSelect';

export interface LanguageCodeMultiSelectProps {
  multiSelectLanguageCode: UseMultiSelect;
  options?: SelectItem[];
}

export function LanguageCodeMultiSelect(props: LanguageCodeMultiSelectProps) {
  const { multiSelectLanguageCode, options = LANGUAGE_SELECT_OPTIONS } = props;

  return (
    <>
      <MultiSelect
        {...multiSelectLanguageCode}
        options={options}
        optionLabel={'label'}
        filter
        filterBy={'title'}
        autoFocus
        scrollHeight={'300px'}
        emptyFilterMessage={'일치하는 언어 코드가 없어요'}
        itemTemplate={DropdownLanguageOptionTemplate}
        display={'chip'}
        className={'language-code-multi-select'}
        panelClassName={'language-code-multi-select__panel'}
      />

      <style jsx>{`
        :global(.language-code-multi-select) {
          width: 100%;
        }

        :global(.language-code-multi-select__panel .p-multiselect-item > span) {
          display: block;
          width: 100%;
        }
      `}</style>
    </>
  );
}
