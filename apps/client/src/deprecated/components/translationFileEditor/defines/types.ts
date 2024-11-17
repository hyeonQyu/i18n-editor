import { DialogPositionType } from 'primereact/dialog';

/**
 * @deprecated
 */
export type TableExtendType = 'row' | 'column';

/**
 * @deprecated
 */
export interface TableExtendDialogData {
  type: TableExtendType;
  visible: boolean;
  header: string;
  position: DialogPositionType;
  inputLabel: string;
  invalid: boolean;
  onAddKey: (key: string) => void;
  onAddLanguageCodes: (languageCodes: string[]) => void;
  onHide: () => void;
}
