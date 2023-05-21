import { CellEditorProps } from '@components/translationFileEditor/components/translationContentTable/components/cellEditor';
import { FocusEventHandler, KeyboardEventHandler, MouseEventHandler } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { translationFileEditorStates } from '@components/translationFileEditor/stores/store';
import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';

export interface UseCellEditorParams extends CellEditorProps {}

export interface UseCellEditor {
  handleClick: MouseEventHandler<HTMLTextAreaElement>;
  handleFocus: FocusEventHandler<HTMLTextAreaElement>;
  handleChange: FocusEventHandler<HTMLTextAreaElement>;
  handleMouseEnter: MouseEventHandler<HTMLTextAreaElement>;
  handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement>;
}

export default function useCellEditor(params: UseCellEditorParams): UseCellEditor {
  const { rowData, editorCallback } = params;
  const { rowMenuRef } = useTranslationFileEditorContext();
  const [editRowIndex, setEditRowIndex] = useRecoilState(translationFileEditorStates.editRowIndex);
  const setMouseHoveredRowIndex = useSetRecoilState(translationFileEditorStates.mouseHoveredRowIndex);

  const handleClick: MouseEventHandler<HTMLTextAreaElement> = () => {
    setEditRowIndex(rowData.index);
  };

  const handleFocus: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    const { length } = e.target.value;
    e.target.setSelectionRange(length, length);
  };

  const handleChange: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    try {
      editorCallback?.(e.target.value);
    } catch (e) {}
  };

  const handleMouseEnter: MouseEventHandler<HTMLTextAreaElement> = (e) => {
    const { index } = rowData;

    if (index !== editRowIndex) {
      rowMenuRef.current?.hide(e);
    }

    setMouseHoveredRowIndex(index);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return {
    handleClick,
    handleFocus,
    handleChange,
    handleMouseEnter,
    handleKeyDown,
  };
}
