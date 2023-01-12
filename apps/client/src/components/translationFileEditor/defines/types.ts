import { DialogPositionType } from 'primereact/dialog';

export interface TableExtendDialogData {
  visible: boolean;
  header: string;
  position: DialogPositionType;
  inputLabel: string;
  invalid: boolean;
  onAdd: (key: string) => void;
  onHide: () => void;
}
