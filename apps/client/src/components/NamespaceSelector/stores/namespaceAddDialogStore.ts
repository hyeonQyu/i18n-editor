import { createDialogStore } from '@stores/factories/dialog';

interface NamespaceAddDialogStore {
  namespace: string;
  errorMessage: string;
  setNamespace: (namespace: string) => void;
  setErrorMessage: (errorMessage: string) => void;
}

export const useNamespaceAddDialogStore = createDialogStore<NamespaceAddDialogStore>((set) => ({
  namespace: '',
  errorMessage: '',
  setNamespace: (namespace: string) => set({ namespace }),
  setErrorMessage: (errorMessage: string) => set({ errorMessage }),
}));
