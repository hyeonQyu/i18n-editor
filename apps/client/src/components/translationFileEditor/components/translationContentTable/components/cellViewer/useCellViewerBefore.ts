import { CellViewerBeforeProps } from '@components/translationFileEditor/components/translationContentTable/components/cellViewer';
import { useTranslationFileEditorContextBefore } from '@components/translationFileEditor/contexts/translationFileEditorContextBefore';
import { MouseEventHandler } from 'react';

export interface IUseCellViewerParams extends CellViewerBeforeProps {}

export interface IUseCellViewer {
  isKey: boolean;
  isShowTableOptionsButton: boolean;
  handleClick: MouseEventHandler<HTMLDivElement>;
  handleMouseEnter: MouseEventHandler<HTMLDivElement>;
  handleTableMoreOptionRowButtonClick: MouseEventHandler<HTMLButtonElement>;
}

/**
 * @deprecated TODO 삭제
 * @param params
 */
function useCellViewerBefore(params: IUseCellViewerParams): IUseCellViewer {
  const {
    rowData: { index },
    field,
  } = params;
  const { mouseHoveredRowIndex, onCellClick, onCellMouseEnter, onTableMoreOptionsRowButtonClick } = useTranslationFileEditorContextBefore();

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    onCellClick({ rowIndex: index, event: e });
  };

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (e) => {
    onCellMouseEnter({ rowIndex: index, event: e });
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
    handleClick,
    handleMouseEnter,
    handleTableMoreOptionRowButtonClick,
  };
}

export default useCellViewerBefore;
