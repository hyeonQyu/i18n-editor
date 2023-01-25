import { IUseDropdown } from '@hooks/common/useDropdown';
import { SelectItem } from 'primereact/selectitem';
import { LANGUAGE_SELECT_OPTIONS } from '@components/translationFileEditor/defines';
import { Dropdown } from 'primereact/dropdown';
import { DropdownLanguageOptionTemplate } from '@components/languageCodeDropdown/components/dropdownLanguageOptionTemplate';
import { DropdownLanguageHeaderTemplate } from '@components/languageCodeDropdown/components/dropdownLanguageHeaderTemplate';

export interface LanguageCodeDropdownProps {
  dropdownLanguageCode: IUseDropdown;
  options?: SelectItem[];
}

export function LanguageCodeDropdown(props: LanguageCodeDropdownProps) {
  const { dropdownLanguageCode, options = LANGUAGE_SELECT_OPTIONS } = props;

  return (
    <>
      <Dropdown
        value={dropdownLanguageCode.value}
        onChange={dropdownLanguageCode.onChange}
        options={options}
        optionLabel={'label'}
        filter
        filterBy={'title'}
        autoFocus
        scrollHeight={'300px'}
        emptyFilterMessage={'일치하는 언어 코드가 없어요'}
        itemTemplate={DropdownLanguageOptionTemplate}
        valueTemplate={DropdownLanguageHeaderTemplate}
        className={'language-code-dropdown'}
      />

      <style jsx>{`
        :global(.language-code-dropdown) {
          width: 100%;
        }
      `}</style>
    </>
  );
}
