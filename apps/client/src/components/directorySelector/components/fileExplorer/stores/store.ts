import { atom } from 'recoil';

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
};
