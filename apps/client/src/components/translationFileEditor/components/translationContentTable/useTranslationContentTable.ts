import { KeyboardEvent, MouseEventHandler, MutableRefObject, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { CustomEventHandler } from '@defines/event';
import { ColumnEventParams } from 'primereact/column';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { translationFileEditorStates } from '@components/translationFileEditor/stores/store';
import { RowData } from 'i18n-editor-common';
import useMutationPatchContent from '@hooks/queries/useMutationPatchContent';
import { localeDirectoryPathState, translationFileNameState } from '@stores/store';
import { useToastContext } from '@contexts/toastContext';
import { TranslationContentTableProps } from '@components/translationFileEditor/components/translationContentTable/TranslationContentTable';

export interface UseTranslationContentTableParams extends TranslationContentTableProps {}

export interface UseTranslationContentTable {
  dataTableRef: MutableRefObject<DataTable | null>;
  globalFilterFields: string[];
  selectedRow: RowData | undefined;
  handleTableMouseLeave: MouseEventHandler;
  handleCellEditComplete: CustomEventHandler<ColumnEventParams>;
}

export default function useTranslationContentTable(params: UseTranslationContentTableParams): UseTranslationContentTable {
  const {} = params;

  const { toastRef } = useToastContext();

  const localeDirectoryPath = useRecoilValue(localeDirectoryPathState);
  const translationFileName = useRecoilValue(translationFileNameState);

  const [rows, setRows] = useRecoilState(translationFileEditorStates.rows);
  const columns = useRecoilValue(translationFileEditorStates.columns);
  const [editRowIndex, setEditRowIndex] = useRecoilState(translationFileEditorStates.editRowIndex);
  const setMouseHoveredRowIndex = useSetRecoilState(translationFileEditorStates.mouseHoveredRowIndex);

  const { mutate: mutatePatchContent } = useMutationPatchContent({});

  const dataTableRef = useRef<DataTable>(null);

  const globalFilterFields = columns.map(({ header }) => header);

  const hasSelectedRow = rows && (editRowIndex || editRowIndex === 0);

  const selectedRow = hasSelectedRow ? rows[editRowIndex] : undefined;

  const handleTableMouseLeave: MouseEventHandler = () => {
    setMouseHoveredRowIndex(undefined);
  };

  const editContent = (e: ColumnEventParams) => {
    const { value, newValue, field, newRowData: anyNewRowData } = e;
    if (value === newValue) return;

    const newRowData = anyNewRowData as RowData;
    const { key, index } = newRowData;

    mutatePatchContent(
      {
        path: localeDirectoryPath!,
        fileName: translationFileName!,
        cells: [
          {
            key,
            value: newValue,
            locale: field,
          },
        ],
      },
      {
        onSuccess() {
          setRows((prevRows) => {
            prevRows![index] = newRowData;
            return prevRows;
          });

          toastRef.current?.show({
            severity: 'success',
            detail: '변경사항을 저장했어요',
            life: 3000,
          });
        },
      },
    );
  };

  const handleKeyboardEvent = (e: KeyboardEvent) => {
    const { key, shiftKey, ctrlKey, altKey } = e as KeyboardEvent;

    // 엔터 키 입력 시 다음 행에 있는 셀에 focus
    if (key === 'Enter' && !shiftKey && !ctrlKey && !altKey) {
      // @ts-ignore
      const { rowIndex, cellIndex, props } = e;

      const rowElements = dataTableRef.current?.getTable().querySelectorAll('tbody > tr');
      const nextRowElement = rowElements![rowIndex + 1];

      if (!nextRowElement) return;

      const cellElements = nextRowElement.querySelectorAll('td');
      const nextCellElement = cellElements![cellIndex];

      nextCellElement.click();
      setEditRowIndex(props.value[rowIndex + 1].index);
    }
  };

  const handleCellEditComplete: CustomEventHandler<ColumnEventParams> = (e) => {
    if (!e) return;

    editContent(e);
    handleKeyboardEvent(e.originalEvent as KeyboardEvent);
  };

  return {
    dataTableRef,
    globalFilterFields,
    selectedRow,
    handleTableMouseLeave,
    handleCellEditComplete,
  };
}
