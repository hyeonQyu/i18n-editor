import { MouseEventHandler } from 'react';
import { CellViewerProps } from '@components/translationFileEditor/components/translationContentTable/components/cellViewer';
import { useRecoilState, useRecoilValue } from 'recoil';
import { translationFileEditorStates } from '@components/translationFileEditor/stores/store';

export interface UseCellViewerParams extends CellViewerProps {}

export interface UseCellViewer {
  isKey: boolean;
  isShowTableOptionsButton: boolean;
  handleClick: MouseEventHandler<HTMLDivElement>;
  handleMouseEnter: MouseEventHandler<HTMLDivElement>;
  handleTableMoreOptionRowButtonClick: MouseEventHandler<HTMLButtonElement>;
}

export default function useCellViewer(params: UseCellViewerParams): UseCellViewer {
  const {
    rowData: { index },
    field,
  } = params;
  const [editRowIndex, setEditRowIndex] = useRecoilState(translationFileEditorStates.editRowIndex);
  const rowMenuRef = useRecoilValue(translationFileEditorStates.rowMenuRef);
  const [mouseHoveredRowIndex, setMouseHoveredRowIndex] = useRecoilState(translationFileEditorStates.mouseHoveredRowIndex);

  const handleClick: MouseEventHandler<HTMLDivElement> = () => {
    setEditRowIndex(index);
  };

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (e) => {
    if (index !== editRowIndex) {
      rowMenuRef.current?.hide(e);
    }

    setMouseHoveredRowIndex(index);
  };

  const handleTableMoreOptionRowButtonClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    rowMenuRef.current?.toggle(e);
    setEditRowIndex(index);
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
