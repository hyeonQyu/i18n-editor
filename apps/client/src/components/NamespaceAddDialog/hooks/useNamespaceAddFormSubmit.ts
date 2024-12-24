import useAddNamespace from '@components/NamespaceSelector/hooks/useAddNamespace';
import useCreateAxiosErrorHandler from '@hooks/useCreateAxiosErrorHandler';
import { useNamespaceAddDialogStore } from '@stores/namespaceAddDialogStore';
import { FormEventHandler } from 'react';

function useNamespaceAddFormSubmit() {
  const namespace = useNamespaceAddDialogStore(({ namespace }) => namespace);
  const close = useNamespaceAddDialogStore(({ close }) => close);
  const setErrorMessage = useNamespaceAddDialogStore(({ setErrorMessage }) => setErrorMessage);

  const createAxiosErrorHandler = useCreateAxiosErrorHandler();

  const addNamespace = useAddNamespace();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await addNamespace(namespace);
      close();
    } catch (e) {
      // 에러 처리
      createAxiosErrorHandler(({ errorMessage }) => setErrorMessage(errorMessage))(e);
    }
  };

  return handleSubmit;
}

export default useNamespaceAddFormSubmit;
