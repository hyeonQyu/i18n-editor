import { useNamespaceAddDialogStore } from '@/components/NamespaceAddDialog/stores/namespaceAddDailog.store';

export const useOpenNamespaceAddDialog = () => {
  const open = useNamespaceAddDialogStore((store) => store.open);

  return () => open(() => ({ namespace: '' }));
};
