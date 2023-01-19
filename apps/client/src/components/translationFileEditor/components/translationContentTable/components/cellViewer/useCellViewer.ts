import { CellViewerProps } from '@components/translationFileEditor/components/translationContentTable/components/cellViewer';
import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';
import { MouseEventHandler } from 'react';

export interface IUseCellViewerParams extends CellViewerProps {}

export interface IUseCellViewer {
  isKey: boolean;
  isShowTableOptionsButton: boolean;
  handleMouseEnter: MouseEventHandler<HTMLDivElement>;
  handleTableMoreOptionRowButtonClick: MouseEventHandler<HTMLButtonElement>;
}

function useCellViewer(params: IUseCellViewerParams): IUseCellViewer {
  const {
    rowData: { index },
    field,
  } = params;
  const { mouseHoveredRowIndex, onCellMouseEnter, onTableMoreOptionsRowButtonClick } = useTranslationFileEditorContext();

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (e) => {
    // onCellMouseEnter({ rowIndex: index, event: e });
  };

  const handleTableMoreOptionRowButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onTableMoreOptionsRowButtonClick({ rowIndex: index, event: e });
  };

  const isHoveredRow = index === mouseHoveredRowIndex;
  const isKey = field === 'key';
  const isShowTableOptionsButton = isHoveredRow && isKey;

  return {
    isKey,
    isShowTableOptionsButton,
    handleMouseEnter,
    handleTableMoreOptionRowButtonClick,
  };
}

export default useCellViewer;
