import { useRecoilState, useRecoilValue } from 'recoil';
import { fileExplorerStates } from '@components/directorySelector/components/fileExplorer/stores/store';
import { ChangeEventHandler } from 'react';

export interface UseInputFilterParams {}

export interface UseInputFilter {
  filterKeyword: string;
  placeholder: string;
  handleKeywordChange: ChangeEventHandler<HTMLInputElement>;
}

export default function useInputFilter(params: UseInputFilterParams): UseInputFilter {
  const {} = params;

  const path = useRecoilValue(fileExplorerStates.path);

  const [filterKeyword, setFilterKeyword] = useRecoilState(fileExplorerStates.filterKeyword);
  const placeholder = `${path.split('/').pop()} 검색`;

  const handleKeywordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFilterKeyword(e.target.value);
  };

  return {
    filterKeyword,
    placeholder,
    handleKeywordChange,
  };
}
