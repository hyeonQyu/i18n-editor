import { TIME_UNIT } from 'i18n-editor-common';
import { throttle } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

function useFilteredNamespaces(namespaces: string[], keyword: string) {
  const [filteredNamespaces, setFilteredNamespaces] = useState<string[]>(namespaces);

  const throttledSetFilteredNamespaces = useMemo(
    () =>
      throttle((newNamespaces: string[], searchKeyword: string) => {
        setFilteredNamespaces(newNamespaces.filter((namespace) => namespace.toLowerCase().includes(searchKeyword.toLowerCase())));
      }, TIME_UNIT.unitOfMs.asSecond * 0.2),
    [],
  );

  useEffect(() => {
    throttledSetFilteredNamespaces(namespaces, keyword);
  }, [namespaces, keyword, throttledSetFilteredNamespaces]);

  return filteredNamespaces;
}

export default useFilteredNamespaces;
