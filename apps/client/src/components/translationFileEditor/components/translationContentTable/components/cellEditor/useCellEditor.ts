import { FocusEventHandler, MouseEventHandler } from 'react';
import { ColumnEditorOptions } from 'primereact/column';
import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';

export interface IUseCellEditorParams extends ColumnEditorOptions {}

export interface IUseCellEditor {
  handleClick: MouseEventHandler<HTMLTextAreaElement>;
  handleFocus: FocusEventHandler<HTMLTextAreaElement>;
  handleChange: FocusEventHandler<HTMLTextAreaElement>;
  handleMouseEnter: MouseEventHandler<HTMLTextAreaElement>;
}

function useCellEditor(params: IUseCellEditorParams): IUseCellEditor {
  const { rowData, editorCallback } = params;
  const { onCellClick, onCellMouseEnter } = useTranslationFileEditorContext();

  const handleClick: MouseEventHandler<HTMLTextAreaElement> = (e) => {
    onCellClick({ rowIndex: rowData?.index, event: e });
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
    onCellMouseEnter({ rowIndex: rowData?.index, event: e });
  };

  return {
    handleClick,
    handleFocus,
    handleChange,
    handleMouseEnter,
  };
}

export default useCellEditor;
