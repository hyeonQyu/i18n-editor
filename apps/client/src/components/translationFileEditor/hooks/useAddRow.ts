import useMutationPostContentRow from '@hooks/queries/useMutationPostContentRow';
import { getNewRowAddedContentRows } from '@utils/tableUtil';
import { useToastContext } from '@contexts/toastContext';
import { useRecoilState, useRecoilValue } from 'recoil';
import { localeDirectoryPathState, translationFileNameState } from '@stores/store';
import { translationFileEditorStates } from '@components/translationFileEditor/stores/store';
import useInputFilter from '@components/translationFileEditor/hooks/useInputFilter';

export interface UseAddRowParams {}

export interface UseAddRow {
  addRow: (key: string) => void;
  addRowAbove: (key: string) => void;
  addRowBelow: (key: string) => void;
}

export default function useAddRow(params: UseAddRowParams): UseAddRow {
  const {} = params;

  const { toastRef } = useToastContext();

  const localeDirectoryPath = useRecoilValue(localeDirectoryPathState);
  const translationFileName = useRecoilValue(translationFileNameState);

  const { mutate: mutatePostContentRow } = useMutationPostContentRow({});

  const inputFilterValue = useRecoilValue(translationFileEditorStates.filterValue);
  const [rows, setRows] = useRecoilState(translationFileEditorStates.rows);
  const columns = useRecoilValue(translationFileEditorStates.columns);
  const [editRowIndex, setEditRowIndex] = useRecoilState(translationFileEditorStates.editRowIndex);

  const inputFilter = useInputFilter({});

  const addRowToIndex = (index: number, key: string) => {
    mutatePostContentRow(
      {
        path: localeDirectoryPath!,
        fileName: translationFileName!,
        row: {
          index,
          key,
        },
      },
      {
        onSuccess({ data }) {
          if (!data) return;
          const {
            row: { index, key },
          } = data;

          setRows((prev) => getNewRowAddedContentRows(prev!, columns!, index, key));

          toastRef.current?.show({
            severity: 'success',
            detail: '행을 추가했어요',
            life: 3000,
          });

          setEditRowIndex(index);

          if (key.toLowerCase().includes(inputFilterValue.toLowerCase())) return;
          inputFilter.clear();
        },
      },
    );
  };

  const addRow = (key: string) => addRowToIndex(rows.length, key);

  const addRowAbove = (key: string) => addRowToIndex(editRowIndex!, key);

  const addRowBelow = (key: string) => addRowToIndex(editRowIndex! + 1, key);

  return {
    addRow,
    addRowAbove,
    addRowBelow,
  };
}
