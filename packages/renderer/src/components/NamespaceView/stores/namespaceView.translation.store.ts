import { TranslationKey } from '@i18n-editor/shared';
import { create } from 'zustand';

interface NamespaceViewTranslationStates {
  selectedTranslationKey: TranslationKey | undefined;
}

interface NamespaceViewTranslationActions {
  setSelectedTranslationKey: (translationKey: TranslationKey) => void;
  reset: () => void;
}

type NamespaceViewTranslationStore = NamespaceViewTranslationStates & NamespaceViewTranslationActions;

const initialState: NamespaceViewTranslationStates = {
  selectedTranslationKey: undefined,
};

export const useNamespaceViewTranslationStore = create<NamespaceViewTranslationStore>((set) => ({
  ...initialState,
  setSelectedTranslationKey: (translationKey) => set({ selectedTranslationKey: translationKey }),
  reset: () => set(initialState),
}));
