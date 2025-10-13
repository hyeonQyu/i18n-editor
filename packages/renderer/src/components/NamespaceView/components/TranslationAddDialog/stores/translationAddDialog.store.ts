import { createDialogStore } from '@/stores/factories/dialog.store.factory';

interface TranslationAddDialogStates {
  translationKey: string;
  errorMessage: string;
}

interface TranslationAddDialogActions {
  setTranslationKey: (translationKey: string) => void;
  setErrorMessage: (errorMessage: string) => void;
}

type TranslationAddDialogStore = TranslationAddDialogStates & TranslationAddDialogActions;

export const useTranslationAddDialogStore = createDialogStore<TranslationAddDialogStore>((set) => ({
  translationKey: '',
  errorMessage: '',
  setTranslationKey: (translationKey: string) => set({ translationKey }),
  setErrorMessage: (errorMessage: string) => set({ errorMessage }),
}));
