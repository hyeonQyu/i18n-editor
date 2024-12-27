import useOS from '@hooks/useOS';

function useMetaKeyLabel() {
  const os = useOS();

  return os === 'macos' ? '⌘' : 'Ctrl';
}

export default useMetaKeyLabel;
