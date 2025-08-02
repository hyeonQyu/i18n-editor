import { createDialogStore } from '@/stores/factories/dialog.store.factory';

interface NamespaceAddDialogStates {
  namespace: string;
  errorMessage: string;
}

interface NamespaceAddDialogActions {
  setNamespace: (namespace: string) => void;
  setErrorMessage: (errorMessage: string) => void;
}

type NamespaceAddDialogStore = NamespaceAddDialogStates & NamespaceAddDialogActions;

export const useNamespaceAddDialogStore = createDialogStore<NamespaceAddDialogStore>((set) => ({
  namespace: '',
  errorMessage: '',
  setNamespace: (namespace: string) => set({ namespace }),
  setErrorMessage: (errorMessage: string) => set({ errorMessage }),
}));
