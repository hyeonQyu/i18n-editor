import { FocusEventHandler, MouseEventHandler } from 'react';
import { ColumnEditorOptions } from 'primereact/column';
import { useTranslationFileEditorContext } from '@components/translationFileEditor/contexts/translationFileEditorContext';

export interface IUseCellEditorParams extends ColumnEditorOptions {}

export interface IUseCellEditor {
  handleFocus: FocusEventHandler<HTMLTextAreaElement>;
  handleChange: FocusEventHandler<HTMLTextAreaElement>;
  handleMouseEnter: MouseEventHandler<HTMLTextAreaElement>;
}

function useCellEditor(params: IUseCellEditorParams): IUseCellEditor {
  const { rowData, editorCallback } = params;
  const { onCellMouseEnter } = useTranslationFileEditorContext();

  const handleFocus: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    const { length } = e.target.value;
    e.target.setSelectionRange(length, length);
  };

  const handleChange: FocusEventHandler<HTMLTextAreaElement> = (e) => {
    try {
      editorCallback?.(e.target.value);
    } catch (e) {}
  };

  const handleMouseEnter: MouseEventHandler<HTMLTextAreaElement> = () => {
    onCellMouseEnter({ index: rowData?.index });
  };

  return {
    handleFocus,
    handleChange,
    handleMouseEnter,
  };
}

export default useCellEditor;
