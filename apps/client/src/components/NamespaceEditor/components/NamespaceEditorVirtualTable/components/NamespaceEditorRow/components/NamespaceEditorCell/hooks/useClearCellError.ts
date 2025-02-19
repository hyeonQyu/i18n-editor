import useSetCellError from '@components/NamespaceEditor/components/NamespaceEditorVirtualTable/components/NamespaceEditorRow/components/NamespaceEditorCell/hooks/useSetCellError';

function useClearCellError() {
  const setCellError = useSetCellError();

  return () => setCellError(undefined);
}

export default useClearCellError;
