import { DialogPositionType } from 'primereact/dialog';

export type TableExtendType = 'row' | 'column';

export interface TableExtendDialogData {
  type: TableExtendType;
  visible: boolean;
  header: string;
  position: DialogPositionType;
  inputLabel: string;
  invalid: boolean;
  onAdd: (key: string) => void;
  onHide: () => void;
}
