import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { translationFileEditorStates } from '@components/translationFileEditor/stores/store';
import { FormEventHandler } from 'react';
import useMutationPostContentRow from '@hooks/queries/useMutationPostContentRow';
import { localeDirectoryPathState, translationFileNameState } from '@stores/store';
import useInput, { IUseInput } from '@hooks/common/useInput';
import { getNewContentRow } from '@utils/tableUtil';
import { useToastContext } from '@contexts/toastContext';
import useInputFilter from '@components/translationFileEditor/hooks/useInputFilter';
import { NewTranslationAdderProps } from '@components/translationFileEditor/components/translationContentTable/components/newTranslationAdder/NewTranslationAdder';

export interface UseNewTranslationAdderParams extends NewTranslationAdderProps {}

export interface UseNewTranslationAdder {
  isFiltered: boolean;
  inputTranslationKey: IUseInput;
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
}

export default function useNewTranslationAdder(params: UseNewTranslationAdderParams): UseNewTranslationAdder {
  const {} = params;

  const { toastRef } = useToastContext();

  const localeDirectoryPath = useRecoilValue(localeDirectoryPathState);
  const translationFileName = useRecoilValue(translationFileNameState);

  const inputFilterValue = useRecoilValue(translationFileEditorStates.filterValue);
  const [rows, setRows] = useRecoilState(translationFileEditorStates.rows);
  const columns = useRecoilValue(translationFileEditorStates.columns);
  const setEditRowIndex = useSetRecoilState(translationFileEditorStates.editRowIndex);

  const inputFilter = useInputFilter({});

  const inputTranslationKey = useInput({});

  const isFiltered = Boolean(inputFilterValue && rows.length);

  const { mutate: mutatePostContentRow } = useMutationPostContentRow({});

  /**
   * 새로운 행 추가
   */
  const addRow = () => {
    mutatePostContentRow(
      {
        path: localeDirectoryPath!,
        fileName: translationFileName!,
        row: {
          index: rows.length,
          key: inputTranslationKey.value,
        },
      },
      {
        onSuccess({ data }) {
          if (!data) return;
          const {
            row: { index, key },
          } = data;

          setRows((prev) => [...prev, getNewContentRow(columns, index, key)]);

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

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    addRow();
  };

  return {
    isFiltered,
    inputTranslationKey,
    handleFormSubmit,
  };
}
