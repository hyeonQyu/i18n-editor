import { NamespaceSelectProps } from '@components/NamespaceSelector/components/NamespaceSelect/defines/select';
import { useNamespaceAddDialogStore } from '@components/NamespaceSelector/stores/namespaceAddDialogStore';
import { useGlobalStore } from '@stores/globalStore';

function useNamespaceChangeHandler(): NamespaceSelectProps['onChange'] {
  const setNamespace = useGlobalStore(({ setNamespace }) => setNamespace);
  const openDialog = useNamespaceAddDialogStore(({ open }) => open);

  return (_, item) => {
    if (!item) return;

    const { type, label, value } = item;

    if (type === 'add') {
      openDialog(() => ({
        namespace: value,
      }));

      return;
    }

    setNamespace(label);
  };
}

export default useNamespaceChangeHandler;
