import useOS from '@hooks/useOS';

function useFileManagerName() {
  const os = useOS();

  switch (os) {
    case 'win':
      return '파일 탐색기';
    case 'macos':
      return '파인더';
    default:
      return '파일 관리자';
  }
}

export default useFileManagerName;
