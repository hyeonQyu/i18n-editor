import { NAMESPACE_SEARCH_FOCUS_EVENT } from '@/components/NamespaceView/constants/namespaceView.constants';
import { create } from 'zustand';

interface NamespaceViewSearchStates {
  keyword: string;
}

interface NamespaceViewSearchActions {
  setKeyword: (keyword: string) => void;
  focusSearchInput: () => void;
  reset: () => void;
}

type NamespaceViewSearchStore = NamespaceViewSearchStates & NamespaceViewSearchActions;

const initialState: NamespaceViewSearchStates = {
  keyword: '',
};

export const useNamespaceViewSearchStore = create<NamespaceViewSearchStore>((set) => ({
  ...initialState,
  setKeyword: (keyword) => set({ keyword }),
  focusSearchInput: () => {
    window.dispatchEvent(new CustomEvent(NAMESPACE_SEARCH_FOCUS_EVENT));
  },
  reset: () => set(initialState),
}));
