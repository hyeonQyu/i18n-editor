import { useOS } from '@/hooks/common';

export const useMetaKeyLabel = () => {
  const os = useOS();

  return os === 'macos' ? '⌘' : 'Ctrl';
};
