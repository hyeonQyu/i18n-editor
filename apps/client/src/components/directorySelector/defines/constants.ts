import { DirectoryEntryType } from 'i18n-editor-common';
import { SelectButtonTemplateOption } from '@defines/selectButtonTemplate';
import { MoveDirection, ViewType } from '@components/directorySelector/defines/types';

export const ICON_BY_DIRECTORY_ENTRY_TYPE: {
  [key in DirectoryEntryType]: string;
} = {
  directory: 'pi pi-fw pi-folder',
  file: 'pi pi-fw pi-file',
  unknown: 'pi pi-fw pi-file-excel',
};

export const VIEW_OPTIONS: SelectButtonTemplateOption<ViewType>[] = [
  { icon: 'pi pi-list', value: 'list' },
  { icon: 'pi pi-table', value: 'table' },
];

export const MOVE_PATH_OPTIONS: SelectButtonTemplateOption<MoveDirection>[] = [
  { icon: 'pi pi-angle-left', value: 'backward' },
  { icon: 'pi pi-angle-right', value: 'forward' },
];
