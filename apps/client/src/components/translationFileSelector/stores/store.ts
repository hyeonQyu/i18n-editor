import { atom } from 'recoil';

const getKey = (key: string) => `translationFileSelector_${key}`;

export const translationFileSelectorStates = {
  translationFileCreationDialogOpened: atom<boolean>({
    key: getKey('translationFileCreationDialogOpened'),
    default: false,
  }),
};
