import { useRecoilState, useSetRecoilState } from 'recoil';
import { translationFileEditorStates } from '@components/translationFileEditor/stores/store';
import { ChangeEventHandler, useCallback, useEffect } from 'react';
import { DataTableFilterMeta } from 'primereact/datatable';

export interface UseInputFilterParams {}

export interface UseInputFilter {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  clear: () => void;
}

export default function useInputFilter(params: UseInputFilterParams): UseInputFilter {
  const {} = params;

  const [filterValue, setFilterValue] = useRecoilState(translationFileEditorStates.filterValue);
  const setFilter = useSetRecoilState(translationFileEditorStates.filter);

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = useCallback((e) => {
    const { value: targetValue } = e.target;
    setFilterValue(targetValue);
  }, []);

  const clear = useCallback(() => {
    setFilterValue('');
  }, []);

  useEffect(() => {
    setFilter((prev: DataTableFilterMeta) => ({
      ...prev,
      global: {
        ...prev.global,
        value: filterValue,
      },
    }));
  }, [filterValue]);

  return {
    value: filterValue,
    onChange,
    clear,
  };
}
