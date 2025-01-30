import { useWorkspace } from '@providers/WorkspaceProvider';
import { RefObject, useEffect, useState } from 'react';

function useTitleWidth(textRef: RefObject<HTMLSpanElement>) {
  const [width, setWidth] = useState(0);

  const workspace = useWorkspace();

  useEffect(() => {
    if (textRef.current) {
      setWidth(textRef.current.offsetWidth);
    }
  }, [textRef, workspace?.name]);

  return width;
}

export default useTitleWidth;
