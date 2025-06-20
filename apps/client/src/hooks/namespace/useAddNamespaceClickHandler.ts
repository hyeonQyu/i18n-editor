import { useNamespaceAddDialogStore } from '@stores/namespaceAddDialogStore';

function useAddNamespaceClickHandler() {
  const open = useNamespaceAddDialogStore(({ open }) => open);
  return () => open(() => ({ namespace: '' }));
}

export default useAddNamespaceClickHandler;
