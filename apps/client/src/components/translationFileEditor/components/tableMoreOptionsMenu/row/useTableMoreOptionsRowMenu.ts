import { useRecoilValue, useSetRecoilState } from 'recoil';
import { translationFileEditorStates } from '@components/translationFileEditor/stores/store';
import { CustomEventHandler } from '@defines/event';
import { useToastContext } from '@contexts/toastContext';
import { SyntheticEvent } from 'react';
import { LABELS_BY_TABLE_EXTEND_TYPE, TableExtendDialogData } from '@components/translationFileEditor/defines';
import { DialogPositionType } from 'primereact/dialog';
import useEditRow from '@components/translationFileEditor/hooks/useEditRow';
import { confirmDialog } from 'primereact/confirmdialog';

export interface UseTableMoreOptionsRowMenuParams {}

export interface UseTableMoreOptionsRowMenu {
  isClearableRow: boolean;
  handleClickCopyTranslationKey: CustomEventHandler;
  handleClickAddRowAbove: CustomEventHandler<SyntheticEvent>;
  handleClickAddRowBelow: CustomEventHandler<SyntheticEvent>;
  handleClickClearRowContent: CustomEventHandler<SyntheticEvent>;
  handleClickDeleteRow: CustomEventHandler<SyntheticEvent>;
}

export default function useTableMoreOptionsRowMenu(params: UseTableMoreOptionsRowMenuParams): UseTableMoreOptionsRowMenu {
  const {} = params;

  const { toastRef } = useToastContext();

  const rows = useRecoilValue(translationFileEditorStates.rows);
  const editRowIndex = useRecoilValue(translationFileEditorStates.editRowIndex);
  const setTableExtendDialogData = useSetRecoilState(translationFileEditorStates.tableExtendDialogData);

  const { addRowAbove, addRowBelow, clearRow, deleteRow } = useEditRow({});

  const hasSelectedRow = rows && (editRowIndex || editRowIndex === 0);

  const isClearableRow = Boolean(
    rows &&
      hasSelectedRow &&
      rows[editRowIndex] &&
      Object.entries(rows[editRowIndex]).filter(([key, value]) => key !== 'key' && key !== 'index' && value).length,
  );

  const getEditRowDialogPosition = (target: HTMLElement): DialogPositionType => {
    const { y } = target.getBoundingClientRect();
    const subHeight = window.innerHeight / 3;
    if (y < subHeight) return 'top-left';
    if (y < subHeight * 2) return 'left';
    return 'bottom-left';
  };

  const hideTableExtendDialog = () => setTableExtendDialogData((prev) => ({ ...prev, visible: false }));

  const commonAddRowDialogProps = (e: SyntheticEvent): Partial<TableExtendDialogData> => ({
    type: 'row',
    ...LABELS_BY_TABLE_EXTEND_TYPE['row'],
    visible: true,
    position: getEditRowDialogPosition(e!.target as HTMLElement),
    invalid: false,
    onHide: hideTableExtendDialog,
  });

  const isDuplicatedRowKey = (key: string) => {
    return Boolean(rows?.filter((row) => row.key === key).length);
  };

  const checkInvalidRowAndAlert = (key: string): boolean => {
    if (!key) {
      setTableExtendDialogData((prev) => ({
        ...prev,
        invalid: true,
      }));
      return true;
    }

    if (isDuplicatedRowKey(key)) {
      setTableExtendDialogData((prev) => ({
        ...prev,
        invalid: true,
        inputLabel: '이미 동일한 key가 있어요',
      }));
      return true;
    }
    return false;
  };

  const addNewRow = (e: SyntheticEvent, position: 'above' | 'below') => {
    setTableExtendDialogData((prev) => ({
      ...prev,
      ...commonAddRowDialogProps(e!),
      onAddKey(key) {
        if (checkInvalidRowAndAlert(key)) return;

        const addRowByPosition = {
          above: addRowAbove,
          below: addRowBelow,
        };
        addRowByPosition[position](key);

        hideTableExtendDialog();
      },
    }));
  };

  /**
   * 번역 key 값 복사
   */
  const handleClickCopyTranslationKey: CustomEventHandler = async () => {
    await navigator.clipboard.writeText(rows![editRowIndex!].key);

    toastRef.current?.show({
      severity: 'info',
      detail: '클립보드에 복사되었어요',
    });
  };

  /**
   * 현재 행 위에 행 추가
   * @param e
   */
  const handleClickAddRowAbove: CustomEventHandler<SyntheticEvent> = (e) => {
    addNewRow(e!, 'above');
  };

  /**
   * 현재 행 아래에 행 추가
   * @param e
   */
  const handleClickAddRowBelow: CustomEventHandler<SyntheticEvent> = (e) => {
    addNewRow(e!, 'below');
  };

  /**
   * 현재 행 내용 지우기
   * @param e
   */
  const handleClickClearRowContent: CustomEventHandler<SyntheticEvent> = (e) => {
    confirmDialog({
      header: '선택된 행의 내용을 지우시겠어요?',
      message: `${rows[editRowIndex!].key}에 해당하는 모든 번역값을 초기화해요`,
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      position: getEditRowDialogPosition(e!.target as HTMLElement),
      draggable: false,
      className: 'delete-dialog',
      acceptLabel: '네, 지울래요',
      rejectLabel: '아니요',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept: clearRow,
    });
  };

  /**
   * 현재 행 삭제
   * @param e
   */
  const handleClickDeleteRow: CustomEventHandler<SyntheticEvent> = (e) => {
    confirmDialog({
      header: '선택된 행을 삭제하시겠어요?',
      message: `${rows[editRowIndex!].key} 키를 삭제해요`,
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      position: getEditRowDialogPosition(e!.target as HTMLElement),
      draggable: false,
      className: 'delete-dialog',
      acceptLabel: '네, 삭제할게요',
      rejectLabel: '아니요',
      acceptIcon: 'pi pi-check',
      rejectIcon: 'pi pi-times',
      accept: deleteRow,
    });
  };

  return {
    isClearableRow,
    handleClickCopyTranslationKey,
    handleClickAddRowAbove,
    handleClickAddRowBelow,
    handleClickClearRowContent,
    handleClickDeleteRow,
  };
}
