import { DirectoryEntryType } from 'i18n-editor-common';

export const ICON_BY_DIRECTORY_ENTRY_TYPE: {
  [key in DirectoryEntryType]: string;
} = {
  directory: 'pi pi-fw pi-folder',
  file: 'pi pi-fw pi-file',
  unknown: 'pi pi-fw pi-file-excel',
};
