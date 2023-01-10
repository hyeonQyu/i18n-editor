import { TranslationFileEditorProps } from '@components/translationFileEditor/TranslationFileEditor';
import { MouseEventHandler, useState } from 'react';
import { CustomEventHandler } from '@defines/event';
import { TableCellHoverEvent } from '@components/translationFileEditor/defines';

export interface IUseTranslationFileEditorParams extends TranslationFileEditorProps {}

export interface IUseTranslationFileEditor {
  mouseHoveredIndex: number | undefined;
  globalFilterFields: string[];
  handleTableMouseLeave: MouseEventHandler;
  handleCellMouseEnter: CustomEventHandler<TableCellHoverEvent>;
}

function useTranslationFileEditor(params: IUseTranslationFileEditorParams): IUseTranslationFileEditor {
  const { columns = [] } = params;

  const [mouseHoveredIndex, setMouseHoveredIndex] = useState<number>();

  const globalFilterFields = columns.map(({ header }) => header);

  const handleTableMouseLeave: MouseEventHandler = () => {
    setMouseHoveredIndex(undefined);
  };

  const handleCellMouseEnter: CustomEventHandler<TableCellHoverEvent> = (e) => {
    if (!e) return;

    const { index } = e;
    setMouseHoveredIndex(index);
  };

  return {
    mouseHoveredIndex,
    globalFilterFields,
    handleTableMouseLeave,
    handleCellMouseEnter,
  };
}

export default useTranslationFileEditor;
