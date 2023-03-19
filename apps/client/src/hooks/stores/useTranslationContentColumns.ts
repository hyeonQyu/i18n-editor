import { SetterOrUpdater, useRecoilState } from 'recoil';
import { translationContentColumnsState } from '@stores/store';
import { ColumnData } from 'i18n-editor-common';

export interface UseTranslationContentColumns {
  contentColumns: ColumnData[] | undefined;
  setContentColumns: SetterOrUpdater<ColumnData[] | undefined>;
}

export default function useTranslationContentColumns(): UseTranslationContentColumns {
  const [contentColumns, setContentColumns] = useRecoilState(translationContentColumnsState);

  return {
    contentColumns,
    setContentColumns,
  };
}
