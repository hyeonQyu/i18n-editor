import React, { createRef, RefObject } from 'react';
import { Menu } from 'primereact/menu';

export interface TranslationFileEditorContextProps {
  rowMenuRef: RefObject<Menu>;
  columnMenuRef: RefObject<Menu>;
}

export const TranslationFileEditorContext = React.createContext<TranslationFileEditorContextProps>({
  rowMenuRef: createRef(),
  columnMenuRef: createRef(),
});

export const useTranslationFileEditorContext = () => React.useContext(TranslationFileEditorContext);
