import { useToastContext } from '@contexts/toastContext';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { localeDirectoryPathState, translationFileNameState } from '@stores/store';
import useMutationDeleteContentColumn from '@hooks/queries/useMutationDeleteContentColumn';
import { translationFileEditorStates } from '@components/translationFileEditor/stores/store';
import { LanguageCode } from 'i18n-editor-common';

export interface UseEditColumnParams {}

export interface UseEditColumn {
  deleteColumn: () => void;
}

export default function useEditColumn(params: UseEditColumnParams): UseEditColumn {
  const {} = params;

  const { toastRef } = useToastContext();

  const localeDirectoryPath = useRecoilValue(localeDirectoryPathState);
  const translationFileName = useRecoilValue(translationFileNameState);

  const [editColumnHeaderKey, setEditColumnHeaderKey] = useRecoilState(translationFileEditorStates.editColumnHeaderKey);
  const setRows = useSetRecoilState(translationFileEditorStates.rows);
  const setColumns = useSetRecoilState(translationFileEditorStates.columns);

  const { mutate: mutateDeleteContentColumn } = useMutationDeleteContentColumn({});

  const deleteColumn = () => {
    mutateDeleteContentColumn(
      {
        path: localeDirectoryPath!,
        fileName: translationFileName!,
        languageCode: editColumnHeaderKey as LanguageCode,
      },
      {
        onSuccess({ data }) {
          if (!data) return;

          const { columns, rows } = data;

          setRows(rows);
          setColumns(columns);

          toastRef.current?.show({
            severity: 'success',
            detail: '언어를 삭제했어요',
            life: 3000,
          });

          setEditColumnHeaderKey(undefined);
        },
      },
    );
  };

  return {
    deleteColumn,
  };
}
