import React from 'react';
import { CustomEventHandler } from '@defines/event';
import { TableCellHoverEvent } from '@components/translationFileEditor/defines';

export interface ITranslationFileEditorContext {
  mouseHoveredIndex: number | undefined;
  onCellMouseEnter: CustomEventHandler<TableCellHoverEvent>;
}

export const TranslationFileEditorContext = React.createContext<ITranslationFileEditorContext>({
  mouseHoveredIndex: undefined,
  onCellMouseEnter: () => {},
});

export const useTranslationFileEditorContext = () => React.useContext(TranslationFileEditorContext);
