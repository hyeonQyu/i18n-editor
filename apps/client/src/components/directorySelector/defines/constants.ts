import { DirectoryEntryType } from 'i18n-editor-common';
import { ViewOption } from '@components/directorySelector/defines/types';

export const ICON_BY_DIRECTORY_ENTRY_TYPE: {
  [key in DirectoryEntryType]: string;
} = {
  directory: 'pi pi-fw pi-folder',
  file: 'pi pi-fw pi-file',
  unknown: 'pi pi-fw pi-file-excel',
};

export const VIEW_OPTIONS: ViewOption[] = [
  { icon: 'pi pi-list', value: 'column1' },
  { icon: 'pi pi-pause', value: 'column2' },
  { icon: 'pi pi-table', value: 'table' },
];
