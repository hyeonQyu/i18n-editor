import { CellViewerProps } from '@components/translationFileEditor/components/cellViewer/CellViewer';
import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';
import { MouseEventHandler } from 'react';

export interface IUseCellViewerParams extends CellViewerProps {}

export interface IUseCellViewer {
  isShowTableOptionsButton: boolean;
  handleMouseEnter: MouseEventHandler<HTMLDivElement>;
}

function useCellViewer(params: IUseCellViewerParams): IUseCellViewer {
  const {
    rowData: { index },
    field,
  } = params;
  const { mouseHoveredIndex, onCellMouseEnter } = useTranslationFileEditorContext();

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = () => {
    onCellMouseEnter({ index });
  };

  const isHoveredRow = index === mouseHoveredIndex;
  const isKey = field === 'key';
  const isShowTableOptionsButton = isHoveredRow && isKey;

  return {
    isShowTableOptionsButton,
    handleMouseEnter,
  };
}

export default useCellViewer;
