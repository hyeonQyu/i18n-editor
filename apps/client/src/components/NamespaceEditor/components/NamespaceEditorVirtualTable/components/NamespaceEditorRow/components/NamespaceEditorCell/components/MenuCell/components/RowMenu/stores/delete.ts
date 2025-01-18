import { createDialogStore } from '@stores/factories/dialog';

interface TranslationDeleteConfirmDialogStore {
  rowIndex: number | undefined;
}

export const useTranslationDeleteConfirmDialogStore = createDialogStore<TranslationDeleteConfirmDialogStore>(() => ({
  rowIndex: undefined,
}));
