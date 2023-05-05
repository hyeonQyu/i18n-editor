import { atom, selector } from 'recoil';
import { ColumnData, ColumnHeaderKey, RowData } from 'i18n-editor-common';
import { DataTableFilterMeta } from 'primereact/datatable';
import { createRef, RefObject } from 'react';
import { Menu } from 'primereact/menu';

const getKey = (key: string) => `translationFileEditor_${key}`;

const rows = atom<RowData[]>({
  key: getKey('rows'),
  default: [],
});

const columns = atom<ColumnData[]>({
  key: getKey('columns'),
  default: [],
});

const mouseHoveredRowIndex = atom<number | undefined>({
  key: getKey('mouseHoveredRowIndex'),
  default: undefined,
});

const editRowIndex = atom<number | undefined>({
  key: getKey('editRowIndex'),
  default: undefined,
});

const editColumnHeaderKey = atom<ColumnHeaderKey | undefined>({
  key: getKey('editColumnHeaderKey'),
  default: undefined,
});

const filterValue = atom<string>({
  key: getKey('inputFilterValue'),
  default: '',
});

const filter = atom<DataTableFilterMeta>({
  key: getKey('filter'),
  default: {
    global: {
      value: null,
      matchMode: 'contains',
    },
  },
});

const filterSelector = selector<string>({
  key: getKey('filterSelector'),
  set({ set }, newValue) {
    const value = newValue as string;
    set(filterValue, value);
    set(filter, (prev: DataTableFilterMeta) => ({
      ...prev,
      global: {
        ...prev.global,
        value,
      },
    }));
  },
  get({ get }) {
    return get(filterValue);
  },
});

const rowMenuRef = atom<RefObject<Menu>>({
  key: getKey('rowMenuRef'),
  default: createRef<Menu>(),
});

const columnMenuRef = atom<RefObject<Menu>>({
  key: getKey('columnMenuRef'),
  default: createRef<Menu>(),
});

export const translationFileEditorStates = {
  rows,
  columns,
  mouseHoveredRowIndex,
  editRowIndex,
  editColumnHeaderKey,
  filterValue: filterValue,
  filter,
  filterSelector,
  rowMenuRef,
  columnMenuRef,
};
