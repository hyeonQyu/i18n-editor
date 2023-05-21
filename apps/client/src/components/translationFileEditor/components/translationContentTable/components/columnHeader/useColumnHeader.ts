import { ColumnHeaderProps } from '@components/translationFileEditor/components/translationContentTable/components/columnHeader';
import { MouseEventHandler, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { translationFileEditorStates } from '@components/translationFileEditor/stores/store';
import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';

export interface UseColumnHeaderParams extends ColumnHeaderProps {}

export interface UseColumnHeader {
  isShowColumnOptionButton: boolean;
  handleMouseEnter: MouseEventHandler<HTMLDivElement>;
  handleMouseLeave: MouseEventHandler<HTMLDivElement>;
  handleTableMoreOptionColumnButtonClick: MouseEventHandler<HTMLButtonElement>;
}

export default function useColumnHeader(params: UseColumnHeaderParams): UseColumnHeader {
  const { header } = params;
  const { columnMenuRef } = useTranslationFileEditorContext();
  const setEditColumnHeaderKey = useSetRecoilState(translationFileEditorStates.editColumnHeaderKey);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = () => {
    setIsHovered(true);
  };

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
    setIsHovered(false);
  };

  const handleTableMoreOptionColumnButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    columnMenuRef.current?.toggle(e);
    setEditColumnHeaderKey(header);
  };

  const isShowColumnOptionButton = isHovered && !(header === 'key' || header === 'index');

  return {
    isShowColumnOptionButton,
    handleMouseEnter,
    handleMouseLeave,
    handleTableMoreOptionColumnButtonClick,
  };
}
