import { atom } from 'recoil';
import { ViewType } from '@components/directorySelector/defines';

const getKey = (key: string) => `fileExplorer_${key}`;

export const fileExplorerStates = {
  path: atom<string>({
    key: getKey('path'),
    default: '',
  }),

  backwardStack: atom<string[]>({
    key: getKey('backwardStack'),
    default: [],
  }),

  forwardStack: atom<string[]>({
    key: getKey('forwardStack'),
    default: [],
  }),

  filterKeyword: atom<string>({
    key: getKey('filterKeyword'),
    default: '',
  }),

  viewType: atom<ViewType>({
    key: getKey('viewType'),
    default: 'table',
  }),
};
