import { NAMESPACE_SEARCH_FOCUS_EVENT } from '@components/NamespaceView/defines/events';
import { create } from 'zustand';

interface NamespaceViewSearchState {
  keyword: string;
}

interface NamespaceViewSearchActions {
  setKeyword: (keyword: string) => void;
  focusSearchInput: () => void;
  reset: () => void;
}

type NamespaceViewSearchStore = NamespaceViewSearchState & NamespaceViewSearchActions;

const DEFAULT_STATE: NamespaceViewSearchState = {
  keyword: '',
};

export const useNamespaceViewSearchStore = create<NamespaceViewSearchStore>((set) => ({
  ...DEFAULT_STATE,
  setKeyword: (keyword) => set({ keyword }),
  focusSearchInput: () => {
    window.dispatchEvent(new CustomEvent(NAMESPACE_SEARCH_FOCUS_EVENT));
  },
  reset: () => set(DEFAULT_STATE),
}));
