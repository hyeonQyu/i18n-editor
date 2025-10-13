import { useOS } from '@/hooks/common';

export const useFileManagerName = () => {
  const os = useOS();

  switch (os) {
    case 'win':
      return '파일 탐색기';
    case 'macos':
      return '파인더';
    default:
      return '파일 관리자';
  }
};
