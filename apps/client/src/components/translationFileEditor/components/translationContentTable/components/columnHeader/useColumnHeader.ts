import { ColumnHeaderProps } from '@components/translationFileEditor/components/translationContentTable/components/columnHeader';
import { MouseEventHandler, useState } from 'react';
import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';

export interface IUseColumnHeaderParams extends ColumnHeaderProps {}

export interface IUseColumnHeader {
  isShowColumnOptionButton: boolean;
  handleMouseEnter: MouseEventHandler<HTMLDivElement>;
  handleMouseLeave: MouseEventHandler<HTMLDivElement>;
  handleTableMoreOptionColumnButtonClick: MouseEventHandler<HTMLButtonElement>;
}

function useColumnHeader(params: IUseColumnHeaderParams): IUseColumnHeader {
  const { header } = params;
  const [isHovered, setIsHovered] = useState(false);
  const { onTableMoreOptionsColumnButtonClick } = useTranslationFileEditorContext();

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = () => {
    setIsHovered(true);
  };

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = () => {
    setIsHovered(false);
  };

  const handleTableMoreOptionColumnButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onTableMoreOptionsColumnButtonClick({ columnHeaderKey: header, event: e });
  };

  const isShowColumnOptionButton = isHovered && !(header === 'key' || header === 'index');

  return {
    isShowColumnOptionButton,
    handleMouseEnter,
    handleMouseLeave,
    handleTableMoreOptionColumnButtonClick,
  };
}

export default useColumnHeader;
