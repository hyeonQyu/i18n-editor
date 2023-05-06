import useMutationPostContentRow from '@hooks/queries/useMutationPostContentRow';
import { getNewContentRow, getNewRowAddedContentRows, rowToCell } from '@utils/tableUtil';
import { useToastContext } from '@contexts/toastContext';
import { useRecoilState, useRecoilValue } from 'recoil';
import { localeDirectoryPathState, translationFileNameState } from '@stores/store';
import { translationFileEditorStates } from '@components/translationFileEditor/stores/store';
import useInputFilter from '@components/translationFileEditor/hooks/useInputFilter';
import useMutationPatchContent from '@hooks/queries/useMutationPatchContent';
import useMutationDeleteContentRow from '@hooks/queries/useMutationDeleteContentRow';

export interface UseEditRowParams {}

export interface UseEditRow {
  addRow: (key: string) => void;
  addRowAbove: (key: string) => void;
  addRowBelow: (key: string) => void;
  clearRow: () => void;
  deleteRow: () => void;
}

export default function useEditRow(params: UseEditRowParams): UseEditRow {
  const {} = params;

  const { toastRef } = useToastContext();

  const localeDirectoryPath = useRecoilValue(localeDirectoryPathState);
  const translationFileName = useRecoilValue(translationFileNameState);

  const inputFilterValue = useRecoilValue(translationFileEditorStates.filterValue);
  const [rows, setRows] = useRecoilState(translationFileEditorStates.rows);
  const columns = useRecoilValue(translationFileEditorStates.columns);
  const [editRowIndex, setEditRowIndex] = useRecoilState(translationFileEditorStates.editRowIndex);

  const inputFilter = useInputFilter({});

  const { mutate: mutatePatchContent } = useMutationPatchContent({});
  const { mutate: mutatePostContentRow } = useMutationPostContentRow({});
  const { mutate: mutateDeleteContentRow } = useMutationDeleteContentRow({});

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

  const clearRow = () => {
    const index = editRowIndex!;

    mutatePatchContent(
      {
        path: localeDirectoryPath!,
        fileName: translationFileName!,
        cells: rowToCell(rows[index], (cell) => ({ ...cell, value: '' })),
      },
      {
        onSuccess() {
          setRows((prev) => prev!.map((row) => (index === row.index ? getNewContentRow(columns, row.index, row.key) : row)));

          toastRef.current?.show({
            severity: 'success',
            detail: '행의 모든 내용을 지웠어요',
            life: 3000,
          });
        },
      },
    );
  };

  const deleteRow = () => {
    const index = editRowIndex!;

    mutateDeleteContentRow(
      {
        path: localeDirectoryPath!,
        fileName: translationFileName!,
        key: rows[index].key,
      },
      {
        onSuccess() {
          setRows((prev) => [...prev!.slice(0, index), ...prev!.slice(index + 1).map((row) => ({ ...row, index: row.index - 1 }))]);

          toastRef.current?.show({
            severity: 'success',
            detail: '행을 삭제했어요',
            life: 3000,
          });
        },
      },
    );
  };

  return {
    addRow,
    addRowAbove,
    addRowBelow,
    clearRow,
    deleteRow,
  };
}
