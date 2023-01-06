import { FocusEventHandler } from 'react';
import { ColumnEditorOptions } from 'primereact/column';

export interface IUseCellEditorParams extends ColumnEditorOptions {}

export interface IUseCellEditor {
  handleFocus: FocusEventHandler<HTMLTextAreaElement>;
  handleChange: FocusEventHandler<HTMLTextAreaElement>;
}

function useCellEditor(params: IUseCellEditorParams): IUseCellEditor {
  const { editorCallback } = params;

  const handleFocus: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    const { length } = e.target.value;
    e.target.setSelectionRange(length, length);
  };

  const handleChange: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    editorCallback?.(e.target.value);
  };

  return {
    handleFocus,
    handleChange,
  };
}

export default useCellEditor;
