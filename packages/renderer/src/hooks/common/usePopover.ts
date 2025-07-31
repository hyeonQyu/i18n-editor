import { MouseEventHandler, useState } from 'react';

export const usePopover = () => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  const handleOpen: MouseEventHandler = (e) => setAnchorElement(e.currentTarget as HTMLElement);

  const handleClose = () => setAnchorElement(null);

  return {
    anchorElement,
    handleOpen,
    handleClose,
  };
};
