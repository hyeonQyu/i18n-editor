import { SetterOrUpdater, useRecoilState } from 'recoil';
import { translationContentRowsState } from '@stores/store';
import { RowData } from 'i18n-editor-common';

export interface UseTranslationContentRows {
  contentRows: RowData[] | undefined;
  setContentRows: SetterOrUpdater<RowData[] | undefined>;
}

export default function useTranslationContentRows(): UseTranslationContentRows {
  const [contentRows, setContentRows] = useRecoilState(translationContentRowsState);

  return {
    contentRows,
    setContentRows,
  };
}
