import { NamespaceSelectProps } from '@components/NamespaceSelector/components/NamespaceSelect/defines/select';
import { useNamespaceAddDialogStore } from '@stores/namespaceAddDialogStore';
import { useWorkspaceStore } from '@stores/workspace';

function useNamespaceChangeHandler(): NamespaceSelectProps['onChange'] {
  const setNamespace = useWorkspaceStore(({ setNamespace }) => setNamespace);
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
