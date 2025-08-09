import { useAddNamespace } from '@/components/NamespaceAddDialog/hooks/useAddNamespace';
import { useNamespaceAddDialogStore } from '@/components/NamespaceAddDialog/stores/namespaceAddDailog.store';
import { FormEventHandler } from 'react';

export const useNamespaceAddFormSubmit = () => {
  const namespace = useNamespaceAddDialogStore((store) => store.namespace);
  const close = useNamespaceAddDialogStore((store) => store.close);
  const setErrorMessage = useNamespaceAddDialogStore((store) => store.setErrorMessage);

  const addNamespace = useAddNamespace();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await addNamespace(namespace);
      close();
    } catch (e) {
      setErrorMessage((e as Error).message);
    }
  };

  return handleSubmit;
};
