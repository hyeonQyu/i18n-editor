import React from 'react';
import { IUseTranslationFileEditor } from '@components/translationFileEditor/useTranslationFileEditor';

export interface ITranslationFileEditorContext
  extends Pick<
    IUseTranslationFileEditor,
    'rowMenuRef' | 'mouseHoveredRowIndex' | 'onCellMouseEnter' | 'onTableMoreOptionsRowButtonClick'
  > {}

export const TranslationFileEditorContext = React.createContext<ITranslationFileEditorContext>({
  rowMenuRef: undefined,
  mouseHoveredRowIndex: undefined,
  onCellMouseEnter: () => {},
  onTableMoreOptionsRowButtonClick: () => {},
});

export const useTranslationFileEditorContext = () => React.useContext(TranslationFileEditorContext);
