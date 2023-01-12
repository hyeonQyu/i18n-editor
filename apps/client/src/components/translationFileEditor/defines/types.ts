import { DialogPositionType } from 'primereact/dialog';

export interface TableExtendDialogData {
  visible: boolean;
  header: string;
  position: DialogPositionType;
  inputLabel: string;
  onAdd: (keyValue: string) => void;
  onHide: () => void;
}
