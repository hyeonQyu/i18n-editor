import { TableExtendDialogData, TableExtendType } from '@components/translationFileEditor/defines/types';
import { SelectItem } from 'primereact/selectitem';
import { LANGUAGE_CODES, LANGUAGE_NAME_BY_CODE } from 'i18n-editor-common';

export const INITIAL_TABLE_EXTEND_DIALOG_DATA: TableExtendDialogData = {
  type: 'row',
  visible: false,
  header: '',
  position: 'left',
  inputLabel: '',
  invalid: false,
  onAddKey() {},
  onAddLanguageCodes() {},
  onHide() {},
};

export const LABELS_BY_TABLE_EXTEND_TYPE: Record<TableExtendType, Record<'header' | 'inputLabel', string>> = {
  row: {
    header: '번역을 추가하시겠어요?',
    inputLabel: '새로 추가할 번역 키를 입력하세요',
  },
  column: {
    header: '언어를 추가하시겠어요?',
    inputLabel: '새로 추가할 언어 코드를 선택하세요',
  },
};

export const LANGUAGE_SELECT_OPTIONS: SelectItem[] = LANGUAGE_CODES.map((code) => ({
  label: LANGUAGE_NAME_BY_CODE[code],
  value: code,
  title: `${code} ${LANGUAGE_NAME_BY_CODE[code]}`,
}));
